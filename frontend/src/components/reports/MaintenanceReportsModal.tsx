'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  Star, 
  AlertTriangle,
  Smartphone,
  Brain,
  Target,
  TrendingUp,
  Award,
  Settings,
  BarChart3,
  Download,
  Share
} from 'lucide-react';

interface MaintenanceReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MaintenanceReportsModal({ isOpen, onClose }: MaintenanceReportsModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para manutenções
  const maintenanceData = {
    overview: {
      totalServices: 267,
      completed: 242,
      cancelled: 12,
      inProgress: 13,
      averageTime: 2.3,
      satisfaction: 96.2,
      approval: 89.5
    },
    services: [
      {
        service: 'Troca de Tela',
        count: 89,
        revenue: 42750,
        avgTime: 1.5,
        satisfaction: 94.2,
        margin: 65.8
      },
      {
        service: 'Troca de Bateria',
        count: 67,
        revenue: 16750,
        avgTime: 0.8,
        satisfaction: 98.1,
        margin: 72.3
      },
      {
        service: 'Reparo de Placa',
        count: 34,
        revenue: 20400,
        avgTime: 4.2,
        satisfaction: 91.2,
        margin: 58.4
      },
      {
        service: 'Desbloqueio',
        count: 28,
        revenue: 8400,
        avgTime: 2.1,
        satisfaction: 89.6,
        margin: 85.7
      },
      {
        service: 'Limpeza Geral',
        count: 23,
        revenue: 1380,
        avgTime: 0.5,
        satisfaction: 97.8,
        margin: 91.3
      }
    ],
    devices: [
      {
        device: 'iPhone',
        count: 156,
        commonIssues: ['Tela quebrada', 'Bateria viciada', 'Botão home'],
        avgRepairTime: 2.1,
        satisfaction: 95.8
      },
      {
        device: 'Samsung',
        count: 89,
        commonIssues: ['Tela touch', 'Conector carga', 'Camera'],
        avgRepairTime: 2.8,
        satisfaction: 93.4
      },
      {
        device: 'Xiaomi',
        count: 34,
        commonIssues: ['Software', 'Sensor digital', 'Alto-falante'],
        avgRepairTime: 3.2,
        satisfaction: 91.7
      }
    ],
    technicians: [
      {
        name: 'Carlos Técnico',
        services: 67,
        avgRating: 4.8,
        specialties: ['iPhone', 'Placa'],
        efficiency: 95.2
      },
      {
        name: 'Ana Especialista',
        services: 89,
        avgRating: 4.9,
        specialties: ['Samsung', 'Tela'],
        efficiency: 97.1
      },
      {
        name: 'João Sênior',
        services: 45,
        avgRating: 4.7,
        specialties: ['Desbloqueio', 'Software'],
        efficiency: 92.8
      }
    ],
    warranties: {
      active: 187,
      expired: 67,
      claimed: 12,
      satisfied: 98.3
    }
  };

  const aiInsights = [
    {
      type: 'trending',
      title: 'Serviços em Alta Demanda',
      description: 'Trocas de bateria aumentaram 35% no último mês',
      trend: '+35%',
      impact: 'Alto',
      action: 'Aumentar estoque de baterias iPhone 15'
    },
    {
      type: 'problematic',
      title: 'Dispositivos Problemáticos',
      description: 'iPhone 12 com alta incidência de problemas de tela',
      devices: ['iPhone 12', 'Samsung A54'],
      impact: 'Médio',
      action: 'Investigar lote de telas fornecedor X'
    },
    {
      type: 'opportunity',
      title: 'Oportunidade de Serviço',
      description: 'Clientes com dispositivos > 2 anos sem manutenção preventiva',
      potential: 156,
      revenue: 23400,
      action: 'Campanha de manutenção preventiva'
    },
    {
      type: 'training',
      title: 'Necessidade de Treinamento',
      description: 'Novos modelos Galaxy S24 requerem técnicas específicas',
      technicians: 3,
      priority: 'Média',
      action: 'Agendar treinamento especializado'
    }
  ];

  const generateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Relatório de manutenção gerado');
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getServiceStatusColor = (satisfaction: number) => {
    if (satisfaction >= 95) return 'text-green-600';
    if (satisfaction >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'problematic': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'opportunity': return <Target className="h-5 w-5 text-blue-600" />;
      case 'training': return <Award className="h-5 w-5 text-purple-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trending': return 'bg-green-50 border-green-200';
      case 'problematic': return 'bg-red-50 border-red-200';
      case 'opportunity': return 'bg-blue-50 border-blue-200';
      case 'training': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-orange-600" />
              <span>Relatório de Manutenção e Serviços</span>
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
            Performance técnica, satisfação do cliente e insights operacionais
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <Settings className="h-4 w-4 mr-2" />
              Análise Técnica
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Brain className="h-4 w-4 mr-2" />
              IA Insights
            </TabsTrigger>
          </TabsList>

          {/* Performance dos Serviços */}
          <TabsContent value="performance" className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Serviços Realizados</CardTitle>
                  <Wrench className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{maintenanceData.overview.totalServices}</div>
                  <p className="text-xs text-muted-foreground">
                    {maintenanceData.overview.completed} concluídos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{maintenanceData.overview.averageTime}h</div>
                  <p className="text-xs text-muted-foreground">
                    Por serviço
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{maintenanceData.overview.approval}%</div>
                  <p className="text-xs text-muted-foreground">
                    Orçamentos aprovados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                  <Star className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{maintenanceData.overview.satisfaction}%</div>
                  <p className="text-xs text-muted-foreground">
                    Média geral
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Ranking de Serviços */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span>Serviços Mais Realizados</span>
                </CardTitle>
                <CardDescription>
                  Performance e rentabilidade por tipo de serviço
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {maintenanceData.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.service}</h4>
                        <p className="text-sm text-gray-500">
                          {service.count} serviços • {service.avgTime}h médio
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-green-600">
                        {formatCurrency(service.revenue)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={service.satisfaction >= 95 ? 'bg-green-100 text-green-800' : 
                                       service.satisfaction >= 90 ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-red-100 text-red-800'}>
                          {service.satisfaction}% satisfação
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {service.margin.toFixed(1)}% margem
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance por Técnico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span>Performance dos Técnicos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {maintenanceData.technicians.map((tech, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{tech.name}</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          {tech.avgRating}/5 ⭐
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Serviços:</span>
                          <span className="font-medium">{tech.services}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Eficiência:</span>
                          <span className="font-medium text-green-600">{tech.efficiency}%</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {tech.specialties.map((specialty, specIndex) => (
                              <Badge key={specIndex} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise Técnica */}
          <TabsContent value="analysis" className="space-y-6">
            {/* Dispositivos Mais Reparados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <span>Análise por Dispositivo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {maintenanceData.devices.map((device, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{device.device}</h4>
                        <p className="text-sm text-gray-600">{device.count} reparos realizados</p>
                      </div>
                      <div className="text-right">
                        <Badge className={device.satisfaction >= 95 ? 'bg-green-100 text-green-800' : 
                                       device.satisfaction >= 90 ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-red-100 text-red-800'}>
                          {device.satisfaction}% satisfação
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {device.avgRepairTime}h tempo médio
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Problemas Mais Comuns:</p>
                      <div className="flex flex-wrap gap-1">
                        {device.commonIssues.map((issue, issueIndex) => (
                          <Badge key={issueIndex} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Garantias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Status das Garantias</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{maintenanceData.warranties.active}</div>
                    <p className="text-sm text-green-800">Garantias Ativas</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{maintenanceData.warranties.expired}</div>
                    <p className="text-sm text-gray-800">Expiradas</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{maintenanceData.warranties.claimed}</div>
                    <p className="text-sm text-blue-800">Acionadas</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{maintenanceData.warranties.satisfied}%</div>
                    <p className="text-sm text-yellow-800">Satisfação</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Peças Mais Utilizadas */}
            <Card>
              <CardHeader>
                <CardTitle>Peças Mais Utilizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { part: 'Tela iPhone 15 Pro', used: 45, cost: 380, stock: 12 },
                    { part: 'Bateria iPhone 14', used: 67, cost: 120, stock: 23 },
                    { part: 'Conector Samsung S24', used: 23, cost: 85, stock: 8 },
                    { part: 'Alto-falante iPhone 13', used: 18, cost: 65, stock: 15 }
                  ].map((part, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{part.part}</h4>
                        <p className="text-sm text-gray-600">
                          {part.used} utilizadas • {formatCurrency(part.cost)} cada
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={part.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          Estoque: {part.stock}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA Insights Técnicos */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className={`border-2 ${getInsightColor(insight.type)}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <span>{insight.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{insight.description}</p>
                    
                    {insight.trend && (
                      <div className="p-3 bg-white bg-opacity-50 rounded-lg">
                        <p className="text-sm text-gray-600">Tendência:</p>
                        <p className="font-bold text-green-600">{insight.trend}</p>
                      </div>
                    )}

                    {insight.devices && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Dispositivos Afetados:</p>
                        <div className="flex flex-wrap gap-1">
                          {insight.devices.map((device, deviceIndex) => (
                            <Badge key={deviceIndex} variant="outline" className="text-xs">
                              {device}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {insight.potential && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white bg-opacity-50 rounded-lg">
                          <p className="text-sm text-gray-600">Clientes:</p>
                          <p className="font-bold text-blue-600">{insight.potential}</p>
                        </div>
                        <div className="p-3 bg-white bg-opacity-50 rounded-lg">
                          <p className="text-sm text-gray-600">Receita Potencial:</p>
                          <p className="font-bold text-green-600">{formatCurrency(insight.revenue!)}</p>
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
                      Implementar Sugestão
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo das Recomendações */}
            <Card>
              <CardHeader>
                <CardTitle>Plano de Ação Técnico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-900">🔧 Operacional</h4>
                    <p className="text-sm text-orange-800 mt-1">
                      Reabastecer peças críticas e otimizar fluxo de trabalho
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-900">🎓 Treinamento</h4>
                    <p className="text-sm text-purple-800 mt-1">
                      Capacitar equipe em novos modelos e técnicas avançadas
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900">💰 Comercial</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Promover manutenção preventiva e garantia estendida
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
