'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Brain, 
  Database, 
  Filter, 
  FileText, 
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Share,
  Play,
  Settings,
  Lightbulb,
  Target,
  Calendar,
  Users,
  Package,
  DollarSign,
  Wrench
} from 'lucide-react';

interface CustomReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReportConfig {
  name: string;
  description: string;
  dataSources: string[];
  filters: {
    period: string;
    categories: string[];
    clients: string[];
    paymentMethods: string[];
  };
  outputFormat: string;
  visualizations: string[];
}

export function CustomReportsModal({ isOpen, onClose }: CustomReportsModalProps) {
  const [currentStep, setCurrentStep] = useState('data');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    description: '',
    dataSources: [],
    filters: {
      period: 'month',
      categories: [],
      clients: [],
      paymentMethods: []
    },
    outputFormat: 'dashboard',
    visualizations: []
  });

  const dataSources = [
    {
      id: 'sales',
      name: 'Vendas',
      icon: DollarSign,
      description: 'Dados de vendas, produtos e faturamento',
      tables: ['Vendas', 'Produtos', 'Categorias', 'Pagamentos'],
      color: 'text-green-600'
    },
    {
      id: 'clients',
      name: 'Clientes',
      icon: Users,
      description: 'Perfis, histórico e comportamento de clientes',
      tables: ['Clientes', 'Histórico', 'Segmentação', 'Preferências'],
      color: 'text-blue-600'
    },
    {
      id: 'products',
      name: 'Produtos',
      icon: Package,
      description: 'Estoque, performance e análise de produtos',
      tables: ['Produtos', 'Estoque', 'Categorias', 'Fornecedores'],
      color: 'text-purple-600'
    },
    {
      id: 'maintenance',
      name: 'Manutenções',
      icon: Wrench,
      description: 'Serviços técnicos e assistência',
      tables: ['Serviços', 'Técnicos', 'Garantias', 'Peças'],
      color: 'text-orange-600'
    },
    {
      id: 'financial',
      name: 'Financeiro',
      icon: BarChart3,
      description: 'Receitas, custos e análise financeira',
      tables: ['Receitas', 'Custos', 'Lucros', 'Fluxo de Caixa'],
      color: 'text-red-600'
    }
  ];

  const outputFormats = [
    {
      id: 'dashboard',
      name: 'Dashboard Visual',
      icon: BarChart3,
      description: 'Interface interativa com gráficos e métricas'
    },
    {
      id: 'pdf',
      name: 'Relatório PDF',
      icon: FileText,
      description: 'Documento formatado para impressão'
    },
    {
      id: 'excel',
      name: 'Planilha Excel',
      icon: Database,
      description: 'Dados estruturados para análise'
    },
    {
      id: 'interactive',
      name: 'Gráficos Interativos',
      icon: PieChart,
      description: 'Visualizações dinâmicas e exploráveis'
    }
  ];

  const visualizationTypes = [
    { id: 'bar', name: 'Gráfico de Barras', icon: BarChart3 },
    { id: 'line', name: 'Gráfico de Linha', icon: LineChart },
    { id: 'pie', name: 'Gráfico de Pizza', icon: PieChart },
    { id: 'table', name: 'Tabela', icon: Database },
    { id: 'metric', name: 'Métrica', icon: Target },
    { id: 'timeline', name: 'Linha do Tempo', icon: Calendar }
  ];

  const aiSuggestions = [
    {
      title: 'Análise de Tendências de Vendas',
      description: 'Identifica padrões sazonais e oportunidades de crescimento',
      dataSources: ['sales', 'products'],
      filters: ['period', 'categories'],
      visualizations: ['line', 'bar', 'metric']
    },
    {
      title: 'Segmentação Avançada de Clientes',
      description: 'Agrupa clientes por comportamento e valor',
      dataSources: ['clients', 'sales'],
      filters: ['period', 'categories'],
      visualizations: ['pie', 'table', 'metric']
    },
    {
      title: 'Performance de Produtos vs Estoque',
      description: 'Analisa giro de estoque e produtos mais rentáveis',
      dataSources: ['products', 'sales'],
      filters: ['categories', 'period'],
      visualizations: ['bar', 'table', 'metric']
    },
    {
      title: 'Eficiência Operacional de Manutenção',
      description: 'Avalia performance técnica e satisfação do cliente',
      dataSources: ['maintenance', 'clients'],
      filters: ['period'],
      visualizations: ['bar', 'line', 'metric']
    }
  ];

  const handleDataSourceToggle = (sourceId: string) => {
    setReportConfig(prev => ({
      ...prev,
      dataSources: prev.dataSources.includes(sourceId)
        ? prev.dataSources.filter(id => id !== sourceId)
        : [...prev.dataSources, sourceId]
    }));
  };

  const handleVisualizationToggle = (vizId: string) => {
    setReportConfig(prev => ({
      ...prev,
      visualizations: prev.visualizations.includes(vizId)
        ? prev.visualizations.filter(id => id !== vizId)
        : [...prev.visualizations, vizId]
    }));
  };

  const handleFilterChange = (filterType: string, value: unknown) => {
    setReportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value
      }
    }));
  };

  const applySuggestion = (suggestion: { title: string; description: string; dataSources: string[]; visualizations: string[] }) => {
    setReportConfig(prev => ({
      ...prev,
      name: suggestion.title,
      description: suggestion.description,
      dataSources: suggestion.dataSources,
      visualizations: suggestion.visualizations
    }));
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Relatório personalizado gerado:', reportConfig);
      // Aqui seria gerado o relatório real
    }, 3000);
  };

  const isConfigValid = () => {
    return reportConfig.name && 
           reportConfig.dataSources.length > 0 && 
           reportConfig.outputFormat &&
           reportConfig.visualizations.length > 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-pink-600" />
              <span>Criador de Relatórios com IA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={isGenerating}>
                <Share className="h-4 w-4 mr-2" />
                Salvar Modelo
              </Button>
              <Button 
                size="sm" 
                onClick={generateReport} 
                disabled={!isConfigValid() || isGenerating}
                className="bg-pink-600 hover:bg-pink-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </>
                )}
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Crie relatórios personalizados com análise automatizada e insights de IA
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data">
              <Database className="h-4 w-4 mr-2" />
              Dados
            </TabsTrigger>
            <TabsTrigger value="filters">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </TabsTrigger>
            <TabsTrigger value="format">
              <FileText className="h-4 w-4 mr-2" />
              Formato
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="h-4 w-4 mr-2" />
              IA Generator
            </TabsTrigger>
          </TabsList>

          {/* Seleção de Dados */}
          <TabsContent value="data" className="space-y-6">
            {/* Configuração Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Configuração Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportName">Nome do Relatório</Label>
                    <Input
                      id="reportName"
                      value={reportConfig.name}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Análise de Vendas Mensal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportDesc">Descrição</Label>
                    <Textarea
                      id="reportDesc"
                      value={reportConfig.description}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva o objetivo do relatório..."
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seleção de Fontes de Dados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Selecionar Fontes de Dados</span>
                </CardTitle>
                <CardDescription>
                  Escolha as bases de dados que serão incluídas no relatório
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dataSources.map(source => {
                    const Icon = source.icon;
                    const isSelected = reportConfig.dataSources.includes(source.id);
                    
                    return (
                      <div
                        key={source.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => handleDataSourceToggle(source.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-6 w-6 ${source.color}`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{source.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Tabelas incluídas:</p>
                              <div className="flex flex-wrap gap-1">
                                {source.tables.map((table, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {table}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sugestões da IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Sugestões da IA</span>
                </CardTitle>
                <CardDescription>
                  Relatórios pré-configurados baseados em análises comuns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      <h4 className="font-medium text-yellow-900">{suggestion.title}</h4>
                      <p className="text-sm text-yellow-800 mt-1">{suggestion.description}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge className="bg-yellow-200 text-yellow-800 text-xs">
                          {suggestion.dataSources.length} fontes
                        </Badge>
                        <Badge className="bg-yellow-200 text-yellow-800 text-xs">
                          {suggestion.visualizations.length} gráficos
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuração de Filtros */}
          <TabsContent value="filters" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Filtro de Período */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Período</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { value: 'today', label: 'Hoje' },
                    { value: 'week', label: 'Última Semana' },
                    { value: 'month', label: 'Último Mês' },
                    { value: 'quarter', label: 'Trimestre' },
                    { value: 'year', label: 'Ano' },
                    { value: 'custom', label: 'Período Customizado' }
                  ].map(period => (
                    <div key={period.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={reportConfig.filters.period === period.value}
                        onCheckedChange={() => handleFilterChange('period', period.value)}
                      />
                      <Label>{period.label}</Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Filtro de Categorias */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorias de Produtos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['iPhone', 'Samsung', 'Xiaomi', 'Acessórios', 'Serviços'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        checked={reportConfig.filters.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange('categories', [...reportConfig.filters.categories, category]);
                          } else {
                            handleFilterChange('categories', reportConfig.filters.categories.filter(c => c !== category));
                          }
                        }}
                      />
                      <Label>{category}</Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Filtro de Formas de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'].map(method => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        checked={reportConfig.filters.paymentMethods.includes(method)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleFilterChange('paymentMethods', [...reportConfig.filters.paymentMethods, method]);
                          } else {
                            handleFilterChange('paymentMethods', reportConfig.filters.paymentMethods.filter(m => m !== method));
                          }
                        }}
                      />
                      <Label>{method}</Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Filtros Avançados */}
              <Card>
                <CardHeader>
                  <CardTitle>Filtros Avançados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Clientes Específicos</Label>
                    <Input placeholder="Pesquisar clientes..." />
                  </div>
                  <div>
                    <Label>Faixa de Valores</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Mín: R$ 0" />
                      <Input placeholder="Máx: R$ 10.000" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Formato de Saída */}
          <TabsContent value="format" className="space-y-6">
            {/* Formato de Saída */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Formato de Saída</span>
                </CardTitle>
                <CardDescription>
                  Escolha como o relatório será apresentado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outputFormats.map(format => {
                    const Icon = format.icon;
                    const isSelected = reportConfig.outputFormat === format.id;
                    
                    return (
                      <div
                        key={format.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => setReportConfig(prev => ({ ...prev, outputFormat: format.id }))}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="h-6 w-6 text-gray-600" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{format.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tipos de Visualização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Tipos de Visualização</span>
                </CardTitle>
                <CardDescription>
                  Selecione os gráficos e visualizações desejadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {visualizationTypes.map(viz => {
                    const Icon = viz.icon;
                    const isSelected = reportConfig.visualizations.includes(viz.id);
                    
                    return (
                      <div
                        key={viz.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => handleVisualizationToggle(viz.id)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <Icon className="h-8 w-8 text-gray-600" />
                          <span className="text-sm font-medium">{viz.name}</span>
                          {isSelected && (
                            <div className="w-4 h-4 bg-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA Geração Automática */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-pink-600" />
                  <span>Geração Automática com IA</span>
                </CardTitle>
                <CardDescription>
                  A IA irá analisar os dados e gerar insights automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preview da Configuração */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Resumo da Configuração</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Nome:</p>
                      <p className="font-medium">{reportConfig.name || 'Não definido'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fontes de Dados:</p>
                      <p className="font-medium">{reportConfig.dataSources.length} selecionadas</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Formato:</p>
                      <p className="font-medium">
                        {outputFormats.find(f => f.id === reportConfig.outputFormat)?.name || 'Não definido'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Visualizações:</p>
                      <p className="font-medium">{reportConfig.visualizations.length} tipos</p>
                    </div>
                  </div>
                </div>

                {/* Processo de Geração */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Processo de Geração da IA:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <h5 className="font-medium text-blue-900">Análise dos Dados</h5>
                        <p className="text-sm text-blue-700">Coleta e processa informações das fontes selecionadas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <h5 className="font-medium text-purple-900">Identificação de Padrões</h5>
                        <p className="text-sm text-purple-700">Detecta tendências, anomalias e correlações importantes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <h5 className="font-medium text-green-900">Geração de Insights</h5>
                        <p className="text-sm text-green-700">Cria análises interpretáveis e acionáveis</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <div>
                        <h5 className="font-medium text-orange-900">Recomendações de Ação</h5>
                        <p className="text-sm text-orange-700">Sugere estratégias baseadas nos dados analisados</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status da Configuração */}
                <div className="p-4 border border-pink-200 bg-pink-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="h-5 w-5 text-pink-600" />
                    <h4 className="font-medium text-pink-900">Status da Configuração</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-800">Nome do Relatório:</span>
                      <Badge className={reportConfig.name ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {reportConfig.name ? 'Definido' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-800">Fontes de Dados:</span>
                      <Badge className={reportConfig.dataSources.length > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {reportConfig.dataSources.length > 0 ? `${reportConfig.dataSources.length} selecionadas` : 'Nenhuma'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-800">Formato de Saída:</span>
                      <Badge className={reportConfig.outputFormat ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {reportConfig.outputFormat ? 'Definido' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-800">Visualizações:</span>
                      <Badge className={reportConfig.visualizations.length > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {reportConfig.visualizations.length > 0 ? `${reportConfig.visualizations.length} tipos` : 'Nenhuma'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Preview da Geração */}
                {isGenerating && (
                  <div className="p-6 border border-pink-200 bg-pink-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="animate-spin h-6 w-6 border-2 border-pink-600 border-t-transparent rounded-full"></div>
                      <h4 className="font-medium text-pink-900">Gerando Relatório...</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-pink-800">📊 Coletando dados das fontes selecionadas...</div>
                      <div className="text-sm text-pink-800">🧠 IA analisando padrões e tendências...</div>
                      <div className="text-sm text-pink-800">📈 Gerando visualizações e insights...</div>
                      <div className="text-sm text-pink-800">📋 Compilando relatório final...</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <div className="text-sm text-gray-500">
            {!isConfigValid() && (
              <span>Complete todas as configurações necessárias para gerar o relatório</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isGenerating}>
              Cancelar
            </Button>
            <Button 
              onClick={generateReport} 
              disabled={!isConfigValid() || isGenerating}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Gerando Relatório...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Gerar com IA
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
