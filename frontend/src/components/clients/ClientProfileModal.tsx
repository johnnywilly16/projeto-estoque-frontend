'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign,
  ShoppingBag,
  Wrench,
  MessageCircle,
  Edit,
  Star,
  TrendingUp,
  FileText,
  Target
} from 'lucide-react';
import type { Client } from '../../types';

interface ClientProfileModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onContactWhatsApp: () => void;
  onSendEmail: () => void;
}

// Mock data para demonstração
const mockPurchaseHistory = [
  {
    id: 'purchase-1',
    date: '2024-02-08',
    products: ['iPhone 15 Pro 256GB'],
    total: 5500,
    paymentMethod: 'PIX'
  },
  {
    id: 'purchase-2',
    date: '2024-01-15',
    products: ['Capa iPhone 15', 'Película de Vidro'],
    total: 89,
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: 'purchase-3',
    date: '2023-12-20',
    products: ['iPhone 14 128GB'],
    total: 3300,
    paymentMethod: 'PIX'
  }
];

const mockMaintenanceHistory = [
  {
    id: 'maintenance-1',
    date: '2024-01-20',
    device: 'iPhone 13',
    service: 'Troca de Bateria',
    status: 'Concluído',
    cost: 250,
    warranty: '90 dias'
  },
  {
    id: 'maintenance-2',
    date: '2023-11-15',
    device: 'iPhone 12',
    service: 'Troca de Tela',
    status: 'Concluído',
    cost: 480,
    warranty: '90 dias'
  }
];

export function ClientProfileModal({ 
  client, 
  isOpen, 
  onClose, 
  onEdit, 
  onContactWhatsApp, 
  onSendEmail 
}: ClientProfileModalProps) {
  const [activeTab, setActiveTab] = useState('general');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getClientTier = () => {
    if (client.totalPurchases > 5000) return { tier: 'VIP', color: 'bg-yellow-100 text-yellow-800' };
    if (client.totalPurchases > 2000) return { tier: 'Premium', color: 'bg-purple-100 text-purple-800' };
    if (client.totalPurchases > 500) return { tier: 'Regular', color: 'bg-blue-100 text-blue-800' };
    return { tier: 'Novo', color: 'bg-gray-100 text-gray-800' };
  };

  const getDaysSinceLastPurchase = () => {
    if (!client.lastPurchase) return null;
    return Math.floor((Date.now() - new Date(client.lastPurchase).getTime()) / (1000 * 60 * 60 * 24));
  };

  // Removidos recursos de IA
  const tierInfo = getClientTier();
  const daysSince = getDaysSinceLastPurchase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{client.name}</h2>
                <div className="flex items-center space-x-2">
                  <Badge className={tierInfo.color}>
                    {tierInfo.tier}
                  </Badge>
                  {client.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Perfil completo do cliente com histórico
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">
              <User className="h-4 w-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="history">
              <FileText className="h-4 w-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Target className="h-4 w-4 mr-2" />
              Ações
            </TabsTrigger>
          </TabsList>

          {/* Informações Gerais */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Informações Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{client.phone}</span>
                  </div>
                  {client.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{client.email}</span>
                    </div>
                  )}
                  {client.document && (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>{client.document}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div className="text-sm">
                        <p>{client.address.street}, {client.address.number}</p>
                        <p>{client.address.neighborhood}</p>
                        <p>{client.address.city}, {client.address.state}</p>
                        <p>{client.address.zipCode}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Cliente desde {formatDate(client.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Resumo Financeiro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Resumo Financeiro</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Gasto:</span>
                      <span className="font-semibold">
                        R$ {client.totalPurchases.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ticket Médio:</span>
                      <span className="font-medium">
                        R$ {(client.totalPurchases / mockPurchaseHistory.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total de Compras:</span>
                      <span className="font-medium">{mockPurchaseHistory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Última Compra:</span>
                      <span className="font-medium">
                        {client.lastPurchase ? formatDate(client.lastPurchase) : 'Nunca'}
                      </span>
                    </div>
                    {daysSince && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dias sem comprar:</span>
                        <span className={`font-medium ${daysSince > 60 ? 'text-red-600' : 'text-green-600'}`}>
                          {daysSince} dias
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Classificação: {tierInfo.tier}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Histórico Completo */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Histórico de Compras */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-purple-600" />
                    <span>Histórico de Compras</span>
                  </CardTitle>
                  <CardDescription>
                    Últimas compras realizadas pelo cliente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPurchaseHistory.map(purchase => (
                    <div key={purchase.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{purchase.products.join(', ')}</p>
                          <p className="text-sm text-gray-500">{formatDate(purchase.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-gray-500">{purchase.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Histórico de Manutenções */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-orange-600" />
                    <span>Histórico de Manutenções</span>
                  </CardTitle>
                  <CardDescription>
                    Serviços realizados e garantias ativas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockMaintenanceHistory.map(maintenance => (
                    <div key={maintenance.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{maintenance.service}</p>
                          <p className="text-sm text-gray-600">{maintenance.device}</p>
                          <p className="text-sm text-gray-500">{formatDate(maintenance.date)}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-1">
                            {maintenance.status}
                          </Badge>
                          <p className="text-sm font-semibold">
                            R$ {maintenance.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-gray-500">Garantia: {maintenance.warranty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          

          {/* Ações Rápidas */}
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contato Direto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={onContactWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ligar pelo WhatsApp
                  </Button>
                  {client.email && (
                    <Button 
                      onClick={onSendEmail}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar E-mail
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar Telefone
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Enviar Promoção
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Visita
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Criar Campanha
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
