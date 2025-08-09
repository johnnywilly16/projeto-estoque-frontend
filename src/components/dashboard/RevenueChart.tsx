'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartDataPoint {
  date: string;
  revenue: number;
  sales: number;
  profit: number;
  label: string;
}

interface RevenueChartProps {
  data: ChartDataPoint[];
  period: 'week' | 'month' | 'year';
  onPeriodChange: (period: 'week' | 'month' | 'year') => void;
}

export function RevenueChart({ data, period, onPeriodChange }: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipValue = (value: number, name: string) => {
    const labels: Record<string, string> = {
      revenue: 'Receita',
      profit: 'Lucro',
      sales: 'Vendas'
    };
    
    if (name === 'sales') {
      return [`${value} vendas`, labels[name]];
    }
    
    return [formatCurrency(value), labels[name]];
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ color: string; name: string; value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const periodLabels = {
    week: '7 dias',
    month: '30 dias',
    year: '12 meses'
  };

  return (
    <Card className="col-span-2 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Análise de Revenue</span>
            </CardTitle>
            <p className="text-sm text-gray-500">
              Acompanhe receita, lucro e vendas nos últimos {periodLabels[period]}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              Margem: {profitMargin.toFixed(1)}%
            </Badge>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Controles de Período */}
          <Tabs value={period} onValueChange={(value) => onPeriodChange(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
              <TabsTrigger value="year">Ano</TabsTrigger>
            </TabsList>

            <TabsContent value={period} className="space-y-4">
              {/* Métricas Resumidas */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Receita Total</p>
                  <p className="text-lg font-bold text-blue-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Lucro Total</p>
                  <p className="text-lg font-bold text-green-900">{formatCurrency(totalProfit)}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Margem de Lucro</p>
                  <p className="text-lg font-bold text-purple-900">{profitMargin.toFixed(1)}%</p>
                </div>
              </div>

              {/* Gráfico */}
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="label" 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />
                    <YAxis 
                      tickFormatter={formatCurrency}
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                      formatter={formatTooltipValue}
                    />
                    
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                      name="Receita"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#colorProfit)"
                      name="Lucro"
                    />
                    
                    {/* Linha de referência para break-even */}
                    <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
