'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInventoryStore } from '@/store';
import type { ServiceOrder } from '@/types';

interface NewServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewServiceOrderModal({ isOpen, onClose }: NewServiceOrderModalProps) {
  const { clients, addServiceOrder } = useInventoryStore();

  const [clientId, setClientId] = useState('');
  const [deviceType, setDeviceType] = useState('Celular');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceImei, setDeviceImei] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [serviceTypesRaw, setServiceTypesRaw] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [partsCost, setPartsCost] = useState<number>(0);
  const [laborCost, setLaborCost] = useState<number>(0);
  const paidBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const formatBRL = (n: number) => paidBRL.format(isFinite(n) ? n : 0);
  const parseBRL = (s: string) => (Number(s.replace(/\D/g, '')) || 0) / 100;
  const [partsInput, setPartsInput] = useState<string>(formatBRL(0));
  const [laborInput, setLaborInput] = useState<string>(formatBRL(0));
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setClientId('');
      setDeviceType('Celular');
      setDeviceModel('');
      setDeviceImei('');
      setProblemDescription('');
      setServiceTypesRaw('');
      setPriority('normal');
      setPartsCost(0);
      setLaborCost(0);
      setEstimatedDelivery('');
      setInternalNotes('');
    }
  }, [isOpen]);

  const handleSave = () => {
    const serviceTypes = serviceTypesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const now = new Date().toISOString();
    const totalCost = Number(partsCost) + Number(laborCost);

    const order: ServiceOrder = {
      id: `so-${Date.now()}`,
      clientId: clientId || 'sem-cliente',
      deviceType,
      deviceModel: deviceModel || 'Dispositivo',
      deviceImei: deviceImei || undefined,
      problemDescription: problemDescription || 'Sem descrição',
      initialDiagnosis: undefined,
      serviceTypes,
      status: 'approved',
      priority,
      partsCost: Number(partsCost) || 0,
      laborCost: Number(laborCost) || 0,
      totalCost,
      discount: 0,
      finalPrice: totalCost,
      technicianId: undefined,
      startDate: now,
      estimatedDelivery: estimatedDelivery || undefined,
      completedDate: undefined,
      deliveredDate: undefined,
      warrantyDays: 90,
      warrantyExpires: undefined,
      paymentMethod: undefined,
      paymentStatus: 'pending',
      paidAmount: 0,
      internalNotes: internalNotes || undefined,
      customerNotes: undefined,
      partsUsed: [],
      createdAt: now,
      updatedAt: now,
    };

    addServiceOrder(order);
    onClose();
  };

  const clientsOptions = clients.length > 0 ? clients : [];
  const finalPrice = (Number(partsCost) || 0) + (Number(laborCost) || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Ordem de Serviço</DialogTitle>
          <DialogDescription>Preencha os dados principais para registrar a OS.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Cliente</Label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Selecione (opcional)</option>
                    {clientsOptions.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as typeof priority)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="low">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Tipo do Dispositivo</Label>
                  <Input value={deviceType} onChange={(e) => setDeviceType(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Modelo</Label>
                  <Input value={deviceModel} onChange={(e) => setDeviceModel(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>IMEI/Serial (opcional)</Label>
                  <Input value={deviceImei} onChange={(e) => setDeviceImei(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Tipos de Serviço (separar por vírgula)</Label>
                  <Input
                    placeholder="Troca de Tela, Bateria"
                    value={serviceTypesRaw}
                    onChange={(e) => setServiceTypesRaw(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Descrição do Problema</Label>
                <Textarea rows={3} value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Custos de Peças (R$)</Label>
                  <Input
                    type="text"
                    value={partsInput}
                    onChange={(e) => {
                      const v = parseBRL(e.target.value);
                      setPartsCost(v);
                      setPartsInput(formatBRL(v));
                    }}
                  />
                </div>
                <div>
                  <Label>Mão de Obra (R$)</Label>
                  <Input
                    type="text"
                    value={laborInput}
                    onChange={(e) => {
                      const v = parseBRL(e.target.value);
                      setLaborCost(v);
                      setLaborInput(formatBRL(v));
                    }}
                  />
                </div>
                <div>
                  <Label>Entrega Estimada</Label>
                  <Input type="date" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Observações Internas</Label>
                <Textarea rows={2} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
              </div>

              <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                <span className="text-gray-600">Preço Final (estimado)</span>
                <span className="font-bold">{formatBRL(finalPrice)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleSave}>Salvar OS</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


