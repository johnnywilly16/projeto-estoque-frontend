import * as tf from '@tensorflow/tfjs';
import { Product, Sale, UserEvent, MLPrediction } from '@/types';

/**
 * Sistema de Machine Learning avançado usando TensorFlow.js
 * Implementa modelos para recomendação e predição de vendas
 */
export class TensorFlowML {
  private model: tf.LayersModel | null = null;
  private isTraining = false;
  private trainingData: { 
    features: number[][], 
    labels: number[], 
    products: Product[],
    sales: Sale[],
    events: UserEvent[]
  } | null = null;

  constructor() {
    this.initializeTensorFlow();
  }

  /**
   * Inicializa TensorFlow.js
   */
  private async initializeTensorFlow() {
    try {
      // Configurar backend (preferir WebGL se disponível)
      await tf.ready();
      console.log('TensorFlow.js carregado:', tf.getBackend());
    } catch (error) {
      console.error('Erro ao inicializar TensorFlow.js:', error);
    }
  }

  /**
   * Prepara dados para treinamento
   */
  private prepareTrainingData(products: Product[], sales: Sale[], events: UserEvent[]) {
    const features: number[][] = [];
    const labels: number[] = [];

    // Para cada produto, criar features baseadas em:
    // - Preço
    // - Categoria (encoding)
    // - Histórico de vendas
    // - Eventos de usuário relacionados
    products.forEach((product, index) => {
      const productSales = sales.filter(s => s.productId === product.id);
      const productEvents = events.filter(e => e.meta?.productId === product.id);
      
      // Features do produto
      const priceNormalized = product.salePrice / 10000; // Normalizar preço
      const stockNormalized = product.stock / 100; // Normalizar estoque
      const categoryEncoded = this.encodeCategoryId(product.categoryId);
      
      // Features de vendas
      const totalSold = productSales.reduce((sum, s) => sum + s.qty, 0);
      const totalRevenue = productSales.reduce((sum, s) => sum + (s.qty * s.unitPrice), 0);
      const avgSalePrice = totalRevenue / Math.max(totalSold, 1);
      const salesFrequency = productSales.length;
      
      // Features de eventos
      const clickEvents = productEvents.filter(e => e.type === 'click').length;
      const viewEvents = productEvents.filter(e => e.type === 'view').length;
      const searchEvents = events.filter(e => 
        e.type === 'search' && 
        e.meta?.query?.toLowerCase().includes(product.title.toLowerCase())
      ).length;
      
      // Features temporais (últimos 30 dias)
      const now = Date.now();
      const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
      const recentSales = productSales.filter(s => 
        new Date(s.timestamp).getTime() > thirtyDaysAgo
      ).length;
      
      // Vector de features (15 dimensões)
      const featureVector = [
        priceNormalized,           // 0: Preço normalizado
        stockNormalized,           // 1: Estoque normalizado
        categoryEncoded,           // 2: Categoria codificada
        totalSold / 100,           // 3: Total vendido normalizado
        salesFrequency / 10,       // 4: Frequência de vendas normalizada
        avgSalePrice / 10000,      // 5: Preço médio de venda normalizado
        clickEvents / 10,          // 6: Eventos de clique normalizados
        viewEvents / 10,           // 7: Eventos de visualização normalizados
        searchEvents / 10,         // 8: Eventos de busca normalizados
        recentSales / 10,          // 9: Vendas recentes normalizadas
        product.salePrice > product.costPrice ? 1 : 0, // 10: Tem margem
        product.stock > 0 ? 1 : 0, // 11: Tem estoque
        product.stock > 10 ? 1 : 0, // 12: Estoque adequado
        (product.salePrice - product.costPrice) / product.salePrice, // 13: Margem %
        index / products.length    // 14: Posição relativa
      ];
      
      features.push(featureVector);
      
      // Label: popularidade score (0-1)
      // Baseado em vendas, eventos e margem
      const popularityScore = Math.min(
        (totalSold / 50 + 
         salesFrequency / 20 + 
         (clickEvents + viewEvents) / 30 +
         recentSales / 10) / 4,
        1
      );
      
      labels.push(popularityScore);
    });

    this.trainingData = {
      features,
      labels,
      products,
      sales,
      events
    };

    return { features, labels };
  }

  /**
   * Codifica categoria em número
   */
  private encodeCategoryId(categoryId: string): number {
    const categoryMap: Record<string, number> = {
      'cat-1': 0.1, // Smartphones
      'cat-2': 0.2, // iPhone
      'cat-3': 0.3, // Samsung
      'cat-4': 0.4, // Acessórios
      'cat-5': 0.5, // Capas
    };
    return categoryMap[categoryId] || 0;
  }

  /**
   * Cria e treina modelo de recomendação
   */
  async trainRecommendationModel(products: Product[], sales: Sale[], events: UserEvent[]): Promise<void> {
    if (this.isTraining) {
      console.log('Modelo já está sendo treinado...');
      return;
    }

    this.isTraining = true;

    try {
      console.log('Preparando dados para treinamento...');
      const { features, labels } = this.prepareTrainingData(products, sales, events);
      
      if (features.length === 0) {
        console.log('Não há dados suficientes para treinamento');
        return;
      }

      // Converter para tensors
      const xs = tf.tensor2d(features);
      const ys = tf.tensor1d(labels);

      console.log('Criando modelo...');
      // Criar arquitetura do modelo
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [15], // 15 features
            units: 32,
            activation: 'relu',
            kernelInitializer: 'randomNormal'
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 16,
            activation: 'relu'
          }),
          tf.layers.dropout({ rate: 0.1 }),
          tf.layers.dense({
            units: 8,
            activation: 'relu'
          }),
          tf.layers.dense({
            units: 1,
            activation: 'sigmoid' // Output entre 0 e 1
          })
        ]
      });

      // Compilar modelo
      this.model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'meanSquaredError',
        metrics: ['mae']
      });

      console.log('Treinando modelo...');
      // Treinar modelo
      const history = await this.model.fit(xs, ys, {
        epochs: 50,
        batchSize: 8,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (epoch % 10 === 0) {
              console.log(`Época ${epoch}: loss = ${logs?.loss?.toFixed(4)}, mae = ${logs?.mae?.toFixed(4)}`);
            }
          }
        }
      });

      console.log('Modelo treinado com sucesso!');
      console.log('Loss final:', history.history.loss[history.history.loss.length - 1]);

      // Limpar tensors
      xs.dispose();
      ys.dispose();

    } catch (error) {
      console.error('Erro durante treinamento:', error);
    } finally {
      this.isTraining = false;
    }
  }

  /**
   * Gera predições para produtos
   */
  async predictProductPopularity(products: Product[]): Promise<MLPrediction[]> {
    if (!this.model || !this.trainingData) {
      throw new Error('Modelo não foi treinado ainda');
    }

    try {
      // Preparar features para predição
      const features: number[][] = [];
      
      products.forEach((product, index) => {
        const productSales = this.trainingData!.sales.filter(s => s.productId === product.id);
        const productEvents = this.trainingData!.events.filter(e => e.meta?.productId === product.id);
        
        const priceNormalized = product.salePrice / 10000;
        const stockNormalized = product.stock / 100;
        const categoryEncoded = this.encodeCategoryId(product.categoryId);
        
        const totalSold = productSales.reduce((sum, s) => sum + s.qty, 0);
        const totalRevenue = productSales.reduce((sum, s) => sum + (s.qty * s.unitPrice), 0);
        const avgSalePrice = totalRevenue / Math.max(totalSold, 1);
        const salesFrequency = productSales.length;
        
        const clickEvents = productEvents.filter(e => e.type === 'click').length;
        const viewEvents = productEvents.filter(e => e.type === 'view').length;
        const searchEvents = this.trainingData!.events.filter(e => 
          e.type === 'search' && 
          e.meta?.query?.toLowerCase().includes(product.title.toLowerCase())
        ).length;
        
        const now = Date.now();
        const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
        const recentSales = productSales.filter(s => 
          new Date(s.timestamp).getTime() > thirtyDaysAgo
        ).length;
        
        const featureVector = [
          priceNormalized,
          stockNormalized,
          categoryEncoded,
          totalSold / 100,
          salesFrequency / 10,
          avgSalePrice / 10000,
          clickEvents / 10,
          viewEvents / 10,
          searchEvents / 10,
          recentSales / 10,
          product.salePrice > product.costPrice ? 1 : 0,
          product.stock > 0 ? 1 : 0,
          product.stock > 10 ? 1 : 0,
          (product.salePrice - product.costPrice) / product.salePrice,
          index / products.length
        ];
        
        features.push(featureVector);
      });

      // Fazer predições
      const xs = tf.tensor2d(features);
      const predictions = await this.model.predict(xs) as tf.Tensor;
      const probabilityArray = await predictions.data();

      // Converter para resultado estruturado
      const results: MLPrediction[] = products.map((product, index) => {
        const probability = probabilityArray[index];
        const confidence = Math.min(this.trainingData!.sales.length / 20, 1); // Mais dados = mais confiança
        
        // Gerar fatores explicativos
        const factors: string[] = [];
        const productSales = this.trainingData!.sales.filter(s => s.productId === product.id);
        
        if (productSales.length > 5) factors.push('Histórico de vendas positivo');
        if (product.stock > 10) factors.push('Estoque adequado');
        if (product.salePrice > product.costPrice * 1.2) factors.push('Boa margem de lucro');
        if (probability > 0.7) factors.push('Alta demanda prevista');
        if (probability < 0.3) factors.push('Baixa demanda prevista');
        
        // Estimar vendas baseado na probabilidade
        const avgSalesPerWeek = productSales.length > 0 ? 
          productSales.length / Math.max((Date.now() - new Date(productSales[0].timestamp).getTime()) / (7 * 24 * 60 * 60 * 1000), 1) :
          0;
        
        const estimatedSales = Math.round(avgSalesPerWeek * probability * 4); // 4 semanas

        return {
          productId: product.id,
          probability,
          confidence,
          timeframe: 'month' as const,
          factors,
          estimatedSales
        };
      });

      // Limpar tensors
      xs.dispose();
      predictions.dispose();

      return results.sort((a, b) => b.probability - a.probability);

    } catch (error) {
      console.error('Erro na predição:', error);
      throw error;
    }
  }

  /**
   * Retreina modelo incrementalmente com novos dados
   */
  async incrementalTrain(newProducts: Product[], newSales: Sale[], newEvents: UserEvent[]): Promise<void> {
    if (!this.trainingData) {
      // Primeiro treinamento
      await this.trainRecommendationModel(newProducts, newSales, newEvents);
      return;
    }

    try {
      console.log('Retreino incremental iniciado...');
      
      // Combinar dados antigos com novos
      const allProducts = [...this.trainingData.products, ...newProducts];
      const allSales = [...this.trainingData.sales, ...newSales];
      const allEvents = [...this.trainingData.events, ...newEvents];
      
      // Remover duplicatas
      const uniqueProducts = allProducts.filter((product, index, self) => 
        index === self.findIndex(p => p.id === product.id)
      );
      
      // Re-treinar com todos os dados
      await this.trainRecommendationModel(uniqueProducts, allSales, allEvents);
      
      console.log('Retreino incremental concluído');
    } catch (error) {
      console.error('Erro no retreino incremental:', error);
    }
  }

  /**
   * Salva modelo treinado
   */
  async saveModel(name: string): Promise<void> {
    if (!this.model) {
      throw new Error('Nenhum modelo para salvar');
    }

    try {
      await this.model.save(`localstorage://${name}`);
      console.log(`Modelo salvo como ${name}`);
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
      throw error;
    }
  }

  /**
   * Carrega modelo salvo
   */
  async loadModel(name: string): Promise<void> {
    try {
      this.model = await tf.loadLayersModel(`localstorage://${name}`);
      console.log(`Modelo ${name} carregado`);
    } catch (error) {
      console.error('Erro ao carregar modelo:', error);
      throw error;
    }
  }

  /**
   * Obtém informações do modelo
   */
  getModelInfo(): { 
    isReady: boolean; 
    isTraining: boolean; 
    hasTrainingData: boolean;
    backend: string;
  } {
    return {
      isReady: !!this.model,
      isTraining: this.isTraining,
      hasTrainingData: !!this.trainingData,
      backend: tf.getBackend()
    };
  }

  /**
   * Limpa recursos
   */
  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
    this.trainingData = null;
  }
}

