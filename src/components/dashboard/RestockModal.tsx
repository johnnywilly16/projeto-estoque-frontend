'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart
} from 'lucide-react';
import { Product } from '@/types';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  suggestedQuantity: number;
  onConfirmRestock: (productId: string, quantity: number) => void;
}

export function RestockModal({ isOpen, onClose, product, suggestedQuantity, onConfirmRestock }: RestockModalProps) {
  const [quantity, setQuantity] = useState(suggestedQuantity);

  useEffect(() => {
    if (isOpen) {
      setQuantity(suggestedQuantity);
    }
  }, [isOpen, suggestedQuantity]);

  if (!product) return null;

  const getSeverityColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800 border-red-200';
    if (stock <= 5) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const handleConfirm = () => {
    if (quantity <= 0) return;
    onConfirmRestock(product.id, quantity);
    onClose();
  };

  const totalCost = quantity * product.costPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span>Repor Estoque</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações do Produto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{product.title}</span>
                <Badge className={getSeverityColor(product.stock)}>
                  {product.stock === 0 ? 'SEM ESTOQUE' : `${product.stock} unidades`}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <p className="font-medium">{product.sku}</p>
                </div>
                <div>
                  <span className="text-gray-600">Preço de Custo:</span>
                  <p className="font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.costPrice)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantidade */}
          <div className="space-y-3">
            <Label htmlFor="quantity">Quantidade a Repor</Label>
            
            {/* Botões Rápidos */}
            <div className="flex space-x-2">
              <Button
                variant={quantity === 10 ? "default" : "outline"}
                size="sm"
                onClick={() => setQuantity(10)}
              >
                10
              </Button>
              <Button
                variant={quantity === 20 ? "default" : "outline"}
                size="sm"
                onClick={() => setQuantity(20)}
              >
                20
              </Button>
              <Button
                variant={quantity === 50 ? "default" : "outline"}
                size="sm"
                onClick={() => setQuantity(50)}
              >
                50
              </Button>
              <Button
                variant={quantity === 100 ? "default" : "outline"}
                size="sm"
                onClick={() => setQuantity(100)}
              >
                100
              </Button>
            </div>
            
            {/* Input Manual */}
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="text-center"
              placeholder="Ou digite a quantidade"
            />
            
            <p className="text-xs text-gray-500">
              Estoque atual: {product.stock} unidades
            </p>
          </div>

          {/* Resumo */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total estimado:</span>
              <span className="text-lg font-semibold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCost)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {quantity} unidades × {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.costPrice)}
            </p>
          </div>

          {/* Alerta para produtos sem estoque */}
          {product.stock === 0 && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Produto sem estoque!</p>
                <p className="text-sm text-red-600">Reposição urgente recomendada.</p>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={quantity <= 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Repor {quantity} {quantity === 1 ? 'unidade' : 'unidades'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}