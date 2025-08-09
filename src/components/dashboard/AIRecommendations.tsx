'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp,
  Package,
  Zap,
  RefreshCw,
  ChevronRight,
  Lightbulb,
  Target
} from 'lucide-react';
import { RecommendationResult } from '@/types';
import { mlAPI } from '@/lib/api';

interface AIRecommendationsProps {
  userId?: string;
}

export function AIRecommendations({ userId = 'user-1' }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [trends, setTrends] = useState<Array<{
    type: string;
    confidence: number;
    title: string;
    description: string;
    actionItems?: string[];
    impact?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await mlAPI.getRecommendations(userId);
      setRecommendations(response.data.recommendations);
      setTrends(response.data.trends);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [userId]);

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'restock':
        return <Package className="h-4 w-4" />;
      case 'promotion':
        return <TrendingUp className="h-4 w-4" />;
      case 'bundle':
        return <Target className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'restock':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'promotion':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'bundle':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      restock: 'Reposição',
      promotion: 'Promoção',
      bundle: 'Combo',
      new_product: 'Novo Produto'
    };
    return labels[type] || type;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      critical: 'Crítico',
      high: 'Alto',
      medium: 'Médio',
      low: 'Baixo'
    };
    return labels[priority] || priority;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>IA Recomendações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-500">Analisando dados...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>IA Recomendações</span>
            </CardTitle>
            <p className="text-sm text-gray-500">
              {recommendations.length} recomendações baseadas em IA
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              <Zap className="h-3 w-3 mr-1" />
              IA Ativa
            </Badge>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadRecommendations}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Insights de Tendências */}
          {trends.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-purple-700 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Insights de Tendências</span>
              </h4>
              
              {trends.slice(0, 2).map((trend, index) => (
                <div 
                  key={index}
                  className="p-3 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-600">
                        {Math.round(trend.confidence * 100)}% confiança
                      </Badge>
                      <span className="font-medium text-purple-900">
                        {trend.title}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-purple-700 mb-2">
                    {trend.description}
                  </p>
                  
                  {trend.actionItems && trend.actionItems.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-purple-800">Ações recomendadas:</p>
                      {trend.actionItems.slice(0, 2).map((action: string, idx: number) => (
                        <p key={idx} className="text-xs text-purple-600 flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1" />
                          {action}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Recomendações */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>Recomendações Prioritárias</span>
            </h4>

            {recommendations.slice(0, 5).map((recommendation) => (
              <div 
                key={`${recommendation.type}-${recommendation.title}`}
                className={`p-3 rounded-lg border ${getRecommendationColor(recommendation.type)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRecommendationIcon(recommendation.type)}
                    <span className="font-medium">
                      {recommendation.title}
                    </span>
                    <Badge variant="outline">
                      {getTypeLabel(recommendation.type)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(recommendation.priority)}`} />
                    <span className="text-xs font-medium">
                      {getPriorityLabel(recommendation.priority)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm mb-2">
                  {recommendation.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span>
                    {recommendation.products?.length > 0 && 
                      `${recommendation.products.length} produto(s) envolvido(s)`
                    }
                  </span>
                  
                  {recommendation.estimatedImpact > 0 && (
                    <span className="font-medium text-green-600">
                      Impacto: {formatCurrency(recommendation.estimatedImpact)}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {recommendations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="font-medium">Nenhuma recomendação no momento</p>
                <p className="text-sm">
                  A IA está analisando seus dados para gerar insights.
                </p>
              </div>
            )}
          </div>

          {/* Última Atualização */}
          {lastUpdated && (
            <div className="pt-4 border-t text-center">
              <p className="text-xs text-gray-500">
                Última atualização: {lastUpdated.toLocaleString('pt-BR')}
              </p>
            </div>
          )}

          {/* Botão para Ver Todas */}
          {recommendations.length > 5 && (
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Ver Todas as Recomendações ({recommendations.length})
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
