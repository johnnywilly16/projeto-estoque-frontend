'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  Trophy, 
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { mockClients } from '@/lib/api/mockData';

export function ClientsDashboard() {
  // Calcular métricas dos clientes
  const totalClients = mockClients.length;
  const activeClients = mockClients.filter(client => 
    client.lastPurchase && 
    new Date(client.lastPurchase) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  ).length;
  
  const clientOfMonth = mockClients.reduce((max, client) => 
    client.totalPurchases > max.totalPurchases ? client : max
  );
  
  const totalRevenue = mockClients.reduce((sum, client) => sum + client.totalPurchases, 0);
  const avgRevenuePerClient = totalRevenue / totalClients;
  
  const newClientsThisMonth = mockClients.filter(client => 
    new Date(client.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  const topClients = mockClients
    .sort((a, b) => b.totalPurchases - a.totalPurchases)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +{newClientsThisMonth} novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              {((activeClients / totalClients) * 100).toFixed(1)}% da base
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliente do Mês</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{clientOfMonth.name}</div>
            <p className="text-xs text-muted-foreground">
              R$ {clientOfMonth.totalPurchases.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita por Cliente</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {avgRevenuePerClient.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Ticket médio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Top Clientes e Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Clientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Top 5 Clientes</span>
            </CardTitle>
            <CardDescription>
              Clientes com maior valor total de compras
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topClients.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    R$ {client.totalPurchases.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {client.tags.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Insights Rápidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Insights Rápidos</span>
            </CardTitle>
            <CardDescription>
              Análises automáticas da base de clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Segmentação Automática</h4>
                  <p className="text-sm text-blue-700">
                    {mockClients.filter(c => c.tags.includes('VIP')).length} clientes VIP identificados
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Oportunidade de Retenção</h4>
                  <p className="text-sm text-green-700">
                    {mockClients.filter(c => !c.lastPurchase || new Date(c.lastPurchase) < new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)).length} clientes sem compras há 60+ dias
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">Contatos Pendentes</h4>
                  <p className="text-sm text-purple-700">
                    {mockClients.filter(c => !c.email).length} clientes sem email cadastrado
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Potencial de Upsell</h4>
                  <p className="text-sm text-yellow-700">
                    {mockClients.filter(c => c.totalPurchases > 1000 && c.totalPurchases < 3000).length} clientes com potencial de crescimento
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
