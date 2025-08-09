import { Product, Sale, UserEvent, RecommendationResult } from '@/types';

export interface MLInsight {
  type: 'restock' | 'promotion' | 'trend' | 'seasonal';
  confidence: number;
  title: string;
  description: string;
  actionItems: string[];
  impact: 'low' | 'medium' | 'high';
  products?: Product[];
}

export interface PredictionResult {
  productId: string;
  predictedSales: number;
  confidence: number;
  factors: string[];
  timeframe: 'week' | 'month' | 'quarter';
}

/**
 * Classe principal para funcionalidades de Machine Learning
 */
export class InventoryML {
  private products: Product[] = [];
  private sales: Sale[] = [];
  private events: UserEvent[] = [];

  constructor(products: Product[], sales: Sale[], events: UserEvent[] = []) {
    this.products = products;
    this.sales = sales;
    this.events = events;
  }

  /**
   * Gera recomendações baseadas em dados históricos
   */
  generateRecommendations(): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];

    // 1. Recomendações de reposição de estoque
    const restockRecommendations = this.generateRestockRecommendations();
    recommendations.push(...restockRecommendations);

    // 2. Recomendações de promoção
    const promotionRecommendations = this.generatePromotionRecommendations();
    recommendations.push(...promotionRecommendations);

    // 3. Recomendações de bundling
    const bundleRecommendations = this.generateBundleRecommendations();
    recommendations.push(...bundleRecommendations);

    return recommendations.slice(0, 10); // Limitar a 10 recomendações
  }

  /**
   * Gera recomendações de reposição de estoque
   */
  private generateRestockRecommendations(): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];
    
    this.products.forEach(product => {
      const salesHistory = this.sales.filter(s => s.productId === product.id);
      
      if (salesHistory.length === 0) return;

      // Calcular vendas médias por dia
      const daysSinceFirstSale = this.getDaysSinceFirstSale(salesHistory);
      const totalSold = salesHistory.reduce((sum, sale) => sum + sale.qty, 0);
      const avgSalesPerDay = totalSold / Math.max(daysSinceFirstSale, 1);
      
      // Prever quando o estoque chegará a zero
      const daysUntilStockOut = product.stock / Math.max(avgSalesPerDay, 0.1);
      
      if (daysUntilStockOut <= 14) { // Menos de 2 semanas
        const priority = daysUntilStockOut <= 7 ? 'critical' : 'high';
        const suggestedQuantity = Math.ceil(avgSalesPerDay * 30); // 30 dias de estoque
        
        recommendations.push({
          type: 'restock',
          title: `Repor estoque: ${product.title}`,
          description: `Estoque atual: ${product.stock} unidades. Previsão de esgotamento em ${Math.ceil(daysUntilStockOut)} dias.`,
          products: [product],
          priority: priority as 'critical' | 'high',
          estimatedImpact: suggestedQuantity * (product.salePrice - product.costPrice)
        });
      }
    });

    return recommendations;
  }

  /**
   * Gera recomendações de promoção
   */
  private generatePromotionRecommendations(): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];
    
    // Encontrar produtos com vendas baixas mas bom estoque
    const slowMovingProducts = this.products.filter(product => {
      const salesHistory = this.sales.filter(s => s.productId === product.id);
      const recentSales = salesHistory.filter(s => 
        new Date(s.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      );
      
      return product.stock > 20 && recentSales.length < 3;
    });

    if (slowMovingProducts.length > 0) {
      const selectedProducts = slowMovingProducts.slice(0, 3);
      
      recommendations.push({
        type: 'promotion',
        title: 'Liquidação de produtos parados',
        description: `${selectedProducts.length} produtos com pouco movimento nos últimos 30 dias.`,
        products: selectedProducts,
        priority: 'medium',
        estimatedImpact: selectedProducts.reduce((sum, p) => sum + (p.stock * p.costPrice * 0.3), 0)
      });
    }

    return recommendations;
  }

  /**
   * Gera recomendações de bundling
   */
  private generateBundleRecommendations(): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];
    
    // Encontrar produtos frequentemente comprados juntos
    const coOccurrences = this.findFrequentlyBoughtTogether();
    
    if (coOccurrences.length > 0) {
      const topPair = coOccurrences[0];
      
      recommendations.push({
        type: 'bundle',
        title: 'Criar combo de produtos',
        description: `Produtos frequentemente comprados juntos: ${topPair.products.map(p => p.title).join(' + ')}`,
        products: topPair.products,
        priority: 'medium',
        estimatedImpact: topPair.frequency * topPair.products.reduce((sum, p) => sum + p.salePrice, 0) * 0.1
      });
    }

    return recommendations;
  }

  /**
   * Encontra produtos frequentemente comprados juntos
   */
  private findFrequentlyBoughtTogether(): Array<{ products: Product[], frequency: number }> {
    const pairs: Map<string, { products: Product[], count: number }> = new Map();
    
    // Agrupar vendas por data/cliente para encontrar compras simultâneas
    const salesByDate = this.groupSalesByDate();
    
    salesByDate.forEach(daysSales => {
      if (daysSales.length > 1) {
        // Criar pares de produtos vendidos no mesmo dia
        for (let i = 0; i < daysSales.length; i++) {
          for (let j = i + 1; j < daysSales.length; j++) {
            const product1 = this.products.find(p => p.id === daysSales[i].productId);
            const product2 = this.products.find(p => p.id === daysSales[j].productId);
            
            if (product1 && product2) {
              const pairKey = [product1.id, product2.id].sort().join('-');
              
              if (pairs.has(pairKey)) {
                pairs.get(pairKey)!.count++;
              } else {
                pairs.set(pairKey, { products: [product1, product2], count: 1 });
              }
            }
          }
        }
      }
    });

    return Array.from(pairs.values())
      .filter(pair => pair.count >= 2)
      .map(pair => ({ products: pair.products, frequency: pair.count }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * Prediz vendas futuras para um produto
   */
  predictSales(productId: string, timeframe: 'week' | 'month' | 'quarter'): PredictionResult {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const salesHistory = this.sales.filter(s => s.productId === productId);
    
    if (salesHistory.length === 0) {
      return {
        productId,
        predictedSales: 0,
        confidence: 0,
        factors: ['Nenhum histórico de vendas'],
        timeframe
      };
    }

    const timeframeDays = { week: 7, month: 30, quarter: 90 }[timeframe];
    const daysSinceFirstSale = this.getDaysSinceFirstSale(salesHistory);
    const totalSold = salesHistory.reduce((sum, sale) => sum + sale.qty, 0);
    const avgSalesPerDay = totalSold / Math.max(daysSinceFirstSale, 1);
    
    // Aplicar fatores de ajuste
    let adjustmentFactor = 1;
    const factors: string[] = [];

    // Fator sazonal (simulado)
    const currentMonth = new Date().getMonth();
    if ([10, 11].includes(currentMonth)) { // Nov/Dez - temporada alta
      adjustmentFactor *= 1.3;
      factors.push('Temporada alta (Nov/Dez)');
    }

    // Fator de tendência baseado nas vendas recentes
    const recentSales = salesHistory.filter(s => 
      new Date(s.timestamp) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    );
    
    if (recentSales.length > salesHistory.length * 0.3) {
      adjustmentFactor *= 1.2;
      factors.push('Aumento nas vendas recentes');
    }

    // Fator de estoque
    if (product.stock < 10) {
      adjustmentFactor *= 0.8;
      factors.push('Estoque baixo pode limitar vendas');
    }

    const predictedSales = Math.round(avgSalesPerDay * timeframeDays * adjustmentFactor);
    const confidence = Math.min(salesHistory.length / 10, 1); // Máximo 100% com 10+ vendas

    return {
      productId,
      predictedSales,
      confidence,
      factors,
      timeframe
    };
  }

  /**
   * Analisa tendências de vendas
   */
  analyzeTrends(): MLInsight[] {
    const insights: MLInsight[] = [];

    // Análise de produtos em crescimento
    const growingProducts = this.findGrowingProducts();
    if (growingProducts.length > 0) {
      insights.push({
        type: 'trend',
        confidence: 0.8,
        title: 'Produtos em crescimento detectados',
        description: `${growingProducts.length} produtos com aumento significativo nas vendas.`,
        actionItems: [
          'Aumentar estoque dos produtos em crescimento',
          'Considerar aumentar preços gradualmente',
          'Investir em marketing para produtos similares'
        ],
        impact: 'high',
        products: growingProducts.slice(0, 3)
      });
    }

    // Análise de produtos sazonais
    const seasonalInsight = this.analyzeSeasonality();
    if (seasonalInsight) {
      insights.push(seasonalInsight);
    }

    return insights;
  }

  /**
   * Utilidades
   */
  private getDaysSinceFirstSale(salesHistory: Sale[]): number {
    if (salesHistory.length === 0) return 1;
    
    const firstSale = salesHistory.reduce((earliest, sale) => 
      new Date(sale.timestamp) < new Date(earliest.timestamp) ? sale : earliest
    );
    
    return Math.ceil((Date.now() - new Date(firstSale.timestamp).getTime()) / (24 * 60 * 60 * 1000));
  }

  private groupSalesByDate(): Sale[][] {
    const salesByDate: Map<string, Sale[]> = new Map();
    
    this.sales.forEach(sale => {
      const dateKey = new Date(sale.timestamp).toDateString();
      
      if (salesByDate.has(dateKey)) {
        salesByDate.get(dateKey)!.push(sale);
      } else {
        salesByDate.set(dateKey, [sale]);
      }
    });

    return Array.from(salesByDate.values());
  }

  private findGrowingProducts(): Product[] {
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);

    return this.products.filter(product => {
      const recentSales = this.sales.filter(s => 
        s.productId === product.id && 
        new Date(s.timestamp).getTime() > thirtyDaysAgo
      );
      
      const previousSales = this.sales.filter(s => 
        s.productId === product.id && 
        new Date(s.timestamp).getTime() > sixtyDaysAgo &&
        new Date(s.timestamp).getTime() <= thirtyDaysAgo
      );

      const recentTotal = recentSales.reduce((sum, s) => sum + s.qty, 0);
      const previousTotal = previousSales.reduce((sum, s) => sum + s.qty, 0);

      return recentTotal > previousTotal * 1.5; // 50% de aumento
    });
  }

  private analyzeSeasonality(): MLInsight | null {
    const currentMonth = new Date().getMonth();
    
    if ([10, 11].includes(currentMonth)) {
      return {
        type: 'seasonal',
        confidence: 0.9,
        title: 'Temporada alta detectada',
        description: 'Estamos na temporada de maior movimento (Novembro/Dezembro).',
        actionItems: [
          'Aumentar estoque de produtos populares',
          'Preparar campanhas promocionais',
          'Monitorar estoque diariamente'
        ],
        impact: 'high'
      };
    }

    return null;
  }
}
