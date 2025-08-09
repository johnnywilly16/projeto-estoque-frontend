'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TensorFlowStatus } from '@/components/dashboard/TensorFlowStatus';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { AIEngine } from './AIEngine';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Target,
  BarChart3,
  Settings
} from 'lucide-react';

export function AIPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Brain className="h-8 w-8 text-purple-600" />
          <span>Inteligência Artificial</span>
        </h1>
        <p className="text-gray-500">
          Sistema avançado de IA com TensorFlow.js para recomendações e predições inteligentes
        </p>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="engine" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="engine">
            <Brain className="h-4 w-4 mr-2" />
            AI Engine
          </TabsTrigger>
          <TabsTrigger value="tensorflow">
            <Zap className="h-4 w-4 mr-2" />
            TensorFlow
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Target className="h-4 w-4 mr-2" />
            Recomendações
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <TrendingUp className="h-4 w-4 mr-2" />
            Predições
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* AI Engine Completo */}
        <TabsContent value="engine" className="space-y-6">
          <AIEngine />
        </TabsContent>

        {/* TensorFlow Status e Controle */}
        <TabsContent value="tensorflow" className="space-y-6">
          <TensorFlowStatus />
        </TabsContent>

        {/* Recomendações */}
        <TabsContent value="recommendations" className="space-y-6">
          <AIRecommendations userId="user-1" />
        </TabsContent>

        {/* Predições */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 mx-auto text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Predições Avançadas
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Funcionalidade em desenvolvimento. Em breve teremos predições de vendas por período, 
              análise de sazonalidade e forecasting automático.
            </p>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics de IA
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Métricas avançadas de performance da IA, accuracy dos modelos, 
              análise de drift e monitoring automático em desenvolvimento.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}