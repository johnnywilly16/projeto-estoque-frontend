'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  TrendingUp, 
  Package, 
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types';

interface TopProductItem {
  product: Product;
  totalSold: number;
  revenue: number;
  growth?: number;
}

interface TopProductsProps {
  products: TopProductItem[];
  period: string;
  onViewProduct?: (productId: string) => void;
}

export function TopProducts({ products, period, onViewProduct }: TopProductsProps) {
  const maxRevenue = Math.max(...products.map(p => p.revenue));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-4 w-4 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-4 w-4 text-gray-400" />;
    if (index === 2) return <Trophy className="h-4 w-4 text-amber-600" />;
    return <span className="h-4 w-4 text-center text-xs font-bold text-gray-500">{index + 1}</span>;
  };

  const getRankBadgeColor = (index: number) => {
    if (index === 0) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (index === 1) return 'bg-gray-50 text-gray-700 border-gray-200';
    if (index === 2) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Top Produtos</span>
            </CardTitle>
            <p className="text-sm text-gray-500">
              Mais vendidos nos últimos {period}
            </p>
          </div>
          
          <Badge variant="outline" className="text-green-600 border-green-200">
            {products.length} produtos
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {products.map((item, index) => {
            const progressPercentage = (item.revenue / maxRevenue) * 100;
            
            return (
              <div 
                key={item.product.id} 
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Posição */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${getRankBadgeColor(index)}`}>
                  {getRankIcon(index)}
                </div>

                {/* Imagem do Produto */}
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage 
                    src={item.product.images[0] || '/placeholder-product.jpg'} 
                    alt={item.product.title}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    <Package className="h-6 w-6 text-gray-400" />
                  </AvatarFallback>
                </Avatar>

                {/* Informações do Produto */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </h3>
                    {item.growth !== undefined && (
                      <Badge 
                        variant="outline" 
                        className={item.growth >= 0 ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                      >
                        {item.growth >= 0 ? '+' : ''}{item.growth}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>SKU: {item.product.sku}</span>
                    <span>•</span>
                    <span>{item.totalSold} vendas</span>
                    <span>•</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="space-y-1">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Estoque: {item.product.stock}</span>
                      <span>{progressPercentage.toFixed(1)}% do top</span>
                    </div>
                  </div>
                </div>

                {/* Menu de Ações */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => onViewProduct?.(item.product.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      Gerenciar Estoque
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Ver Analytics
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p>Nenhum produto vendido no período</p>
            </div>
          )}
        </div>

        {/* Botão para Ver Todos */}
        {products.length > 0 && (
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Ver Relatório Completo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

