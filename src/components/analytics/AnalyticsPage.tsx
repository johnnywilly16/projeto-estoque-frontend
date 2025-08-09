'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';

export function AnalyticsPage() {
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 847.500',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Produtos Vendidos',
      value: '1.247',
      change: '+8.3%',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Clientes Ativos',
      value: '892',
      change: '+15.2%',
      icon: PieChart,
      color: 'text-purple-600'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 679',
      change: '+4.1%',
      icon: LineChart,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <span>Analytics Avançado</span>
        </h1>
        <p className="text-gray-500">
          Análises detalhadas de performance e tendências
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gráficos Interativos</CardTitle>
          <CardDescription>
            Funcionalidade em desenvolvimento - visualizações avançadas coming soon
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Gráficos interativos serão implementados aqui</p>
        </CardContent>
      </Card>
    </div>
  );
}
