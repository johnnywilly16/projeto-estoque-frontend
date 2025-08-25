'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Estoque Crítico',
      message: 'iPhone 15 Pro com apenas 2 unidades em estoque',
      time: '5 min atrás'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Meta Mensal',
      message: 'Faltam R$ 52.500 para atingir a meta de fevereiro',
      time: '1 hora atrás'
    },
    {
      id: 3,
      type: 'info',
      title: 'Novo Cliente VIP',
      message: 'João Silva foi promovido para categoria VIP',
      time: '2 horas atrás'
    },
    {
      id: 4,
      type: 'success',
      title: 'Meta Atingida',
      message: 'Meta de satisfação do cliente atingida: 96%',
      time: '1 dia atrás'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
          <span>Central de Alertas</span>
        </h1>
        <p className="text-gray-500">
          Notificações e alertas importantes do sistema
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <Card key={alert.id} className={`border-2 ${getAlertColor(alert.type)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription>{alert.time}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{alert.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
