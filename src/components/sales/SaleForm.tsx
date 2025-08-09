'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  PiggyBank,
  Search,
  Plus,
  Minus,
  Percent,
  Calculator
} from 'lucide-react';
import { Product, Sale } from '@/types';

interface SaleFormProps {
  products: Product[];
  onSubmit: (sale: Omit<Sale, 'id' | 'timestamp'>) => void;
  onCancel: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export function SaleForm({ products, onSubmit, onCancel }: SaleFormProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cash' | 'debit' | 'credit'>('pix');
  const [paidAmount, setPaidAmount] = useState<string>('');
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtrar produtos para busca (somente com estoque)
  const filteredProducts = products.filter(product =>
    (product.title.toLowerCase().includes(productSearch.toLowerCase()) ||
     product.sku.toLowerCase().includes(productSearch.toLowerCase())) &&
    product.stock > 0
  );

  // Adicionar produto ao carrinho
  const addToCart = () => {
    if (!selectedProductId) return;
    
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === selectedProductId);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === selectedProductId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    setSelectedProductId('');
    setProductSearch('');
    setShowSuggestions(false);
  };

  // Remover produto do carrinho
  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Atualizar quantidade
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  // Calcular totais
  const subtotal = cart.reduce((sum, item) => 
    sum + (item.product.salePrice * item.quantity), 0
  );
  
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  // Ícones dos métodos de pagamento
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'pix':
        return <Smartphone className="h-4 w-4" />;
      case 'cash':
        return <Banknote className="h-4 w-4" />;
      case 'debit':
        return <CreditCard className="h-4 w-4" />;
      case 'credit':
        return <PiggyBank className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  // Labels dos métodos de pagamento
  const getPaymentLabel = (method: string) => {
    const labels = {
      pix: 'PIX',
      cash: 'Dinheiro',
      debit: 'Débito',
      credit: 'Crédito'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Adicione pelo menos um produto ao carrinho');
      return;
    }

    // Para simplificar, vamos registrar cada item como uma venda separada
    // Em um sistema real, você poderia ter uma estrutura de "ordem" com múltiplos itens
    cart.forEach(item => {
      const sale: Omit<Sale, 'id' | 'timestamp'> = {
        productId: item.product.id,
        qty: item.quantity,
        unitPrice: item.product.salePrice,
        customerName: customerName || 'Cliente não informado',
        paymentMethod,
        paymentStatus: 'completed',
        discount: discount,
        paidAmount: parseFloat(paidAmount) || total,
        notes
      };
      
      onSubmit(sale);
    });

    // Reset form
    setCart([]);
    setCustomerName('');
    setDiscount(0);
    setPaidAmount('');
    setNotes('');
    setSelectedProductId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Busca e Adição de Produtos */}
      <div className="space-y-4">
        <Label>Produtos</Label>
        
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produto por nome ou SKU..."
              value={productSearch}
              onChange={(e) => { setProductSearch(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Enter adiciona o primeiro sugerido
                  const first = filteredProducts[0];
                  if (first) {
                    setSelectedProductId(first.id);
                    setTimeout(addToCart, 0);
                  }
                }
              }}
              className="pl-10"
            />
            {showSuggestions && productSearch && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredProducts.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">Nenhum produto em estoque</div>
                )}
                {filteredProducts.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setProductSearch(`${p.title}`);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-sm"
                  >
                    <span className="truncate max-w-[60%]">{p.title} <span className="text-gray-400">({p.sku})</span></span>
                    <span className="text-gray-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.salePrice)}
                      <span className="text-xs text-gray-400 ml-2">Estoque: {p.stock}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Select value={selectedProductId} onValueChange={setSelectedProductId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Selecionar produto" />
            </SelectTrigger>
            <SelectContent>
              {filteredProducts.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.title} - {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.salePrice)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            type="button" 
            onClick={addToCart}
            disabled={!selectedProductId}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carrinho */}
      {cart.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Carrinho</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.product.salePrice)} cada
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="w-20 text-right">
                    <p className="font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.product.salePrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações da Venda */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Nome do Cliente</Label>
          <Input
            id="customer"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nome do cliente (opcional)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discount">Desconto (%)</Label>
          <div className="relative">
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="pr-8"
            />
            <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Método de Pagamento */}
      <div className="space-y-3">
        <Label>Método de Pagamento</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['pix', 'cash', 'debit', 'credit'] as const).map(method => (
            <Button
              key={method}
              type="button"
              variant={paymentMethod === method ? 'default' : 'outline'}
              onClick={() => setPaymentMethod(method)}
              className="flex items-center space-x-2 h-12"
            >
              {getPaymentIcon(method)}
              <span>{getPaymentLabel(method)}</span>
            </Button>
          ))}
        </div>

        {/* Valor pago */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paid">Valor Pago ({getPaymentLabel(paymentMethod)})</Label>
            <Input
              id="paid"
              type="number"
              min="0"
              step="0.01"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
            />
          </div>
          <div className="space-y-2">
            <Label>Troco</Label>
            <div className="h-10 flex items-center px-3 rounded-md border bg-gray-50 text-gray-700">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.max((parseFloat(paidAmount) || 0) - total, 0))}
            </div>
          </div>
        </div>
      </div>

      {/* Observações */}
      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observações sobre a venda (opcional)"
          rows={3}
        />
      </div>

      {/* Resumo da Venda */}
      {cart.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto ({discount}%):</span>
                  <span>-{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(discountAmount)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botões */}
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          disabled={cart.length === 0}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Finalizar Venda
        </Button>
      </div>
    </form>
  );
}

