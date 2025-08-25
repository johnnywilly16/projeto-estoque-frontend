'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ClientsDashboard } from './ClientsDashboard';
import { ClientsList } from './ClientsList';
import { AddClientModal } from './AddClientModal';
import { ClientProfileModal } from './ClientProfileModal';
import { EditClientModal } from './EditClientModal';
import { DeleteClientModal } from './DeleteClientModal';
import { Button } from '../ui/button';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  BarChart3
} from 'lucide-react';
import type { Client } from '../../types';

export function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const handleViewProfile = (client: Client) => {
    setSelectedClient(client);
    setIsProfileModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const handleContactWhatsApp = (client: Client) => {
    const phoneNumber = client.phone.replace(/\D/g, '');
    const message = `Olá ${client.name}! Aqui é da Japa iPhone. Como posso ajudá-lo hoje?`;
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = (client: Client) => {
    if (client.email) {
      const subject = 'Promoção Especial - Japa iPhone';
      const body = `Olá ${client.name}!\n\nTemos uma oferta especial para você...`;
      const mailtoUrl = `mailto:${client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <span>Gestão de Clientes</span>
          </h1>
          <p className="text-gray-500">
            Sistema completo de relacionamento com clientes
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Tabs principais do módulo */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="list">
            <Users className="h-4 w-4 mr-2" />
            Lista de Clientes
          </TabsTrigger>
          
        </TabsList>

        {/* Dashboard de Clientes */}
        <TabsContent value="dashboard" className="space-y-6">
          <ClientsDashboard />
        </TabsContent>

        {/* Lista de Clientes com busca e filtros */}
        <TabsContent value="list" className="space-y-6">
          <ClientsList 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onViewProfile={handleViewProfile}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
            onContactWhatsApp={handleContactWhatsApp}
            onSendEmail={handleSendEmail}
          />
        </TabsContent>

        
      </Tabs>

      {/* Modais */}
      <AddClientModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {selectedClient && (
        <>
          <ClientProfileModal 
            client={selectedClient}
            isOpen={isProfileModalOpen}
            onClose={() => {
              setIsProfileModalOpen(false);
              setSelectedClient(null);
            }}
            onEdit={() => {
              setIsProfileModalOpen(false);
              setIsEditModalOpen(true);
            }}
            onContactWhatsApp={() => handleContactWhatsApp(selectedClient)}
            onSendEmail={() => handleSendEmail(selectedClient)}
          />

          <EditClientModal 
            client={selectedClient}
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedClient(null);
            }}
          />

          <DeleteClientModal 
            client={selectedClient}
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedClient(null);
            }}
          />
        </>
      )}
    </div>
  );
}
