'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Package,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Product } from '@/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { label: 'Esgotado', variant: 'destructive' as const, icon: AlertTriangle };
    }
    if (stock <= 5) {
      return { label: 'Crítico', variant: 'destructive' as const, icon: AlertTriangle };
    }
    if (stock <= 10) {
      return { label: 'Baixo', variant: 'secondary' as const, icon: AlertTriangle };
    }
    return { label: 'Normal', variant: 'outline' as const, icon: Package };
  };

  const calculateMargin = (costPrice: number, salePrice: number) => {
    if (costPrice === 0) return 0;
    return ((salePrice - costPrice) / salePrice) * 100;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-gray-500">
          Tente ajustar os filtros ou adicionar novos produtos.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço Custo</TableHead>
            <TableHead className="text-right">Preço Venda</TableHead>
            <TableHead className="text-right">Margem</TableHead>
            <TableHead className="text-center">Estoque</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const margin = calculateMargin(product.costPrice, product.salePrice);
            const StatusIcon = stockStatus.icon;

            return (
              <TableRow key={product.id} className="hover:bg-gray-50">
                {/* Imagem do Produto */}
                <TableCell>
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage 
                      src={product.images[0] || '/placeholder-product.jpg'} 
                      alt={product.title}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">
                      <Package className="h-5 w-5 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Nome do Produto */}
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 truncate max-w-xs">
                      {product.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Object.entries(product.attributes).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </TableCell>

                {/* SKU */}
                <TableCell>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {product.sku}
                  </code>
                </TableCell>

                {/* Categoria */}
                <TableCell>
                  <Badge variant="outline">
                    {product.categoryId}
                  </Badge>
                </TableCell>

                {/* Preço de Custo */}
                <TableCell className="text-right font-mono">
                  {formatCurrency(product.costPrice)}
                </TableCell>

                {/* Preço de Venda */}
                <TableCell className="text-right font-mono font-medium">
                  {formatCurrency(product.salePrice)}
                </TableCell>

                {/* Margem */}
                <TableCell className="text-right">
                  <Badge 
                    variant={margin >= 20 ? 'default' : margin >= 10 ? 'secondary' : 'destructive'}
                  >
                    {margin.toFixed(1)}%
                  </Badge>
                </TableCell>

                {/* Estoque */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="font-medium">{product.stock}</span>
                    {product.stock <= 10 && (
                      <StatusIcon className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <Badge variant={stockStatus.variant}>
                    {stockStatus.label}
                  </Badge>
                </TableCell>

                {/* Ações */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log('Ver detalhes', product.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(product.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

