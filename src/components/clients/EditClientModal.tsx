'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Edit, 
  Save, 
  X, 
  History,
  AlertTriangle,
  Check
} from 'lucide-react';
import type { Client } from '@/types';

interface EditClientModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

interface EditFormData {
  name: string;
  phone: string;
  email: string;
  document: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tags: string[];
  notes: string;
}

// Mock do histórico de alterações
const mockChangeHistory = [
  {
    id: 'change-1',
    date: '2024-02-01T10:30:00Z',
    field: 'Telefone',
    oldValue: '(11) 98888-1111',
    newValue: '(11) 99999-1111',
    user: 'Admin'
  },
  {
    id: 'change-2', 
    date: '2024-01-15T14:20:00Z',
    field: 'Email',
    oldValue: '',
    newValue: 'joao.silva@email.com',
    user: 'Vendedor 1'
  },
  {
    id: 'change-3',
    date: '2024-01-10T09:15:00Z',
    field: 'Endereço',
    oldValue: 'Rua Antiga, 123',
    newValue: 'Rua das Flores, 123',
    user: 'Admin'
  }
];

export function EditClientModal({ client, isOpen, onClose }: EditClientModalProps) {
  const [formData, setFormData] = useState<EditFormData>({
    name: client.name,
    phone: client.phone,
    email: client.email || '',
    document: client.document || '',
    address: client.address || {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    tags: [...client.tags],
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Lista de tags disponíveis
  const availableTags = [
    'VIP', 'Fidelizado', 'Frequente', 'Novo', 'Empresarial', 'Atacado', 
    'Revenda', 'Influencer', 'Parceiro', 'Estudante', 'Desconto'
  ];

  const handleInputChange = (field: keyof EditFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAddressChange = (field: keyof EditFormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
    setHasChanges(true);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simular salvamento e rastreamento de alterações
    setTimeout(() => {
      console.log('Alterações salvas:', formData);
      
      // Aqui seria onde as alterações seriam registradas no histórico
      const changes = [];
      if (formData.name !== client.name) {
        changes.push({ field: 'Nome', oldValue: client.name, newValue: formData.name });
      }
      if (formData.phone !== client.phone) {
        changes.push({ field: 'Telefone', oldValue: client.phone, newValue: formData.phone });
      }
      if (formData.email !== (client.email || '')) {
        changes.push({ field: 'Email', oldValue: client.email || '', newValue: formData.email });
      }
      
      console.log('Mudanças detectadas:', changes);
      
      setIsLoading(false);
      setHasChanges(false);
      onClose();
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: client.name,
      phone: client.phone,
      email: client.email || '',
      document: client.document || '',
      address: client.address || {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      tags: [...client.tags],
      notes: ''
    });
    setHasChanges(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit className="h-5 w-5 text-blue-600" />
              <span>Editar Cliente: {client.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Alterações não salvas
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-4 w-4 mr-2" />
                Histórico
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Edite as informações do cliente. Todas as alterações são rastreadas.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="document">CPF/CNPJ</Label>
                    <Input
                      id="document"
                      value={formData.document}
                      onChange={(e) => handleInputChange('document', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endereço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="street">Rua/Avenida</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      value={formData.address.number}
                      onChange={(e) => handleAddressChange('number', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={formData.address.neighborhood}
                      onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="state">Estado</Label>
                  <select
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione...</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    {/* Adicionar outros estados */}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Tags e Observações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags e Observações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tags do Cliente</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.tags.includes(tag) 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Observações da Alteração</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Descreva o motivo das alterações..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Alterações */}
          <div className="lg:col-span-1">
            <Card className={showHistory ? '' : 'opacity-50'}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Histórico de Alterações</span>
                </CardTitle>
                <CardDescription>
                  Registro de todas as modificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {showHistory ? (
                  mockChangeHistory.map(change => (
                    <div key={change.id} className="p-3 border rounded-lg bg-gray-50">
                      <div className="text-sm font-medium text-gray-900">
                        {change.field}
                      </div>
                      <div className="text-xs text-red-600 line-through">
                        {change.oldValue || '(vazio)'}
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        {change.newValue}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(change.date)} - {change.user}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Clique no botão &quot;Histórico&quot; para ver as alterações</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <Button variant="outline" onClick={handleReset}>
                <X className="h-4 w-4 mr-2" />
                Descartar Alterações
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
