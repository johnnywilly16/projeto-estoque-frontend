'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  PiggyBank,
  Receipt,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Product, Sale } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface SalesHistoryProps {
  sales: Sale[];
  products: Product[];
}

export function SalesHistory({ sales, products }: SalesHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Filtrar vendas
  const filteredSales = sales.filter(sale => {
    const product = products.find(p => p.id === sale.productId);
    const productName = product?.title || '';
    const customerName = sale.customerName || '';
    
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPayment = paymentFilter === 'all' || sale.paymentMethod === paymentFilter;
    const matchesStatus = statusFilter === 'all' || sale.paymentStatus === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const saleDate = new Date(sale.timestamp);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          matchesDate = saleDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = saleDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = saleDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesPayment && matchesStatus && matchesDate;
  });

  // Ordenar por data mais recente
  const sortedSales = filteredSales.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'pix':
        return <Smartphone className="h-4 w-4 text-blue-600" />;
      case 'cash':
        return <Banknote className="h-4 w-4 text-green-600" />;
      case 'debit':
        return <CreditCard className="h-4 w-4 text-purple-600" />;
      case 'credit':
        return <PiggyBank className="h-4 w-4 text-orange-600" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentLabel = (method: string) => {
    const labels = {
      pix: 'PIX',
      cash: 'Dinheiro',
      debit: 'Débito',
      credit: 'Crédito'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: 'Concluído',
      pending: 'Pendente',
      failed: 'Falhou'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateTotal = (sale: Sale) => {
    const subtotal = sale.qty * sale.unitPrice;
    const discount = (subtotal * (sale.discount || 0)) / 100;
    return subtotal - discount;
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar vendas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Método de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os métodos</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cash">Dinheiro</SelectItem>
                <SelectItem value="debit">Débito</SelectItem>
                <SelectItem value="credit">Crédito</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Mostrando {sortedSales.length} de {sales.length} vendas
            </p>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Vendas */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Desconto</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Pagamento</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {sortedSales.map((sale) => {
                  const product = products.find(p => p.id === sale.productId);
                  const total = calculateTotal(sale);
                  
                  return (
                    <TableRow key={sale.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">
                            {new Date(sale.timestamp).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(sale.timestamp).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {product?.title || 'Produto não encontrado'}
                          </div>
                          {product && (
                            <div className="text-xs text-gray-500">
                              SKU: {product.sku}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="font-medium">
                          {sale.customerName || 'Cliente não informado'}
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center font-medium">
                        {sale.qty}
                      </TableCell>
                      
                      <TableCell className="text-right font-mono">
                        {formatCurrency(sale.unitPrice)}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        {sale.discount ? (
                          <span className="text-green-600 font-medium">
                            {sale.discount}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-right font-mono font-bold">
                        {formatCurrency(total)}
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getPaymentIcon(sale.paymentMethod)}
                          <span className="text-sm">
                            {getPaymentLabel(sale.paymentMethod)}
                          </span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(sale.paymentStatus)}>
                          {getStatusLabel(sale.paymentStatus)}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedSale(sale)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {sortedSales.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma venda encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou registrar uma nova venda.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal detalhes da venda */}
      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Data:</span>
                  <div className="font-medium">{new Date(selectedSale.timestamp).toLocaleString('pt-BR')}</div>
                </div>
                <div>
                  <span className="text-gray-600">Cliente:</span>
                  <div className="font-medium">{selectedSale.customerName || 'Cliente não informado'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Produto:</span>
                  <div className="font-medium">{products.find(p => p.id === selectedSale.productId)?.title || 'Produto não encontrado'}</div>
                </div>
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <div className="font-medium">{products.find(p => p.id === selectedSale.productId)?.sku || '-'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Quantidade:</span>
                  <div className="font-medium">{selectedSale.qty}</div>
                </div>
                <div>
                  <span className="text-gray-600">Valor Unitário:</span>
                  <div className="font-medium">{formatCurrency(selectedSale.unitPrice)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Desconto:</span>
                  <div className="font-medium">{selectedSale.discount ? `${selectedSale.discount}%` : '-'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <div className="font-medium">{formatCurrency(calculateTotal(selectedSale))}</div>
                </div>
                <div>
                  <span className="text-gray-600">Pagamento:</span>
                  <div className="font-medium">{getPaymentLabel(selectedSale.paymentMethod)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Valor Pago:</span>
                  <div className="font-medium">{formatCurrency(selectedSale.paidAmount || calculateTotal(selectedSale))}</div>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <div className="font-medium">{getStatusLabel(selectedSale.paymentStatus)}</div>
                </div>
              </div>
              {selectedSale.notes && (
                <div className="text-sm">
                  <span className="text-gray-600">Observações:</span>
                  <p className="mt-1">{selectedSale.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

