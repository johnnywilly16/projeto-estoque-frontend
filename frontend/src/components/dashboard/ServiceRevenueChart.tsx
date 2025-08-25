'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Wrench } from 'lucide-react';

interface Point {
  date: string;
  value: number;
  label: string;
}

interface ServiceRevenueChartProps {
  data: Point[];
}

export function ServiceRevenueChart({ data }: ServiceRevenueChartProps) {
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wrench className="h-5 w-5 text-orange-600" />
          Receita de Serviços (OS)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorService" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip formatter={(v: number) => [formatCurrency(Number(v)), 'Receita de Serviços']} />
              <Area type="monotone" dataKey="value" stroke="#F97316" strokeWidth={2} fill="url(#colorService)" name="Receita de Serviços" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


