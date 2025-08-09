'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';

export function MaintenancePage() {
  const services = [
    {
      id: 1,
      client: 'João Silva',
      device: 'iPhone 15 Pro',
      service: 'Troca de Tela',
      status: 'Em Andamento',
      priority: 'Alta',
      estimate: '2h',
      cost: 450
    },
    {
      id: 2,
      client: 'Maria Santos',
      device: 'Samsung S24',
      service: 'Troca de Bateria',
      status: 'Aguardando Peças',
      priority: 'Média',
      estimate: '1h',
      cost: 180
    },
    {
      id: 3,
      client: 'Pedro Costa',
      device: 'iPhone 14',
      service: 'Reparo de Placa',
      status: 'Orçamento',
      priority: 'Alta',
      estimate: '4h',
      cost: 680
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Aguardando Peças': return 'bg-yellow-100 text-yellow-800';
      case 'Orçamento': return 'bg-purple-100 text-purple-800';
      case 'Concluído': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Wrench className="h-8 w-8 text-orange-600" />
            <span>Assistência Técnica</span>
          </h1>
          <p className="text-gray-500">
            Gestão completa de manutenções e reparos
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Ordem de Serviço
        </Button>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
            <Wrench className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +3 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-muted-foreground">
              -15min vs semana passada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">
              Excelente performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Serviços */}
      <Card>
        <CardHeader>
          <CardTitle>Ordens de Serviço Ativas</CardTitle>
          <CardDescription>
            Acompanhe o status de todos os reparos em andamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{service.client}</h4>
                    <Badge className={getPriorityColor(service.priority)}>
                      {service.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {service.device} • {service.service}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Estimativa: {service.estimate}</span>
                    <span>Valor: R$ {service.cost}</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
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
