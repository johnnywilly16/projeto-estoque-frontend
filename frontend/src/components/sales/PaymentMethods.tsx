'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  PiggyBank,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Sale } from '../../types';

interface PaymentMethodsProps {
  salesData: Sale[];
}

export function PaymentMethods({ salesData }: PaymentMethodsProps) {
  // Calcular estatísticas por método de pagamento
  const paymentStats = salesData.reduce((acc, sale) => {
    const method = sale.paymentMethod;
    const total = sale.qty * sale.unitPrice * (1 - (sale.discount || 0) / 100);
    
    if (!acc[method]) {
      acc[method] = {
        count: 0,
        revenue: 0,
        averageTicket: 0
      };
    }
    
    acc[method].count += 1;
    acc[method].revenue += total;
    acc[method].averageTicket = acc[method].revenue / acc[method].count;
    
    return acc;
  }, {} as Record<string, { count: number; revenue: number; averageTicket: number }>);

  const totalSales = salesData.length;
  const totalRevenue = Object.values(paymentStats).reduce((sum, stat) => sum + stat.revenue, 0);

  const paymentMethods = [
    {
      key: 'pix',
      name: 'PIX',
      icon: Smartphone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      description: 'Pagamento instantâneo'
    },
    {
      key: 'cash',
      name: 'Dinheiro',
      icon: Banknote,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      description: 'Pagamento em espécie'
    },
    {
      key: 'debit',
      name: 'Cartão Débito',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      description: 'Débito na conta'
    },
    {
      key: 'credit',
      name: 'Cartão Crédito',
      icon: PiggyBank,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      description: 'Parcelamento disponível'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resumo dos Métodos de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span>Métodos de Pagamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map(method => {
              const stats = paymentStats[method.key] || { count: 0, revenue: 0, averageTicket: 0 };
              const percentage = totalSales > 0 ? (stats.count / totalSales) * 100 : 0;
              const revenuePercentage = totalRevenue > 0 ? (stats.revenue / totalRevenue) * 100 : 0;
              const Icon = method.icon;

              return (
                <div key={method.key} className={`p-4 rounded-lg border ${method.bgColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${method.color}`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className={method.color}>
                        {stats.count} vendas
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participação nas vendas:</span>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-gray-500">Receita</p>
                        <p className={`font-medium ${method.color}`}>
                          {formatCurrency(stats.revenue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ticket Médio</p>
                        <p className={`font-medium ${method.color}`}>
                          {formatCurrency(stats.averageTicket)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tendências e Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Insights de Pagamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Método mais popular */}
            {Object.keys(paymentStats).length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Método Mais Popular</h3>
                {(() => {
                  const mostPopular = Object.entries(paymentStats)
                    .sort((a, b) => b[1].count - a[1].count)[0];
                  
                  if (mostPopular) {
                    const methodInfo = paymentMethods.find(m => m.key === mostPopular[0]);
                    const percentage = (mostPopular[1].count / totalSales) * 100;
                    
                    return (
                      <div className="flex items-center space-x-3">
                        {methodInfo && <methodInfo.icon className={`h-5 w-5 ${methodInfo.color}`} />}
                        <div>
                          <p className="font-medium text-blue-900">
                            {methodInfo?.name || mostPopular[0].toUpperCase()}
                          </p>
                          <p className="text-sm text-blue-700">
                            {mostPopular[1].count} vendas ({percentage.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}

            {/* Maior receita */}
            {Object.keys(paymentStats).length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Maior Receita</h3>
                {(() => {
                  const highestRevenue = Object.entries(paymentStats)
                    .sort((a, b) => b[1].revenue - a[1].revenue)[0];
                  
                  if (highestRevenue) {
                    const methodInfo = paymentMethods.find(m => m.key === highestRevenue[0]);
                    const percentage = (highestRevenue[1].revenue / totalRevenue) * 100;
                    
                    return (
                      <div className="flex items-center space-x-3">
                        {methodInfo && <methodInfo.icon className={`h-5 w-5 ${methodInfo.color}`} />}
                        <div>
                          <p className="font-medium text-green-900">
                            {methodInfo?.name || highestRevenue[0].toUpperCase()}
                          </p>
                          <p className="text-sm text-green-700">
                            {formatCurrency(highestRevenue[1].revenue)} ({percentage.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}

            {/* Recomendações */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-900 mb-2">Recomendações</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                {Object.keys(paymentStats).length === 0 ? (
                  <p>Registre algumas vendas para ver insights personalizados.</p>
                ) : (
                  <>
                    {(() => {
                      const pixStats = paymentStats.pix;
                      const cashStats = paymentStats.cash;
                      
                      if (pixStats && cashStats && pixStats.count < cashStats.count) {
                        return (
                          <p>💡 Promova mais o PIX - é mais rápido e seguro que dinheiro</p>
                        );
                      }
                      
                      if (!pixStats || pixStats.count === 0) {
                        return (
                          <p>💡 Configure pagamentos PIX para agilizar as vendas</p>
                        );
                      }
                      
                      return (
                        <p>✅ Boa diversificação nos métodos de pagamento!</p>
                      );
                    })()}
                    
                    <p>📊 Monitore regularmente as tendências de pagamento</p>
                  </>
                )}
              </div>
            </div>

            {/* Resumo Geral */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
                <p className="text-sm text-gray-500">Total de Vendas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(paymentStats).length}
                </p>
                <p className="text-sm text-gray-500">Métodos Usados</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

