'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Trash2, 
  AlertTriangle, 
  Archive, 
  X,
  ShoppingBag,
  Wrench,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  ExternalLink
} from 'lucide-react';
import type { Client } from '@/types';

interface DeleteClientModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

interface ClientDependency {
  type: 'sale' | 'maintenance' | 'schedule';
  id: string;
  description: string;
  date: string;
  value?: number;
  status: string;
  canDelete: boolean;
}

// Mock das dependências do cliente
const mockDependencies: ClientDependency[] = [
  {
    type: 'sale',
    id: 'sale-001',
    description: 'iPhone 15 Pro 256GB Preto',
    date: '2024-02-08',
    value: 5500,
    status: 'Concluída',
    canDelete: false
  },
  {
    type: 'sale',
    id: 'sale-002',
    description: 'Capa + Película iPhone 15',
    date: '2024-01-15',
    value: 89,
    status: 'Concluída',
    canDelete: false
  },
  {
    type: 'maintenance',
    id: 'maint-001',
    description: 'Troca de Bateria - iPhone 13',
    date: '2024-01-20',
    value: 250,
    status: 'Concluído',
    canDelete: false
  },
  {
    type: 'schedule',
    id: 'sched-001',
    description: 'Agendamento para entrega',
    date: '2024-02-15',
    status: 'Agendado',
    canDelete: true
  }
];

export function DeleteClientModal({ client, isOpen, onClose }: DeleteClientModalProps) {
  const [dependencies, setDependencies] = useState<ClientDependency[]>([]);
  const [deleteOption, setDeleteOption] = useState<'permanent' | 'archive' | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simular busca de dependências
      setIsLoading(true);
      setTimeout(() => {
        setDependencies(mockDependencies);
        setIsLoading(false);
        setShowDependencies(true);
      }, 1000);
    } else {
      // Reset do estado quando modal fecha
      setDependencies([]);
      setDeleteOption(null);
      setConfirmText('');
      setShowDependencies(false);
    }
  }, [isOpen]);

  const salesDependencies = dependencies.filter(d => d.type === 'sale');
  const maintenanceDependencies = dependencies.filter(d => d.type === 'maintenance');
  const scheduleDependencies = dependencies.filter(d => d.type === 'schedule');

  const hasBlockingDependencies = dependencies.some(d => !d.canDelete);
  const canPermanentDelete = !hasBlockingDependencies;

  const handleDelete = async () => {
    if (!deleteOption) return;

    setIsLoading(true);

    // Simular processo de remoção
    setTimeout(() => {
      console.log(`Cliente ${deleteOption === 'permanent' ? 'excluído permanentemente' : 'arquivado'}:`, client.id);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const getDependencyIcon = (type: string) => {
    switch (type) {
      case 'sale': return <ShoppingBag className="h-4 w-4 text-purple-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-orange-600" />;
      case 'schedule': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDependencyTypeLabel = (type: string) => {
    switch (type) {
      case 'sale': return 'Venda';
      case 'maintenance': return 'Manutenção';
      case 'schedule': return 'Agendamento';
      default: return 'Registro';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isConfirmValid = () => {
    return confirmText.toLowerCase() === 'excluir' && deleteOption !== null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Remover Cliente: {client.name}</span>
          </DialogTitle>
          <DialogDescription>
            Verificando dependências e opções de remoção. Esta ação pode afetar dados históricos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Verificação de Dependências */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-amber-600" />
                <span>Verificação de Dependências</span>
                {isLoading && (
                  <div className="animate-spin h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full"></div>
                )}
              </CardTitle>
              <CardDescription>
                Analisando registros associados ao cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Verificando dependências...</p>
                </div>
              ) : showDependencies ? (
                <div className="space-y-4">
                  {/* Resumo das Dependências */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Vendas</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{salesDependencies.length}</p>
                      <p className="text-sm text-purple-700">
                        Total: R$ {salesDependencies.reduce((sum, d) => sum + (d.value || 0), 0).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Wrench className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-900">Manutenções</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">{maintenanceDependencies.length}</p>
                      <p className="text-sm text-orange-700">
                        Total: R$ {maintenanceDependencies.reduce((sum, d) => sum + (d.value || 0), 0).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Agendamentos</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{scheduleDependencies.length}</p>
                      <p className="text-sm text-blue-700">
                        {scheduleDependencies.filter(d => d.status === 'Agendado').length} futuros
                      </p>
                    </div>
                  </div>

                  {/* Lista Detalhada de Dependências */}
                  {dependencies.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Registros Associados:</h4>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {dependencies.map(dependency => (
                          <div 
                            key={dependency.id} 
                            className={`p-3 border rounded-lg ${
                              dependency.canDelete 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-red-50 border-red-200'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                {getDependencyIcon(dependency.type)}
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">
                                      {getDependencyTypeLabel(dependency.type)}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {dependency.status}
                                    </Badge>
                                    {!dependency.canDelete && (
                                      <Badge className="bg-red-100 text-red-800 text-xs">
                                        Bloqueio
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {dependency.description}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(dependency.date)}
                                    {dependency.value && (
                                      <> • R$ {dependency.value.toLocaleString('pt-BR')}</>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alertas sobre bloqueios */}
                  {hasBlockingDependencies && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Atenção:</strong> Este cliente possui registros históricos que impedem a exclusão permanente. 
                        Recomendamos arquivar o cliente para manter a integridade dos dados.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Opções de Remoção */}
          {showDependencies && (
            <Card>
              <CardHeader>
                <CardTitle>Opções de Remoção</CardTitle>
                <CardDescription>
                  Escolha como proceder com a remoção do cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Arquivar Cliente */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      deleteOption === 'archive' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setDeleteOption('archive')}
                  >
                    <div className="flex items-start space-x-3">
                      <Archive className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Arquivar Cliente</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Remove o cliente da lista ativa mas mantém todos os dados históricos. 
                          Pode ser restaurado posteriormente.
                        </p>
                        <div className="mt-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            Recomendado
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Excluir Permanentemente */}
                  <div 
                    className={`p-4 border-2 rounded-lg transition-all ${
                      canPermanentDelete 
                        ? `cursor-pointer ${
                            deleteOption === 'permanent' 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-200 hover:border-red-300'
                          }`
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canPermanentDelete && setDeleteOption('permanent')}
                  >
                    <div className="flex items-start space-x-3">
                      <Trash2 className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Excluir Permanentemente</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Remove completamente o cliente e todos os dados associados. 
                          Esta ação não pode ser desfeita.
                        </p>
                        <div className="mt-2">
                          {canPermanentDelete ? (
                            <Badge className="bg-red-100 text-red-800">
                              Irreversível
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              Bloqueado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmação */}
                {deleteOption && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">
                      Confirmação Necessária
                    </h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      Para confirmar, digite <strong>&quot;excluir&quot;</strong> no campo abaixo:
                    </p>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Digite &apos;excluir&apos; para confirmar"
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-sm text-gray-500">
            {hasBlockingDependencies && (
              <span className="flex items-center space-x-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Exclusão permanente bloqueada por dependências</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            
            {showDependencies && (
              <Button 
                onClick={handleDelete}
                disabled={!isConfirmValid() || isLoading}
                className={
                  deleteOption === 'permanent' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    {deleteOption === 'permanent' ? (
                      <><Trash2 className="h-4 w-4 mr-2" />Excluir Permanentemente</>
                    ) : (
                      <><Archive className="h-4 w-4 mr-2" />Arquivar Cliente</>
                    )}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
