'use client';

import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useInventoryStore } from '../../store';
import type { ServiceOrder } from '../../types';

interface ServiceOrderDetailsModalProps {
  serviceOrder: ServiceOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusFlow: ServiceOrder['status'][] = [
  'approved',
  'in_progress',
  'waiting_parts',
  'testing',
  'completed',
  'delivered',
];

const statusToLabel: Record<ServiceOrder['status'], string> = {
  pending_approval: 'Pendente Aprovação',
  approved: 'Aprovada',
  in_progress: 'Em Andamento',
  waiting_parts: 'Aguardando Peças',
  testing: 'Em Testes',
  completed: 'Concluído',
  delivered: 'Entregue',
  cancelled: 'Cancelada',
};

export function ServiceOrderDetailsModal({ serviceOrder, isOpen, onClose }: ServiceOrderDetailsModalProps) {
  const { clients, updateServiceOrder, deleteServiceOrder } = useInventoryStore();
  const [local, setLocal] = useState<ServiceOrder | null>(serviceOrder);
  const [partsCostInput, setPartsCostInput] = useState<string>('R$ 0,00');
  const [laborCostInput, setLaborCostInput] = useState<string>('R$ 0,00');
  const [basicsSaved, setBasicsSaved] = useState(false);
  const [paymentSaved, setPaymentSaved] = useState(false);

  React.useEffect(() => {
    setLocal(serviceOrder);
    if (serviceOrder) {
      setPartsCostInput(formatBRL(serviceOrder.partsCost || 0));
      setLaborCostInput(formatBRL(serviceOrder.laborCost || 0));
    }
  }, [serviceOrder]);

  const clientName = useMemo(() => {
    if (!serviceOrder) return '';
    const c = clients.find((x) => x.id === serviceOrder.clientId);
    return c ? c.name : 'Cliente';
  }, [serviceOrder, clients]);

  if (!serviceOrder || !local) return null;

  const setStatus = (status: ServiceOrder['status']) => {
    updateServiceOrder(serviceOrder.id, { status, updatedAt: new Date().toISOString() });
    setLocal({ ...local, status });
  };

  const handleSaveBasics = () => {
    updateServiceOrder(serviceOrder.id, {
      deviceType: local.deviceType,
      deviceModel: local.deviceModel,
      deviceImei: local.deviceImei,
      problemDescription: local.problemDescription,
      priority: local.priority,
      partsCost: local.partsCost,
      laborCost: local.laborCost,
      totalCost: local.partsCost + local.laborCost,
      finalPrice: local.partsCost + local.laborCost,
      estimatedDelivery: local.estimatedDelivery,
      internalNotes: local.internalNotes,
      updatedAt: new Date().toISOString(),
    });
    setBasicsSaved(true);
    setTimeout(() => setBasicsSaved(false), 2000);
  };

  const handleDelete = () => {
    if (confirm('Deseja realmente excluir esta Ordem de Serviço?')) {
      deleteServiceOrder(serviceOrder.id);
      onClose();
    }
  };

  function formatBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      isFinite(value) ? value : 0
    );
  }
  function parseBRL(input: string): number {
    const digits = input.replace(/\D/g, '');
    return (Number(digits) || 0) / 100;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>OS #{serviceOrder.id} — {clientName}</span>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir OS
            </Button>
          </DialogTitle>
          <DialogDescription>Gerencie o andamento, informações e pagamento da ordem de serviço.</DialogDescription>
        </DialogHeader>

        {/* Andamento */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-center">
              {statusFlow.map((s, idx) => {
                const isActive = local.status === s;
                return (
                  <React.Fragment key={s}>
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatus(s)}
                    >
                      {isActive ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Circle className="h-4 w-4 mr-2" />}
                      {statusToLabel[s]}
                    </Button>
                    {idx < statusFlow.length - 1 && <span className="text-gray-300">›</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Informações básicas */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Tipo do Dispositivo</Label>
                <Input value={local.deviceType} onChange={(e) => setLocal({ ...local, deviceType: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Modelo</Label>
                <Input value={local.deviceModel} onChange={(e) => setLocal({ ...local, deviceModel: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>IMEI/Serial</Label>
                <Input value={local.deviceImei || ''} onChange={(e) => setLocal({ ...local, deviceImei: e.target.value })} />
              </div>
              <div>
                <Label>Prioridade</Label>
                <select
                  value={local.priority}
                  onChange={(e) => setLocal({ ...local, priority: e.target.value as ServiceOrder['priority'] })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="low">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <Label>Entrega Estimada</Label>
                <Input type="date" value={local.estimatedDelivery || ''} onChange={(e) => setLocal({ ...local, estimatedDelivery: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Descrição do Problema</Label>
              <Textarea rows={3} value={local.problemDescription} onChange={(e) => setLocal({ ...local, problemDescription: e.target.value })} />
            </div>

            {/* Custos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Peças (R$)</Label>
                <Input
                  type="text"
                  value={partsCostInput}
                  onChange={(e) => {
                    const num = parseBRL(e.target.value);
                    setLocal({ ...local, partsCost: num });
                    setPartsCostInput(formatBRL(num));
                  }}
                />
              </div>
              <div>
                <Label>Mão de Obra (R$)</Label>
                <Input
                  type="text"
                  value={laborCostInput}
                  onChange={(e) => {
                    const num = parseBRL(e.target.value);
                    setLocal({ ...local, laborCost: num });
                    setLaborCostInput(formatBRL(num));
                  }}
                />
              </div>
              <div className="flex items-end">
                <div className="w-full bg-gray-50 p-2 rounded border text-right">
                  <div className="text-xs text-gray-600">Preço Final</div>
                  <div className="font-bold">{formatBRL((local.partsCost || 0) + (local.laborCost || 0))}</div>
                </div>
              </div>
            </div>

            <div>
              <Label>Observações Internas</Label>
              <Textarea rows={2} value={local.internalNotes || ''} onChange={(e) => setLocal({ ...local, internalNotes: e.target.value })} />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Fechar</Button>
              <Button
                onClick={handleSaveBasics}
                className={basicsSaved ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {basicsSaved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Salvo
                  </>
                ) : (
                  <>Salvar Alterações</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pagamento */}
        <Card>
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label>Valor Pago (R$)</Label>
              <Input
                type="text"
                value={formatBRL(local.paidAmount || 0)}
                onChange={(e) => {
                  const num = parseBRL(e.target.value);
                  setLocal({ ...local, paidAmount: num });
                }}
              />
            </div>
            <div>
              <Label>Status de Pagamento</Label>
              <select
                value={local.paymentStatus}
                onChange={(e) => setLocal({ ...local, paymentStatus: e.target.value as ServiceOrder['paymentStatus'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="pending">Pendente</option>
                <option value="partial">Parcial</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
              <div className="text-right">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-lg font-bold">{formatBRL(local.finalPrice || (local.partsCost + local.laborCost))}</div>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button
                onClick={() => {
                  updateServiceOrder(serviceOrder.id, {
                    paidAmount: local.paidAmount || 0,
                    paymentStatus: local.paymentStatus,
                    updatedAt: new Date().toISOString(),
                  });
                  setPaymentSaved(true);
                  setTimeout(() => setPaymentSaved(false), 2000);
                }}
                className={paymentSaved ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {paymentSaved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Pagamento Salvo
                  </>
                ) : (
                  <>Salvar Pagamento</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}


