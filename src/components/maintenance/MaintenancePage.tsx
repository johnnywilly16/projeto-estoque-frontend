'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { useInventoryStore } from '@/store';
import { NewServiceOrderModal } from './NewServiceOrderModal';
import { ServiceOrderDetailsModal } from './ServiceOrderDetailsModal';

export function MaintenancePage() {
  const { serviceOrders, clients } = useInventoryStore();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedSOId, setSelectedSOId] = useState<string | null>(null);

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
        <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setIsNewModalOpen(true)}>
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
            <div className="text-2xl font-bold">{serviceOrders.length}</div>
            <p className="text-xs text-muted-foreground">Total de OS registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceOrders.filter(s => ['completed','delivered'].includes(s.status)).length}</div>
            <p className="text-xs text-muted-foreground">Finalizadas e entregues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita em Serviços</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                serviceOrders
                  .filter(s => ['completed','delivered'].includes(s.status))
                  .reduce((sum, so) => sum + (so.finalPrice ?? so.totalCost ?? 0), 0)
              )
            }</div>
            <p className="text-xs text-muted-foreground">Somatório de OS concluídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceOrders.filter(s => s.status === 'in_progress' || s.status === 'waiting_parts' || s.status === 'testing').length}</div>
            <p className="text-xs text-muted-foreground">Etapas em execução</p>
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
            {serviceOrders.map(so => {
              const client = clients.find(c => c.id === so.clientId);
              const clientName = client ? client.name : 'Cliente';
              const device = `${so.deviceType} ${so.deviceModel}`.trim();
              const serviceSummary = so.serviceTypes.join(', ') || 'Serviço';
              const estimate = so.estimatedDelivery ? new Date(so.estimatedDelivery).toLocaleDateString('pt-BR') : '-';
              const value = so.finalPrice ?? so.totalCost;
              const priorityLabel =
                so.priority === 'urgent' ? 'Urgente' :
                so.priority === 'high' ? 'Alta' :
                so.priority === 'low' ? 'Baixa' : 'Normal';
              const statusLabel = (() => {
                const map: Record<string, string> = {
                  pending_approval: 'Pendente Aprovação',
                  approved: 'Aprovada',
                  in_progress: 'Em Andamento',
                  waiting_parts: 'Aguardando Peças',
                  testing: 'Em Testes',
                  completed: 'Concluída',
                  delivered: 'Entregue',
                  cancelled: 'Cancelada'
                };
                return map[so.status] || so.status;
              })();

              return (
                <div key={so.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{clientName}</h4>
                      <Badge className={getPriorityColor(priorityLabel)}>
                        {priorityLabel}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {device} • {serviceSummary}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Entrega: {estimate}</span>
                      <span>Valor: R$ {value}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(statusLabel)}>
                      {statusLabel}
                    </Badge>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedSOId(so.id)}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {serviceOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">Nenhuma OS cadastrada ainda.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <NewServiceOrderModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
      <ServiceOrderDetailsModal
        serviceOrder={serviceOrders.find(s => s.id === selectedSOId) || null}
        isOpen={Boolean(selectedSOId)}
        onClose={() => setSelectedSOId(null)}
      />
    </div>
  );
}
