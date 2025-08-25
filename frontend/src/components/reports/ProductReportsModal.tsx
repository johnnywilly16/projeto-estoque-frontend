'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw, 
  AlertTriangle,
  ShoppingCart,
  Brain,
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  Download,
  Share
} from 'lucide-react';

interface ProductReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductReportsModal({ isOpen, onClose }: ProductReportsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para produtos
  const productsData = {
    topSelling: [
      {
        id: 'prod-1',
        name: 'iPhone 15 Pro 256GB',
        category: 'iPhone',
        sold: 45,
        revenue: 247500,
        margin: 22.3,
        stock: 6
      },
      {
        id: 'prod-2',
        name: 'iPhone 15 128GB',
        category: 'iPhone',
        sold: 38,
        revenue: 159600,
        margin: 20.1,
        stock: 12
      },
      {
        id: 'prod-3',
        name: 'Samsung Galaxy S24',
        category: 'Samsung',
        sold: 29,
        revenue: 110200,
        margin: 18.5,
        stock: 8
      },
      {
        id: 'prod-4',
        name: 'Capa iPhone 15 Pro',
        category: 'Acessórios',
        sold: 67,
        revenue: 3283,
        margin: 45.2,
        stock: 23
      }
    ],
    highestMargin: [
      {
        id: 'prod-5',
        name: 'Película iPhone 15',
        margin: 65.8,
        revenue: 1890,
        sold: 42
      },
      {
        id: 'prod-6',
        name: 'Carregador Wireless',
        margin: 55.3,
        revenue: 4650,
        sold: 31
      },
      {
        id: 'prod-7',
        name: 'Fone Bluetooth',
        margin: 48.7,
        revenue: 7350,
        sold: 25
      }
    ],
    stockAnalysis: {
      current: 1247,
      needRestock: 15,
      outOfStock: 3,
      excess: 8,
      categories: [
        { name: 'iPhone', stock: 67, status: 'low' },
        { name: 'Samsung', stock: 89, status: 'good' },
        { name: 'Acessórios', stock: 456, status: 'excess' },
        { name: 'Xiaomi', stock: 23, status: 'critical' }
      ]
    },
    lowStock: [
      {
        id: 'prod-8',
        name: 'iPhone 15 Pro Max 1TB',
        current: 2,
        minimum: 5,
        status: 'critical'
      },
      {
        id: 'prod-9',
        name: 'Samsung Galaxy S24 Ultra',
        current: 3,
        minimum: 8,
        status: 'low'
      },
      {
        id: 'prod-10',
        name: 'Xiaomi 14 Pro',
        current: 4,
        minimum: 10,
        status: 'low'
      }
    ]
  };

  const aiRecommendations = [
    {
      type: 'restock',
      title: 'Reabastecer iPhone 15 Pro',
      description: 'Estoque crítico com alta demanda - reabastecer 20 unidades',
      investment: 100000,
      expectedReturn: 135000,
      priority: 'critical',
      timeline: '3-5 dias'
    },
    {
      type: 'pricing',
      title: 'Ajustar Preço Samsung S24',
      description: 'Margem baixa comparada à concorrência - aumentar 8%',
      currentPrice: 3800,
      suggestedPrice: 4104,
      impact: 'medium',
      timeline: 'Imediato'
    },
    {
      type: 'promotion',
      title: 'Promoção Acessórios',
      description: 'Estoque excedente - criar combo promocional',
      products: ['Capas', 'Películas', 'Carregadores'],
      discount: 15,
      expectedSales: 150,
      timeline: '7 dias'
    },
    {
      type: 'new_product',
      title: 'Incluir Novos Produtos',
      description: 'Galaxy A55 em alta procura no mercado',
      investment: 45000,
      expectedReturn: 67500,
      priority: 'medium',
      timeline: '15 dias'
    }
  ];

  const categories = ['all', 'iPhone', 'Samsung', 'Xiaomi', 'Acessórios'];

  const generateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Relatório de produtos gerado');
    }, 2000);
  };

  const getStockStatus = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'good': return 'bg-green-100 text-green-800';
      case 'excess': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>Relatório de Produtos e Estoque</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button size="sm" onClick={generateReport} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </>
                )}
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Performance de produtos, análise de estoque e recomendações de IA
          </DialogDescription>
        </DialogHeader>

        {/* Filtros por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Filtrar por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Todas' : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="stock">
              <Package className="h-4 w-4 mr-2" />
              Análise de Estoque
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Brain className="h-4 w-4 mr-2" />
              IA Recomendações
            </TabsTrigger>
          </TabsList>

          {/* Performance dos Produtos */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mais Vendidos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Produtos Mais Vendidos</span>
                  </CardTitle>
                  <CardDescription>
                    Ranking de vendas por quantidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {productsData.topSelling.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold text-green-600">
                          {product.sold} vendidos
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(product.revenue)}
                        </p>
                        <Badge className={product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          Estoque: {product.stock}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Maior Margem */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span>Maior Margem de Lucro</span>
                  </CardTitle>
                  <CardDescription>
                    Produtos com melhor rentabilidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {productsData.highestMargin.map((product, index) => (
                    <div key={product.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <Badge className="bg-purple-100 text-purple-800">
                          {product.margin.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Receita: {formatCurrency(product.revenue)}</span>
                        <span>Vendidos: {product.sold}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${product.margin}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Giro de Estoque */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <span>Giro de Estoque por Categoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productsData.stockAnalysis.categories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg text-center">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-2xl font-bold text-blue-600 my-2">{category.stock}</p>
                      <Badge className={getStockStatus(category.status)}>
                        {category.status === 'good' ? 'Bom' :
                         category.status === 'low' ? 'Baixo' :
                         category.status === 'critical' ? 'Crítico' : 'Excesso'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise de Estoque */}
          <TabsContent value="stock" className="space-y-6">
            {/* Resumo do Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productsData.stockAnalysis.current}</div>
                  <p className="text-xs text-muted-foreground">
                    Total de produtos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Necessita Reposição</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{productsData.stockAnalysis.needRestock}</div>
                  <p className="text-xs text-muted-foreground">
                    Produtos abaixo do mínimo
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Em Falta</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{productsData.stockAnalysis.outOfStock}</div>
                  <p className="text-xs text-muted-foreground">
                    Produtos zerados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Estoque Excedente</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{productsData.stockAnalysis.excess}</div>
                  <p className="text-xs text-muted-foreground">
                    Produtos em excesso
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Produtos com Estoque Baixo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Produtos com Estoque Baixo</span>
                </CardTitle>
                <CardDescription>
                  Produtos que precisam de reposição urgente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {productsData.lowStock.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Estoque atual: {product.current} | Mínimo: {product.minimum}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStockStatus(product.status)}>
                        {product.status === 'critical' ? 'Crítico' : 'Baixo'}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Repor: {product.minimum - product.current} unidades
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA Recomendações */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiRecommendations.map((rec, index) => (
                <Card key={index} className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <span>{rec.title}</span>
                      </div>
                      {rec.priority && (
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority === 'critical' ? 'Crítico' :
                           rec.priority === 'high' ? 'Alto' :
                           rec.priority === 'medium' ? 'Médio' : 'Baixo'}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{rec.description}</p>
                    
                    <div className="space-y-2">
                      {rec.investment && (
                        <div className="flex justify-between text-sm">
                          <span>Investimento:</span>
                          <span className="font-medium text-red-600">
                            {formatCurrency(rec.investment)}
                          </span>
                        </div>
                      )}
                      
                      {rec.expectedReturn && (
                        <div className="flex justify-between text-sm">
                          <span>Retorno Esperado:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(rec.expectedReturn)}
                          </span>
                        </div>
                      )}
                      
                      {rec.currentPrice && rec.suggestedPrice && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span>Preço Atual:</span>
                            <span>{formatCurrency(rec.currentPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Preço Sugerido:</span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(rec.suggestedPrice)}
                            </span>
                          </div>
                        </>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span>Prazo:</span>
                        <span className="font-medium">{rec.timeline}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <Button size="sm" className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Implementar Recomendação
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo das Recomendações */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo das Recomendações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900">📦 O que Comprar</h4>
                    <p className="text-sm text-red-800 mt-1">
                      iPhone 15 Pro (20 unidades), Galaxy A55 (15 unidades)
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900">💰 Quanto Investir</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Total recomendado: {formatCurrency(145000)}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900">📅 Quando Comprar</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Críticos: 3-5 dias | Médios: 15 dias
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
