'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ReportsDashboard } from './ReportsDashboard';
import { FinancialReportsModal } from './FinancialReportsModal';
import { ProductReportsModal } from './ProductReportsModal';
import { ClientReportsModal } from './ClientReportsModal';
import { MaintenanceReportsModal } from './MaintenanceReportsModal';
import { CustomReportsModal } from './CustomReportsModal';
import { 
  BarChart3, 
  DollarSign, 
  Package, 
  Users, 
  Wrench,
  Brain,
  FileText,
  Download,
  Calendar,
  TrendingUp
} from 'lucide-react';

export function ReportsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'financial',
      title: 'Relatórios Financeiros',
      description: 'Receitas, custos, lucros e análises financeiras',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      id: 'products',
      title: 'Relatórios de Produtos',
      description: 'Performance, estoque e recomendações de compra',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'clients',
      title: 'Relatórios de Clientes',
      description: 'Segmentação, retenção e análise de comportamento',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      id: 'maintenance',
      title: 'Relatórios de Manutenção',
      description: 'Serviços, performance técnica e satisfação',
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    {
      id: 'custom',
      title: 'Relatórios Personalizados',
      description: 'Crie relatórios customizados com IA',
      icon: Brain,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100'
    }
  ];

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span>Central de Relatórios</span>
          </h1>
          <p className="text-gray-500">
            Análises avançadas e insights de negócio com IA integrada
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            onClick={() => openModal('custom')}
          >
            <Brain className="h-4 w-4 mr-2" />
            Criar Personalizado
          </Button>
          <Button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Tudo
          </Button>
        </div>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">
            <TrendingUp className="h-4 w-4 mr-2" />
            Dashboard Executivo
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Tipos de Relatórios
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="h-4 w-4 mr-2" />
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Executivo */}
        <TabsContent value="dashboard" className="space-y-6">
          <ReportsDashboard />
        </TabsContent>

        {/* Tipos de Relatórios */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map(report => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className={`p-6 rounded-lg border-2 border-gray-200 cursor-pointer transition-all ${report.bgColor}`}
                  onClick={() => openModal(report.id)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-white border border-gray-200`}>
                        <Icon className={`h-6 w-6 ${report.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Clique para abrir
                      </span>
                      <div className={`p-1 rounded ${report.color}`}>
                        <FileText className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estatísticas Rápidas */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estatísticas dos Relatórios
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">847</div>
                <div className="text-sm text-gray-600">Relatórios Gerados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-gray-600">Este Mês</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Personalizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">92%</div>
                <div className="text-sm text-gray-600">Precisão IA</div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Histórico de Relatórios */}
        <TabsContent value="history" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Histórico de Relatórios
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Visualize, baixe novamente e gerencie todos os relatórios gerados. 
              Funcionalidade em desenvolvimento.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modais dos Relatórios */}
      <FinancialReportsModal 
        isOpen={activeModal === 'financial'}
        onClose={closeModal}
      />

      <ProductReportsModal 
        isOpen={activeModal === 'products'}
        onClose={closeModal}
      />

      <ClientReportsModal 
        isOpen={activeModal === 'clients'}
        onClose={closeModal}
      />

      <MaintenanceReportsModal 
        isOpen={activeModal === 'maintenance'}
        onClose={closeModal}
      />

      <CustomReportsModal 
        isOpen={activeModal === 'custom'}
        onClose={closeModal}
      />
    </div>
  );
}
