'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  DollarSign,
  Users,
  Package,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

export function ReportsDashboard() {
  // Mock data para o dashboard executivo
  const executiveMetrics = {
    revenue: {
      total: 847500,
      growth: 12.5,
      target: 900000,
      achieved: 94.2
    },
    monthlyGrowth: 8.3,
    targetRealized: 94.2,
    aiPrediction: 'Crescimento sustentável de 15% no próximo trimestre'
  };

  const kpis = [
    {
      title: 'Receita Total',
      value: 'R$ 847.500',
      change: '+12.5%',
      isPositive: true,
      target: 'Meta: R$ 900k',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Crescimento Mensal',
      value: '8.3%',
      change: '+2.1%',
      isPositive: true,
      target: 'Meta: 10%',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Meta vs Realizado',
      value: '94.2%',
      change: '+4.2%',
      isPositive: true,
      target: 'Faltam: R$ 52.5k',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Precisão IA',
      value: '92.4%',
      change: '+1.8%',
      isPositive: true,
      target: 'Última semana',
      icon: Brain,
      color: 'text-pink-600'
    }
  ];

  const businessInsights = [
    {
      type: 'success',
      title: 'Meta Mensal Quase Atingida',
      description: 'Faltam apenas R$ 52.500 para bater a meta de fevereiro',
      action: 'Focar em produtos premium',
      priority: 'Alta'
    },
    {
      type: 'warning',
      title: 'Estoque Baixo em Produtos Top',
      description: 'iPhone 15 Pro com apenas 3 unidades restantes',
      action: 'Reabastecer urgentemente',
      priority: 'Crítica'
    },
    {
      type: 'info',
      title: 'Oportunidade de Upsell',
      description: '24 clientes VIP sem compras há 30+ dias',
      action: 'Campanha personalizada',
      priority: 'Média'
    },
    {
      type: 'success',
      title: 'Performance de Manutenção',
      description: 'Satisfação dos clientes em 96% este mês',
      action: 'Manter padrão de qualidade',
      priority: 'Baixa'
    }
  ];

  const quickMetrics = [
    {
      category: 'Vendas',
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      metrics: [
        { label: 'Produtos Vendidos', value: '1.247' },
        { label: 'Ticket Médio', value: 'R$ 679' },
        { label: 'Margem Média', value: '22.3%' }
      ]
    },
    {
      category: 'Clientes',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      metrics: [
        { label: 'Novos Clientes', value: '156' },
        { label: 'Taxa Retenção', value: '87.2%' },
        { label: 'NPS Score', value: '8.9' }
      ]
    },
    {
      category: 'Manutenção',
      icon: Wrench,
      color: 'bg-orange-50 text-orange-600',
      metrics: [
        { label: 'Serviços Realizados', value: '89' },
        { label: 'Tempo Médio', value: '2.3h' },
        { label: 'Satisfação', value: '96%' }
      ]
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs flex items-center ${
                    kpi.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {kpi.target}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Resumo Executivo</span>
          </CardTitle>
          <CardDescription>
            Visão geral do desempenho e projeções
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Situação Atual</h4>
                <p className="text-sm text-green-800">
                  Fevereiro está sendo um mês excepcional! Já atingimos 94.2% da meta mensal 
                  com crescimento de 12.5% em relação ao mês anterior. Performance acima da média.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Projeção da IA</h4>
                <div className="flex items-start space-x-2">
                  <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    {executiveMetrics.aiPrediction}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Metas e Indicadores</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta Mensal</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: '94.2%' }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Crescimento Anual</span>
                  <span className="font-medium">67.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: '67.8%' }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Satisfação Cliente</span>
                  <span className="font-medium">96.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: '96%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quickMetrics.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex justify-between">
                    <span className="text-sm text-gray-600">{metric.label}:</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights de Negócio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Insights de Negócio</span>
          </CardTitle>
          <CardDescription>
            Análises automáticas e recomendações de ação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {businessInsights.map((insight, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {insight.description}
                    </p>
                    <p className="text-xs font-medium text-gray-900">
                      💡 {insight.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
