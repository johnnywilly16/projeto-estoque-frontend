'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { Product, Category } from '@/types';
import { useInventoryStore } from '@/store';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  categories: Category[];
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

interface FormData {
  sku: string;
  title: string;
  categoryId: string;
  costPrice: string;
  salePrice: string;
  stock: string;
  images: string[];
  attributes: Record<string, string>;
}

export function ProductModal({ open, onOpenChange, product, categories, onSave }: ProductModalProps) {
  const { addCategory } = useInventoryStore();
  const [formData, setFormData] = useState<FormData>({
    sku: '',
    title: '',
    categoryId: '',
    costPrice: '',
    salePrice: '',
    stock: '',
    images: [],
    attributes: {}
  });
  
  const [newAttribute, setNewAttribute] = useState({ key: '', value: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState('');

  // Resetar formulário quando o modal abrir/fechar ou produto mudar
  useEffect(() => {
    if (open) {
      if (product) {
        setFormData({
          sku: product.sku,
          title: product.title,
          categoryId: product.categoryId,
          costPrice: product.costPrice.toString(),
          salePrice: product.salePrice.toString(),
          stock: product.stock.toString(),
          images: product.images,
          attributes: { ...product.attributes }
        });
      } else {
        setFormData({
          sku: '',
          title: '',
          categoryId: '',
          costPrice: '',
          salePrice: '',
          stock: '',
          images: [],
          attributes: {}
        });
      }
      setErrors({});
    }
  }, [open, product]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addAttribute = () => {
    if (newAttribute.key && newAttribute.value) {
      setFormData(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [newAttribute.key]: newAttribute.value
        }
      }));
      setNewAttribute({ key: '', value: '' });
    }
  };

  const removeAttribute = (key: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: Object.fromEntries(
        Object.entries(prev.attributes).filter(([k]) => k !== key)
      )
    }));
  };

  const handleCreateCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      parentId: null,
      createdAt: new Date().toISOString(),
    };
    addCategory(newCategory);
    setFormData(prev => ({ ...prev, categoryId: newCategory.id }));
    setNewCategoryName('');
  };

  const validateForm = (): boolean => {
    // Nenhum campo obrigatório. Garantir valores padrão seguros.
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const cost = parseFloat(formData.costPrice);
    const sale = parseFloat(formData.salePrice);
    const stk = parseInt(formData.stock);

    const productData = {
      sku: formData.sku.trim() || `SKU-${Date.now().toString().slice(-6)}`,
      title: formData.title.trim() || 'Produto sem título',
      categoryId: formData.categoryId || '',
      costPrice: isNaN(cost) || cost < 0 ? 0 : cost,
      salePrice: isNaN(sale) || sale < 0 ? 0 : sale,
      stock: isNaN(stk) || stk < 0 ? 0 : stk,
      images: formData.images,
      attributes: formData.attributes
    };

    onSave(productData);
  };

  const calculateMargin = () => {
    const cost = parseFloat(formData.costPrice) || 0;
    const sale = parseFloat(formData.salePrice) || 0;
    if (sale === 0) return 0;
    return ((sale - cost) / sale) * 100;
  };

  const margin = calculateMargin();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Ex: IP15-128-BLK"
                className={errors.sku ? 'border-red-500' : ''}
              />
              {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(value) => handleInputChange('categoryId', value)}
                  >
                    <SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Nova categoria"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={handleCreateCategory}>
                  Adicionar
                </Button>
              </div>
              {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Nome do Produto</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: iPhone 15 128GB Preto"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Preços e Estoque */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Preço de Custo</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.costPrice}
                onChange={(e) => handleInputChange('costPrice', e.target.value)}
                placeholder="0.00"
                className={errors.costPrice ? 'border-red-500' : ''}
              />
              {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Preço de Venda</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.salePrice}
                onChange={(e) => handleInputChange('salePrice', e.target.value)}
                placeholder="0.00"
                className={errors.salePrice ? 'border-red-500' : ''}
              />
              {errors.salePrice && <p className="text-sm text-red-500">{errors.salePrice}</p>}
              {margin > 0 && (
                <p className="text-xs text-gray-500">
                  Margem: <span className={margin >= 20 ? 'text-green-600' : margin >= 10 ? 'text-yellow-600' : 'text-red-600'}>
                    {margin.toFixed(1)}%
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Estoque</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                placeholder="0"
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
            </div>
          </div>

          {/* Atributos */}
          <div className="space-y-4">
            <Label>Atributos do Produto</Label>
            
            {/* Atributos Existentes */}
            {Object.keys(formData.attributes).length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.attributes).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      <span className="text-xs">{key}: {value}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeAttribute(key)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Adicionar Novo Atributo */}
            <div className="flex gap-2">
              <Input
                placeholder="Nome do atributo"
                value={newAttribute.key}
                onChange={(e) => setNewAttribute(prev => ({ ...prev, key: e.target.value }))}
                className="flex-1"
              />
              <Input
                placeholder="Valor"
                value={newAttribute.value}
                onChange={(e) => setNewAttribute(prev => ({ ...prev, value: e.target.value }))}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={addAttribute}
                disabled={!newAttribute.key || !newAttribute.value}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Imagens */}
          <div className="space-y-2">
            <Label>Imagens</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-500">
                Funcionalidade de upload de imagens em desenvolvimento
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Atualizar' : 'Criar'} Produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

