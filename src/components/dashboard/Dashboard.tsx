'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { RevenueChart } from './RevenueChart';
import { ServiceRevenueChart } from './ServiceRevenueChart';
import { TopProducts } from './TopProducts';
import { StockAlerts } from './StockAlerts';
import { RestockModal } from './RestockModal';
import { Notification } from '@/components/ui/notification';

import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Users,
  BarChart3,
  Wrench
} from 'lucide-react';
import { useInventoryStore } from '@/store';
import { generateRandomData } from '@/lib/api/mockData';
import { Product } from '@/types';

export function Dashboard() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, title: '', message: '', type: 'success' });
  const { 
    products, 
    sales, 
    metrics, 
    serviceOrders,
    recalcFinancialAndServiceMetrics,
    setProducts, 
    setSales, 
    setMetrics,
    getLowStockProducts,
    getTopSellingProducts,
    getTotalRevenue,
    getRevenueByPeriod
  } = useInventoryStore();

  // Carregar dados mock na inicialização
  useEffect(() => {
    const mockData = generateRandomData();
    setProducts(mockData.products);
    setSales(mockData.sales);
    
    // Calcular métricas
    const totalRevenue = mockData.sales.reduce((sum, sale) => sum + (sale.qty * sale.unitPrice), 0);
    const totalSales = mockData.sales.reduce((sum, sale) => sum + sale.qty, 0);
    const activeProducts = mockData.products.filter(p => p.stock > 0).length;
    const lowStockProducts = mockData.products.filter(p => p.stock <= 10).length;
    
    // Calcular crescimento (simulado)
    const prevRevenue = totalRevenue * 0.85; // Simular 15% de crescimento
    const revenueGrowth = ((totalRevenue - prevRevenue) / prevRevenue) * 100;
    
    const mockMetrics = {
      totalRevenue,
      totalSales,
      totalProducts: mockData.products.length,
      activeProducts,
      lowStockProducts,
      revenueGrowth,
      salesGrowth: 12.5,
      profitMargin: 23.4
    };
    
    setMetrics(mockMetrics);
    // incluir receita de serviços concluídos
    recalcFinancialAndServiceMetrics();
  }, [setProducts, setSales, setMetrics, recalcFinancialAndServiceMetrics]);

  // Gerar dados para o gráfico baseado no período
  const generateChartData = () => {
    const now = new Date();
    const data = [];
    
    const periods = {
      week: { count: 7, format: (d: Date) => d.toLocaleDateString('pt-BR', { weekday: 'short' }) },
      month: { count: 30, format: (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) },
      year: { count: 12, format: (d: Date) => d.toLocaleDateString('pt-BR', { month: 'short' }) }
    };
    
    const periodConfig = periods[period];
    
    for (let i = periodConfig.count - 1; i >= 0; i--) {
      const date = new Date(now);
      
      if (period === 'week') {
        date.setDate(date.getDate() - i);
      } else if (period === 'month') {
        date.setDate(date.getDate() - i);
      } else {
        date.setMonth(date.getMonth() - i);
      }
      
      // Simular dados com alguma variação
      const baseRevenue = 15000;
      const variance = (Math.random() - 0.5) * 10000;
      const revenue = Math.max(0, baseRevenue + variance);
      const profit = revenue * 0.3; // 30% de margem
      const salesCount = Math.floor(revenue / 2800); // Preço médio de R$ 2800
      
      data.push({
        date: date.toISOString(),
        revenue,
        profit,
        sales: salesCount,
        label: periodConfig.format(date)
      });
    }
    
    return data;
  };

  // Preparar dados dos produtos mais vendidos
  const topProductsData = getTopSellingProducts(8).map((product, index) => ({
    product,
    totalSold: Math.floor(Math.random() * 50) + 10,
    revenue: (Math.floor(Math.random() * 50) + 10) * product.salePrice,
    growth: index < 3 ? Math.floor(Math.random() * 30) + 5 : Math.floor(Math.random() * 20) - 10
  }));

  // Preparar alertas de estoque
  const stockAlerts = getLowStockProducts().map(product => {
    const minimumStock = 15;
    let severity: 'low' | 'critical' | 'out' = 'low';
    
    if (product.stock === 0) severity = 'out';
    else if (product.stock <= 5) severity = 'critical';
    
    return {
      product,
      currentStock: product.stock,
      minimumStock,
      severity,
      daysUntilOut: product.stock > 0 ? Math.floor(product.stock / 2) : 0,
      suggestedReorder: severity === 'out' ? 50 : severity === 'critical' ? 30 : 20
    };
  });

  const handleReorderProduct = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedQuantity(quantity);
      setIsRestockModalOpen(true);
    }
  };

  const handleConfirmRestock = (productId: string, quantity: number) => {
    // Simular atualização do estoque
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, stock: product.stock + quantity }
        : product
    );
    setProducts(updatedProducts);

    // Mostrar notificação de sucesso
    const product = products.find(p => p.id === productId);
    if (product) {
      const totalCost = quantity * product.costPrice;
      setNotification({
        show: true,
        title: 'Estoque Reposto!',
        message: `+${quantity} unidades de ${product.title} - Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCost)}`,
        type: 'success'
      });
    }
  };

  const chartData = generateChartData();
  // Dados da receita de serviços por período (baseado no mesmo período escolhido)
  const serviceChartData = (() => {
    const now = new Date();
    const points: { date: string; value: number; label: string }[] = [];
    const periods = {
      week: 7,
      month: 30,
      year: 12,
    } as const;
    const count = periods[period];
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now);
      if (period === 'year') d.setMonth(d.getMonth() - i); else d.setDate(d.getDate() - i);
      const label = period === 'year' ? d.toLocaleDateString('pt-BR', { month: 'short' }) : d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      // agrega receita de serviços concluídos na data (simples: usa createdAt ou completedDate)
      const dayKey = d.toISOString().slice(0, period === 'year' ? 7 : 10);
      const total = serviceOrders
        .filter(s => ['completed','delivered'].includes(s.status))
        .filter(s => {
          const base = s.completedDate || s.updatedAt || s.createdAt;
          if (!base) return false;
          const key = base.slice(0, period === 'year' ? 7 : 10);
          return key === dayKey;
        })
        .reduce((sum, so) => sum + (so.finalPrice ?? so.totalCost ?? 0), 0);
      points.push({ date: d.toISOString(), value: total, label });
    }
    return points;
  })();

  if (!metrics) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Visão geral do seu estoque e vendas - {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value={metrics.totalRevenue}
          change={metrics.revenueGrowth}
          changeLabel="vs mês anterior"
          icon={DollarSign}
          trend={metrics.revenueGrowth > 0 ? 'up' : 'down'}
          prefix="R$ "
          description="Vendas realizadas no período"
        />

        <MetricCard
          title="Serviços (OS) Finalizados"
          value={serviceOrders.filter(s => ['completed','delivered'].includes(s.status)).length}
          icon={Wrench}
          trend="up"
          description="Total de OS concluídas/entregues"
        />
        
        <MetricCard
          title="Produtos Ativos"
          value={metrics.activeProducts}
          icon={Package}
          trend="up"
          description={`${metrics.totalProducts} produtos cadastrados`}
          suffix={` / ${metrics.totalProducts}`}
        />
        
        <MetricCard
          title="Vendas Realizadas"
          value={metrics.totalSales}
          change={metrics.salesGrowth}
          changeLabel="vs mês anterior"
          icon={ShoppingCart}
          trend="up"
          description="Unidades vendidas"
        />
        
        <MetricCard
          title="Margem de Lucro"
          value={`${metrics.profitMargin}%`}
          change={2.1}
          changeLabel="vs mês anterior"
          icon={TrendingUp}
          trend="up"
          description="Margem média de lucro"
        />
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Receita (Vendas geral) - ocupa 2 colunas */}
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartData}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>

        {/* Receita de Serviços (OS) */}
        <ServiceRevenueChart data={serviceChartData} />
      </div>

      {/* IA e Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-1">
          <TopProducts
            products={topProductsData}
            period="30 dias"
            onViewProduct={(productId) => console.log('Ver produto:', productId)}
          />
        </div>

        {/* Alertas de Estoque (realocado para esta linha) */}
        <div className="lg:col-span-2">
          <StockAlerts
            alerts={stockAlerts}
            onReorderProduct={handleReorderProduct}
          />
        </div>
      </div>

      {/* Modal de Reposição */}
      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => {
          setIsRestockModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        suggestedQuantity={selectedQuantity}
        onConfirmRestock={handleConfirmRestock}
      />

      {/* Notificação */}
      <Notification
        show={notification.show}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      {/* Métricas Adicionais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Novos Clientes"
          value={47}
          change={23}
          changeLabel="este mês"
          icon={Users}
          trend="up"
          description="Primeiras compras"
        />
        
        <MetricCard
          title="Ticket Médio"
          value={2850}
          change={8.5}
          changeLabel="vs mês anterior"
          icon={BarChart3}
          trend="up"
          prefix="R$ "
          description="Valor médio por venda"
        />

        <MetricCard
          title="Taxa de Conversão"
          value="3.2%"
          change={1.2}
          changeLabel="vs mês anterior"
          icon={TrendingUp}
          trend="up"
          description="Visitantes que compraram"
        />

        <MetricCard
          title="Satisfação"
          value="4.8"
          change={0.3}
          changeLabel="vs mês anterior"
          icon={Users}
          trend="up"
          suffix="/5"
          description="Avaliação média"
        />
      </div>
    </div>
  );
}
