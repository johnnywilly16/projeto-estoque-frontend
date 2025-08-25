'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Target, 
  TrendingUp,
  TrendingDown,
  Brain,
  Heart,
  AlertTriangle,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
  Share
} from 'lucide-react';

interface ClientReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientReportsModal({ isOpen, onClose }: ClientReportsModalProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para clientes
  const clientsData = {
    overview: {
      total: 1247,
      active: 892,
      new: 156,
      retention: 87.2
    },
    segments: {
      byValue: [
        { segment: 'VIP (R$ 5000+)', count: 89, percentage: 7.1, totalValue: 847500 },
        { segment: 'Premium (R$ 2000-5000)', count: 234, percentage: 18.8, totalValue: 623400 },
        { segment: 'Regular (R$ 500-2000)', count: 567, percentage: 45.5, totalValue: 445200 },
        { segment: 'Novo (< R$ 500)', count: 357, percentage: 28.6, totalValue: 123900 }
      ],
      byFrequency: [
        { segment: 'Frequente (Mensal)', count: 123, percentage: 9.9 },
        { segment: 'Regular (Trimestral)', count: 445, percentage: 35.7 },
        { segment: 'Esporádico (Semestral)', count: 398, percentage: 31.9 },
        { segment: 'Eventual (Anual+)', count: 281, percentage: 22.5 }
      ],
      byLocation: [
        { location: 'Centro', count: 412, percentage: 33.0 },
        { location: 'Zona Sul', count: 298, percentage: 23.9 },
        { location: 'Zona Norte', count: 256, percentage: 20.5 },
        { location: 'Zona Oeste', count: 189, percentage: 15.2 },
        { location: 'Outros', count: 92, percentage: 7.4 }
      ]
    },
    behavior: {
      averageTicket: 679.50,
      averageFrequency: 2.3,
      preferredPayment: 'PIX',
      bestContactTime: 'Tarde (14h-18h)',
      npsScore: 8.9
    },
    lifecycle: [
      { stage: 'Novos Leads', count: 89, conversion: 76 },
      { stage: 'Primeira Compra', count: 67, conversion: 89 },
      { stage: 'Cliente Ativo', count: 892, conversion: 95 },
      { stage: 'Cliente Fiel', count: 234, conversion: 98 },
      { stage: 'Reativação', count: 45, conversion: 67 }
    ]
  };

  const aiInsights = [
    {
      type: 'vip',
      title: '24 Clientes VIP Identificados',
      description: 'Clientes com potencial para gastos acima de R$ 5.000',
      clients: ['João Silva', 'Maria Santos', 'Pedro Costa', '+21 outros'],
      action: 'Oferecer atendimento premium',
      impact: 'Alto'
    },
    {
      type: 'churn',
      title: '67 Clientes em Risco de Churn',
      description: 'Sem compras há 90+ dias com padrão histórico ativo',
      riskLevel: 'Médio-Alto',
      value: 89400,
      action: 'Campanha de reativação personalizada',
      impact: 'Alto'
    },
    {
      type: 'upsell',
      title: '156 Oportunidades de Upsell',
      description: 'Clientes regulares com potencial para produtos premium',
      averageIncrease: 340,
      totalPotential: 53040,
      action: 'Recomendar produtos complementares',
      impact: 'Médio'
    },
    {
      type: 'campaign',
      title: 'Campanhas Sugeridas',
      description: 'Segmentação automática para campanhas direcionadas',
      segments: ['iPhone Users', 'Acessórios Lovers', 'Business Clients'],
      expectedReturn: 23.5,
      action: 'Criar campanhas segmentadas',
      impact: 'Alto'
    }
  ];

  const generateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Relatório de clientes gerado');
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getSegmentColor = (index: number) => {
    const colors = [
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800'
    ];
    return colors[index % colors.length];
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'vip': return <Target className="h-5 w-5 text-yellow-600" />;
      case 'churn': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'upsell': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'campaign': return <Mail className="h-5 w-5 text-blue-600" />;
      default: return <Brain className="h-5 w-5 text-purple-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-yellow-50 border-yellow-200';
      case 'churn': return 'bg-red-50 border-red-200';
      case 'upsell': return 'bg-green-50 border-green-200';
      case 'campaign': return 'bg-blue-50 border-blue-200';
      default: return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Relatório de Clientes e Segmentação</span>
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
            Análise completa da base de clientes com segmentação automática e insights de IA
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="segmentation">
              <Target className="h-4 w-4 mr-2" />
              Segmentação
            </TabsTrigger>
            <TabsTrigger value="intelligence">
              <Brain className="h-4 w-4 mr-2" />
              Customer Intelligence
            </TabsTrigger>
          </TabsList>

          {/* Análise da Base de Clientes */}
          <TabsContent value="overview" className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clientsData.overview.total.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Base completa de clientes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{clientsData.overview.active}</div>
                  <p className="text-xs text-muted-foreground">
                    {((clientsData.overview.active / clientsData.overview.total) * 100).toFixed(1)}% da base
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{clientsData.overview.new}</div>
                  <p className="text-xs text-muted-foreground">
                    Últimos 30 dias
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                  <Heart className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{clientsData.behavior.npsScore}/10</div>
                  <p className="text-xs text-muted-foreground">
                    NPS Score médio
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Comportamento dos Clientes */}
            <Card>
              <CardHeader>
                <CardTitle>Análise Comportamental</CardTitle>
                <CardDescription>
                  Padrões de comportamento e preferências dos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Padrões de Compra</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ticket Médio:</span>
                        <span className="font-medium">{formatCurrency(clientsData.behavior.averageTicket)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Frequência Média:</span>
                        <span className="font-medium">{clientsData.behavior.averageFrequency}x/mês</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Forma Preferida:</span>
                        <Badge className="bg-green-100 text-green-800">{clientsData.behavior.preferredPayment}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Preferências de Contato</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Melhor Horário:</span>
                        <span className="font-medium">{clientsData.behavior.bestContactTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Taxa de Resposta:</span>
                        <span className="font-medium text-green-600">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Canal Preferido:</span>
                        <Badge className="bg-blue-100 text-blue-800">WhatsApp</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Satisfação</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">NPS Score:</span>
                        <span className="font-medium text-green-600">{clientsData.behavior.npsScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retenção:</span>
                        <span className="font-medium text-green-600">{clientsData.overview.retention}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Recomendação:</span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ciclo de Vida do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Ciclo de Vida dos Clientes</CardTitle>
                <CardDescription>
                  Funil de conversão e retenção de clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientsData.lifecycle.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-purple-500' :
                          index === 2 ? 'bg-green-500' :
                          index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                          <p className="text-sm text-gray-600">{stage.count} clientes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">
                          {stage.conversion}% conversão
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segmentação de Clientes */}
          <TabsContent value="segmentation" className="space-y-6">
            {/* Segmentação por Valor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Segmentação por Valor Gasto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientsData.segments.byValue.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSegmentColor(index)}>
                          {segment.segment}
                        </Badge>
                        <div>
                          <p className="font-medium">{segment.count} clientes</p>
                          <p className="text-sm text-gray-600">{segment.percentage}% da base</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(segment.totalValue)}</p>
                        <p className="text-sm text-gray-600">Valor total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Segmentação por Frequência */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Por Frequência de Compra</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {clientsData.segments.byFrequency.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{segment.segment}</span>
                        <span className="text-sm text-gray-600">
                          {segment.count} ({segment.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Segmentação por Localização */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>Por Localização</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {clientsData.segments.byLocation.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{segment.location}</span>
                        <span className="text-sm text-gray-600">
                          {segment.count} ({segment.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IA Customer Intelligence */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className={`border-2 ${getInsightColor(insight.type)}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <span>{insight.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{insight.description}</p>
                    
                    {insight.clients && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Clientes Identificados:</h5>
                        <div className="flex flex-wrap gap-1">
                          {insight.clients.map((client, clientIndex) => (
                            <Badge key={clientIndex} variant="outline" className="text-xs">
                              {client}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {insight.value && (
                      <div className="p-3 bg-white bg-opacity-50 rounded-lg">
                        <p className="text-sm text-gray-600">Valor em Risco:</p>
                        <p className="font-bold text-red-600">{formatCurrency(insight.value)}</p>
                      </div>
                    )}

                    {insight.totalPotential && (
                      <div className="p-3 bg-white bg-opacity-50 rounded-lg">
                        <p className="text-sm text-gray-600">Potencial Total:</p>
                        <p className="font-bold text-green-600">{formatCurrency(insight.totalPotential)}</p>
                      </div>
                    )}

                    {insight.segments && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Segmentos Sugeridos:</h5>
                        <div className="flex flex-wrap gap-1">
                          {insight.segments.map((segment, segIndex) => (
                            <Badge key={segIndex} className="bg-blue-100 text-blue-800 text-xs">
                              {segment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t space-y-2">
                      <p className="text-sm font-medium text-gray-900">💡 Ação Recomendada:</p>
                      <p className="text-sm text-gray-700">{insight.action}</p>
                      <Badge className={
                        insight.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        Impacto: {insight.impact}
                      </Badge>
                    </div>

                    <Button size="sm" className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      Implementar Estratégia
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Campanhas Sugeridas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Campanhas Automáticas Sugeridas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900">🚨 Reativação de Clientes</h4>
                    <p className="text-sm text-red-800 mt-1">
                      67 clientes inativos • Desconto 15% • ROI esperado: 340%
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900">💎 Programa VIP</h4>
                    <p className="text-sm text-green-800 mt-1">
                      24 clientes elegíveis • Atendimento premium • ROI esperado: 280%
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900">📱 Cross-sell Acessórios</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      156 oportunidades • Produtos complementares • ROI esperado: 190%
                    </p>
                  </div>
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
