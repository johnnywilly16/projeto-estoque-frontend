'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Plus, 
  TrendingUp,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  PiggyBank,
  Receipt,
  Users
} from 'lucide-react';
import { SaleForm } from './SaleForm';
import { SalesHistory } from './SalesHistory';
import { PaymentMethods } from './PaymentMethods';
import { useInventoryStore } from '@/store';
import { Sale } from '@/types';

export function SalesPage() {
  const [activeTab, setActiveTab] = useState('new-sale');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { 
    sales, 
    products,
    addSale 
  } = useInventoryStore();

  // Calcular métricas de vendas
  const todaysSales = sales.filter(sale => {
    const today = new Date().toDateString();
    const saleDate = new Date(sale.timestamp).toDateString();
    return today === saleDate;
  });

  const todaysRevenue = todaysSales.reduce((sum, sale) => 
    sum + (sale.qty * sale.unitPrice * (1 - (sale.discount || 0) / 100)), 0
  );

  const salesByPaymentMethod = sales.reduce((acc, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentSales = sales
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const handleNewSale = (saleData: Omit<Sale, 'id' | 'timestamp'>) => {
    const newSale: Sale = {
      ...saleData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    
    addSale(newSale);
    setIsFormOpen(false);
    setActiveTab('history');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
          <p className="text-gray-500">
            Registre vendas e gerencie pagamentos
          </p>
        </div>
        
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Venda
        </Button>
      </div>

      {/* Métricas do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Vendas Hoje</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {todaysSales.length}
            </p>
            <p className="text-xs text-gray-500">
              {todaysSales.reduce((sum, s) => sum + s.qty, 0)} itens
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Receita Hoje</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(todaysRevenue)}
            </p>
            <p className="text-xs text-gray-500">
              Líquido
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">Métodos Pagto</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(salesByPaymentMethod).map(([method, count]) => (
                <Badge key={method} variant="outline" className="text-xs">
                  {method}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-600">Ticket Médio</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(todaysRevenue / Math.max(todaysSales.length, 1))}
            </p>
            <p className="text-xs text-gray-500">
              Por venda
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métodos de Pagamento Populares */}
      <PaymentMethods salesData={sales} />

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-sale">Nova Venda</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="new-sale" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário de Venda */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Registrar Nova Venda</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SaleForm
                  products={products}
                  onSubmit={handleNewSale}
                  onCancel={() => setActiveTab('history')}
                />
              </CardContent>
            </Card>

            {/* Vendas Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Últimas Vendas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentSales.map((sale) => {
                    const product = products.find(p => p.id === sale.productId);
                    return (
                      <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">
                            {product?.title || 'Produto não encontrado'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {sale.qty}x • {sale.customerName || 'Cliente não informado'}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium text-sm">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(sale.qty * sale.unitPrice)}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {sale.paymentMethod}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  
                  {recentSales.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Receipt className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p>Nenhuma venda registrada ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <SalesHistory sales={sales} products={products} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>Analytics avançados em desenvolvimento</p>
                    <p className="text-sm">Gráficos de vendas por período, produtos mais vendidos, etc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Receipt className="h-4 w-4 mr-2" />
                    Relatório Diário
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Relatório Mensal
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Relatório por Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para Nova Venda */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Nova Venda</h2>
            <SaleForm
              products={products}
              onSubmit={handleNewSale}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

