'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter,
  Download,
  Share,
  Brain,
  AlertTriangle,
  Target,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface FinancialReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PeriodType = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export function FinancialReportsModal({ isOpen, onClose }: FinancialReportsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data financeiro
  const financialData = {
    revenue: {
      gross: 847500,
      net: 678000,
      growth: 12.5
    },
    costs: {
      total: 169500,
      products: 135600,
      labor: 33900
    },
    profit: {
      gross: 677900,
      net: 508500,
      margin: 60.0
    },
    breakdown: {
      sales: 678000,
      maintenance: 169500
    },
    paymentMethods: [
      { method: 'PIX', amount: 423750, percentage: 50 },
      { method: 'Cartão de Crédito', amount: 254250, percentage: 30 },
      { method: 'Cartão de Débito', amount: 127125, percentage: 15 },
      { method: 'Dinheiro', amount: 42375, percentage: 5 }
    ],
    timeline: [
      { date: '2024-02-01', revenue: 28500, costs: 5700, profit: 22800 },
      { date: '2024-02-02', revenue: 31200, costs: 6240, profit: 24960 },
      { date: '2024-02-03', revenue: 27800, costs: 5560, profit: 22240 },
      { date: '2024-02-04', revenue: 35600, costs: 7120, profit: 28480 },
      { date: '2024-02-05', revenue: 42300, costs: 8460, profit: 33840 },
      { date: '2024-02-06', revenue: 38900, costs: 7780, profit: 31120 },
      { date: '2024-02-07', revenue: 33400, costs: 6680, profit: 26720 }
    ]
  };

  const periodOptions = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mês' },
    { value: 'quarter', label: 'Trimestre' },
    { value: 'year', label: 'Ano' },
    { value: 'custom', label: 'Período Customizado' }
  ];

  const aiInsights = [
    {
      type: 'trend',
      title: 'Tendência Positiva Identificada',
      description: 'Receita crescendo 12.5% comparado ao mês anterior',
      impact: 'Alto',
      confidence: 94
    },
    {
      type: 'alert',
      title: 'Alerta de Margem',
      description: 'Margem de lucro abaixo da meta de 65% nos últimos 3 dias',
      impact: 'Médio',
      confidence: 87
    },
    {
      type: 'opportunity',
      title: 'Oportunidade de Crescimento',
      description: 'PIX representa 50% dos pagamentos - potencial para incentivar ainda mais',
      impact: 'Alto',
      confidence: 91
    },
    {
      type: 'forecast',
      title: 'Previsão para Março',
      description: 'Projeção de crescimento de 18% baseada nos padrões atuais',
      impact: 'Alto',
      confidence: 89
    }
  ];

  const generateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simular geração de relatório
      console.log('Relatório financeiro gerado para período:', selectedPeriod);
    }, 2000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'opportunity': return <Target className="h-4 w-4 text-blue-600" />;
      case 'forecast': return <Brain className="h-4 w-4 text-purple-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'bg-green-50 border-green-200';
      case 'alert': return 'bg-amber-50 border-amber-200';
      case 'opportunity': return 'bg-blue-50 border-blue-200';
      case 'forecast': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Relatório Financeiro Completo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button size="sm" onClick={generateReport} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </>
                )}
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Análise financeira detalhada com insights de IA e projeções
          </DialogDescription>
        </DialogHeader>

        {/* Filtros de Período */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros de Período</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {periodOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedPeriod === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(option.value as PeriodType)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {selectedPeriod === 'custom' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Inicial
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Final
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Métricas
            </TabsTrigger>
            <TabsTrigger value="breakdown">
              <PieChart className="h-4 w-4 mr-2" />
              Análise Detalhada
            </TabsTrigger>
            <TabsTrigger value="evolution">
              <LineChart className="h-4 w-4 mr-2" />
              Evolução
            </TabsTrigger>
            <TabsTrigger value="ai-analysis">
              <Brain className="h-4 w-4 mr-2" />
              IA Análise
            </TabsTrigger>
          </TabsList>

          {/* Métricas Principais */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Receita Bruta */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Bruta</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(financialData.revenue.gross)}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">
                      +{formatPercentage(financialData.revenue.growth)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Custos Totais */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(financialData.costs.total)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatPercentage((financialData.costs.total / financialData.revenue.gross) * 100)} da receita
                  </div>
                </CardContent>
              </Card>

              {/* Lucro Líquido */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                  <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(financialData.profit.net)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Margem: {formatPercentage(financialData.profit.margin)}
                  </div>
                </CardContent>
              </Card>

              {/* Margem de Lucro */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPercentage(financialData.profit.margin)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${financialData.profit.margin}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumo Visual */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>
                  Distribuição de receitas e custos no período selecionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-green-900">Receita Total</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(financialData.revenue.gross)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700">Vendas + Manutenções</p>
                      <p className="text-xs text-green-600">
                        Crescimento: +{formatPercentage(financialData.revenue.growth)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900">Custos</h4>
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(financialData.costs.total)}
                      </p>
                      <p className="text-xs text-red-700">
                        Produtos: {formatCurrency(financialData.costs.products)}
                      </p>
                      <p className="text-xs text-red-700">
                        Mão de obra: {formatCurrency(financialData.costs.labor)}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900">Lucro</h4>
                      <p className="text-xl font-bold text-purple-600">
                        {formatCurrency(financialData.profit.net)}
                      </p>
                      <p className="text-xs text-purple-700">
                        Margem: {formatPercentage(financialData.profit.margin)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise Detalhada */}
          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Receita por Categoria */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-900">Vendas</h4>
                        <p className="text-sm text-blue-700">Produtos e acessórios</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {formatCurrency(financialData.breakdown.sales)}
                        </p>
                        <p className="text-xs text-blue-600">
                          {formatPercentage((financialData.breakdown.sales / financialData.revenue.gross) * 100)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-orange-900">Manutenções</h4>
                        <p className="text-sm text-orange-700">Serviços técnicos</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">
                          {formatCurrency(financialData.breakdown.maintenance)}
                        </p>
                        <p className="text-xs text-orange-600">
                          {formatPercentage((financialData.breakdown.maintenance / financialData.revenue.gross) * 100)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formas de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {financialData.paymentMethods.map((payment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{payment.method}</span>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(payment.amount)} ({payment.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${payment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Evolução Temporal */}
          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Temporal</CardTitle>
                <CardDescription>
                  Crescimento diário de receitas, custos e lucros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.timeline.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {new Date(day.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-right">
                        <div>
                          <p className="text-xs text-gray-500">Receita</p>
                          <p className="font-medium text-green-600">
                            {formatCurrency(day.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Custos</p>
                          <p className="font-medium text-red-600">
                            {formatCurrency(day.costs)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Lucro</p>
                          <p className="font-medium text-purple-600">
                            {formatCurrency(day.profit)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA Análise Financeira */}
          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className={`border-2 ${getInsightColor(insight.type)}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getInsightIcon(insight.type)}
                        <span className="text-lg">{insight.title}</span>
                      </div>
                      <Badge variant="outline">
                        {insight.confidence}% confiança
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={
                        insight.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        Impacto: {insight.impact}
                      </Badge>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recomendações de Ação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Recomendações de Ação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900">📈 Oportunidade Imediata</h4>
                  <p className="text-sm text-green-800 mt-1">
                    Incentivar pagamentos via PIX com desconto adicional para aumentar margem de lucro
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900">⚠️ Atenção Necessária</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Revisar custos de produtos para melhorar margem que está abaixo da meta
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900">🎯 Estratégia Futura</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    Focar em produtos premium com maior margem para sustentar crescimento projetado
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
