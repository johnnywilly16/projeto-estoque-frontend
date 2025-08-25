'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MessageCircle, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  X
} from 'lucide-react';
import { useInventoryStore } from '../../store';
import type { Client } from '../../types';

interface ClientsListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: 'all' | 'active' | 'inactive';
  onFilterChange: (status: 'all' | 'active' | 'inactive') => void;
  onViewProfile: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onContactWhatsApp: (client: Client) => void;
  onSendEmail: (client: Client) => void;
}

export function ClientsList({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onViewProfile,
  onEditClient,
  onDeleteClient,
  onContactWhatsApp,
  onSendEmail
}: ClientsListProps) {
  const { clients } = useInventoryStore();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<'name' | 'totalPurchases' | 'lastPurchase'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Obter todas as tags únicas
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    clients.forEach(client => {
      client.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [clients]);

  // Filtrar e ordenar clientes
  const filteredClients = useMemo(() => {
    const filtered = clients.filter(client => {
      // Busca inteligente (nome, telefone, email)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        client.name.toLowerCase().includes(searchLower) ||
        client.phone.toLowerCase().includes(searchLower) ||
        (client.email && client.email.toLowerCase().includes(searchLower)) ||
        (client.document && client.document.includes(searchQuery));

      // Filtro de status (ativo = comprou nos últimos 90 dias)
      const isActive = client.lastPurchase && 
        new Date(client.lastPurchase) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'active' && isActive) ||
        (filterStatus === 'inactive' && !isActive);

      // Filtro por tags selecionadas
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => client.tags.includes(tag));

      // Filtro por faixa de gastos
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = client.totalPurchases >= minPrice && client.totalPurchases <= maxPrice;

      return matchesSearch && matchesStatus && matchesTags && matchesPrice;
    });

    // Ordenar
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'totalPurchases':
          compareValue = a.totalPurchases - b.totalPurchases;
          break;
        case 'lastPurchase':
          const dateA = a.lastPurchase ? new Date(a.lastPurchase).getTime() : 0;
          const dateB = b.lastPurchase ? new Date(b.lastPurchase).getTime() : 0;
          compareValue = dateA - dateB;
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [clients, searchQuery, filterStatus, selectedTags, priceRange, sortBy, sortOrder]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setPriceRange({ min: '', max: '' });
    onSearchChange('');
    onFilterChange('all');
  };

  const formatLastPurchase = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getClientStatus = (client: Client) => {
    if (!client.lastPurchase) return 'Novo';
    const daysSinceLastPurchase = Math.floor(
      (Date.now() - new Date(client.lastPurchase).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastPurchase <= 30) return 'Ativo';
    if (daysSinceLastPurchase <= 90) return 'Regular';
    return 'Inativo';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Regular': return 'bg-yellow-100 text-yellow-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      case 'Novo': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Busca e Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-600" />
              <span>Busca Inteligente e Filtros</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Busca Principal */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por nome, telefone, email ou documento..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => onFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos (90 dias)</option>
              <option value="inactive">Inativos</option>
            </select>

            {(searchQuery || filterStatus !== 'all' || selectedTags.length > 0 || priceRange.min || priceRange.max) && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>

          

          {/* Filtros Avançados */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag) 
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

              {/* Faixa de Gastos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gasto Mínimo (R$)
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gasto Máximo (R$)
                  </label>
                  <Input
                    type="number"
                    placeholder="Sem limite"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>

              {/* Ordenação */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'totalPurchases' | 'lastPurchase')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="name">Nome</option>
                    <option value="totalPurchases">Total de Compras</option>
                    <option value="lastPurchase">Última Compra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordem
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>
            Clientes Encontrados ({filteredClients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map(client => {
              const status = getClientStatus(client);
              return (
                <div
                  key={client.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Informações do Cliente */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                        {client.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{client.phone}</span>
                        </div>
                        {client.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{client.email}</span>
                          </div>
                        )}
                        {client.address && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{client.address.city}, {client.address.state}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Última: {formatLastPurchase(client.lastPurchase)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="font-medium text-green-600">
                          Total: R$ {client.totalPurchases.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewProfile(client)}
                        title="Visualizar Perfil"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditClient(client)}
                        title="Editar Dados"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onContactWhatsApp(client)}
                        title="Contatar WhatsApp"
                        className="text-green-600 hover:text-green-700"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      {client.email && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSendEmail(client)}
                          title="Enviar E-mail"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteClient(client)}
                        title="Remover Cliente"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum cliente encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
