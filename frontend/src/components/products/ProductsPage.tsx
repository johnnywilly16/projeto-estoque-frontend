'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Package,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ProductTable } from './ProductTable';
import { ProductModal } from './ProductModal';
import { useInventoryStore } from '../../store';
import { Product } from '../../types';

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const { 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  } = useInventoryStore();

  // Filtrar e ordenar produtos
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return a.salePrice - b.salePrice;
        case 'stock':
          return a.stock - b.stock;
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      const newProduct: Product = {
        ...productData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addProduct(newProduct);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(productId);
    }
  };

  const lowStockCount = products.filter(p => p.stock <= 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-500">
            Gerencie seu inventário de produtos
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {lowStockCount > 0 && (
            <Badge variant="destructive">
              {outOfStockCount > 0 ? `${outOfStockCount} esgotado(s)` : `${lowStockCount} estoque baixo`}
            </Badge>
          )}
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <Button onClick={handleCreateProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total de Produtos</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Em Estoque</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {products.filter(p => p.stock > 10).length}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Estoque Baixo</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{lowStockCount}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-red-600" />
            <span className="text-sm text-gray-600">Esgotados</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Nome</SelectItem>
              <SelectItem value="price">Preço</SelectItem>
              <SelectItem value="stock">Estoque</SelectItem>
              <SelectItem value="created">Data de criação</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Mostrando {filteredProducts.length} de {products.length} produtos
          </span>
          
          {(searchQuery || selectedCategory !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-lg border">
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* Modal de Produto */}
      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={editingProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

