'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  AlertTriangle,
  Users,
  Package,
  DollarSign,
  Wrench,
  BarChart3,
  LineChart,
  Activity,
  Database,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface AIEngineProps {
  isActive?: boolean;
}

// Mock data para demonstração do Engine de IA
const aiAnalytics = {
  behavioralAnalysis: {
    clientSegments: [
      {
        segment: 'Compradores Premium',
        count: 89,
        avgSpend: 4200,
        characteristics: ['Alto valor', 'Fidelizado', 'iPhone preferido'],
        predictedBehavior: 'Upgrade para modelos mais novos',
        confidence: 94
      },
      {
        segment: 'Bargain Hunters',
        count: 234,
        avgSpend: 890,
        characteristics: ['Sensível a preço', 'Promocional', 'Múltiplas marcas'],
        predictedBehavior: 'Aguarda promoções',
        confidence: 87
      },
      {
        segment: 'Tech Enthusiasts',
        count: 156,
        avgSpend: 2340,
        characteristics: ['Lançamentos', 'Acessórios', 'Early adopter'],
        predictedBehavior: 'Interesse em novidades',
        confidence: 91
      }
    ],
    demandPrediction: {
      nextMonth: {
        'iPhone 15 Pro': { demand: 67, confidence: 89 },
        'Samsung S24': { demand: 34, confidence: 82 },
        'Acessórios': { demand: 156, confidence: 95 }
      },
      seasonality: {
        trend: 'Crescimento',
        factor: 1.23,
        events: ['Volta às aulas', 'Black Friday', 'Natal']
      }
    },
    priceOptimization: [
      {
        product: 'iPhone 14 128GB',
        currentPrice: 3300,
        optimalPrice: 3450,
        expectedIncrease: 12.8,
        demandImpact: -3.2
      },
      {
        product: 'Samsung A54',
        currentPrice: 1450,
        optimalPrice: 1380,
        expectedIncrease: 18.4,
        demandImpact: 2.1
      }
    ]
  },
  recommendations: {
    sales: [
      {
        type: 'upsell',
        title: 'Oportunidade de Upsell iPhone',
        description: '89 clientes com iPhone 12/13 elegíveis para upgrade',
        impact: 'Alto',
        revenue: 267000,
        confidence: 87
      },
      {
        type: 'cross-sell',
        title: 'Acessórios para Novos Clientes',
        description: 'Recomendar capas e películas para clientes recentes',
        impact: 'Médio',
        revenue: 23400,
        confidence: 92
      }
    ],
    retention: [
      {
        type: 'churn_prevention',
        title: 'Prevenção de Churn',
        description: '45 clientes VIP em risco de abandono',
        action: 'Oferta personalizada com desconto 10%',
        confidence: 78
      }
    ],
    inventory: [
      {
        type: 'restock',
        title: 'Reabastecimento Inteligente',
        description: 'Estoque de iPhone 15 Pro deve zerar em 8 dias',
        quantity: 25,
        urgency: 'Alta'
      }
    ],
    operations: [
      {
        type: 'process',
        title: 'Otimização de Atendimento',
        description: 'Redirecionar clientes premium para horários específicos',
        efficiency: '+15%',
        satisfaction: '+8%'
      }
    ]
  },
  performance: {
    accuracy: 92.4,
    lastTraining: '2024-02-08T10:30:00Z',
    dataPoints: 847392,
    predictions: 23456,
    successRate: 89.7
  }
};

export function AIEngine({ isActive = true }: AIEngineProps) {
  const [engineStatus, setEngineStatus] = useState<'running' | 'paused' | 'training'>('running');
  const [currentAnalysis, setCurrentAnalysis] = useState<string>('behavioral');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Simular análise contínua
    const interval = setInterval(() => {
      if (engineStatus === 'running') {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [engineStatus]);

  const toggleEngine = () => {
    setEngineStatus(prev => prev === 'running' ? 'paused' : 'running');
  };

  const forceAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Análise forçada completada');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'training': return <RefreshCw className="h-4 w-4 animate-spin" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status e Controles da Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span>Engine de IA - Sistema Japa</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(engineStatus)}>
                {getStatusIcon(engineStatus)}
                <span className="ml-1 capitalize">{engineStatus}</span>
              </Badge>
              {isProcessing && (
                <Badge className="bg-blue-100 text-blue-800">
                  <Activity className="h-3 w-3 mr-1 animate-pulse" />
                  Analisando
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Machine Learning e Deep Analytics em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Performance Metrics */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Performance da IA</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Precisão:</span>
                  <span className="font-medium text-green-600">{aiAnalytics.performance.accuracy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de Sucesso:</span>
                  <span className="font-medium text-blue-600">{aiAnalytics.performance.successRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Predições Ativas:</span>
                  <span className="font-medium">{aiAnalytics.performance.predictions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Data Processing */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Processamento de Dados</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pontos de Dados:</span>
                  <span className="font-medium">{aiAnalytics.performance.dataPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Último Treino:</span>
                  <span className="font-medium">Hoje, 10:30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">Otimizado</Badge>
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Controles</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleEngine}
                  className="w-full"
                >
                  {engineStatus === 'running' ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar Engine
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Engine
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={forceAnalysis}
                  disabled={isProcessing}
                  className="w-full"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                  Análise Forçada
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Machine Learning Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise Comportamental */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Análise Comportamental</span>
            </CardTitle>
            <CardDescription>
              Segmentação automática e padrões de comportamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiAnalytics.behavioralAnalysis.clientSegments.map((segment, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                  <Badge className="bg-blue-100 text-blue-800">
                    {segment.confidence}% confiança
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Clientes: {segment.count} | Gasto médio: R$ {segment.avgSpend.toLocaleString()}</p>
                  <p><strong>Características:</strong> {segment.characteristics.join(', ')}</p>
                  <p><strong>Comportamento Previsto:</strong> {segment.predictedBehavior}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Previsão de Demanda */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Previsão de Demanda</span>
            </CardTitle>
            <CardDescription>
              Predições de vendas e sazonalidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Próximo Mês</h4>
              <div className="space-y-2">
                {Object.entries(aiAnalytics.behavioralAnalysis.demandPrediction.nextMonth).map(([product, data]: [string, any]) => (
                  <div key={product} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{product}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{data.demand} unidades</p>
                      <p className="text-xs text-gray-500">{data.confidence}% confiança</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Tendência Sazonal</h4>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm">
                  <strong className="text-green-800">{aiAnalytics.behavioralAnalysis.demandPrediction.seasonality.trend}</strong>
                  {' '}de {((aiAnalytics.behavioralAnalysis.demandPrediction.seasonality.factor - 1) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Eventos: {aiAnalytics.behavioralAnalysis.demandPrediction.seasonality.events.join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deep Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Deep Analytics</span>
          </CardTitle>
          <CardDescription>
            Padrões ocultos, correlações e anomalias detectadas automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Padrões Ocultos */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-purple-900">Padrões Ocultos</h4>
              </div>
              <p className="text-sm text-purple-800">
                Clientes que compram iPhone tendem a retornar em 18 meses para upgrade
              </p>
              <Badge className="bg-purple-100 text-purple-800 text-xs mt-2">
                Confiança: 89%
              </Badge>
            </div>

            {/* Correlações */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <LineChart className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-900">Correlações</h4>
              </div>
              <p className="text-sm text-blue-800">
                Vendas de capas aumentam 340% após venda de smartphones
              </p>
              <Badge className="bg-blue-100 text-blue-800 text-xs mt-2">
                Correlação: 0.87
              </Badge>
            </div>

            {/* Anomalias */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <h4 className="font-medium text-red-900">Anomalias</h4>
              </div>
              <p className="text-sm text-red-800">
                Pico incomum de vendas Samsung A54 - investigar causa
              </p>
              <Badge className="bg-red-100 text-red-800 text-xs mt-2">
                Desvio: +67%
              </Badge>
            </div>

            {/* Tendências Futuras */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-900">Tendências</h4>
              </div>
              <p className="text-sm text-green-800">
                Crescimento previsto de 23% em manutenções nos próximos 3 meses
              </p>
              <Badge className="bg-green-100 text-green-800 text-xs mt-2">
                Precisão: 91%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendações de Ação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>Recomendações de Ação</span>
          </CardTitle>
          <CardDescription>
            Estratégias automáticas baseadas em análise de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estratégias de Vendas */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>Estratégias de Vendas</span>
              </h4>
              <div className="space-y-2">
                {aiAnalytics.recommendations.sales.map((rec, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-gray-900">{rec.title}</h5>
                      <Badge className={
                        rec.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                        rec.impact === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {rec.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      Potencial: R$ {rec.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Retenção de Clientes */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Retenção de Clientes</span>
              </h4>
              <div className="space-y-2">
                {aiAnalytics.recommendations.retention.map((rec, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h5 className="font-medium text-gray-900">{rec.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      <strong>Ação:</strong> {rec.action}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 text-xs mt-2">
                      {rec.confidence}% confiança
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Otimização de Estoque */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <Package className="h-4 w-4 text-purple-600" />
                <span>Otimização de Estoque</span>
              </h4>
              <div className="space-y-2">
                {aiAnalytics.recommendations.inventory.map((rec, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-gray-900">{rec.title}</h5>
                      <Badge className={
                        rec.urgency === 'Alta' ? 'bg-red-100 text-red-800' :
                        rec.urgency === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {rec.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                    <p className="text-sm font-medium text-purple-600 mt-1">
                      Quantidade: {rec.quantity} unidades
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Melhoria de Processos */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <Settings className="h-4 w-4 text-orange-600" />
                <span>Melhoria de Processos</span>
              </h4>
              <div className="space-y-2">
                {aiAnalytics.recommendations.operations.map((rec, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h5 className="font-medium text-gray-900">{rec.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        Eficiência: {rec.efficiency}
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        Satisfação: {rec.satisfaction}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
