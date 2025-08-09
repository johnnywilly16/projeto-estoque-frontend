'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  PlayCircle,
  RefreshCw,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { TensorFlowML } from '@/lib/ml/tensorflow';
import { useInventoryStore } from '@/store';

export function TensorFlowStatus() {
  const [tfInstance, setTfInstance] = useState<TensorFlowML | null>(null);
  const [modelStatus, setModelStatus] = useState({
    isReady: false,
    isTraining: false,
    hasTrainingData: false,
    backend: 'cpu'
  });
  // const [trainingProgress, setTrainingProgress] = useState(0);
  const [predictions, setPredictions] = useState<Array<{
    productId: string;
    probability: number;
    confidence: number;
    factors: string[];
    estimatedSales: number;
  }>>([]);
  const [lastTrainingTime, setLastTrainingTime] = useState<Date | null>(null);

  const { products, sales, events } = useInventoryStore();

  // Inicializar TensorFlow
  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        const tf = new TensorFlowML();
        setTfInstance(tf);
        
        // Atualizar status
        const info = tf.getModelInfo();
        setModelStatus(info);
        
        console.log('TensorFlow ML inicializado');
      } catch (error) {
        console.error('Erro ao inicializar TensorFlow:', error);
      }
    };

    initTensorFlow();
    
    return () => {
      if (tfInstance) {
        tfInstance.dispose();
      }
    };
  }, []);

  // Treinar modelo
  const handleTrainModel = async () => {
    if (!tfInstance || products.length === 0) return;

    try {
      setModelStatus(prev => ({ ...prev, isTraining: true }));
      
      console.log('Iniciando treinamento...');
      await tfInstance.trainRecommendationModel(products, sales, events);
      
      const info = tfInstance.getModelInfo();
      setModelStatus(info);
      setLastTrainingTime(new Date());
      
      // Gerar predições após treinamento
      await generatePredictions();
      
    } catch (error) {
      console.error('Erro no treinamento:', error);
    }
  };

  // Gerar predições
  const generatePredictions = async () => {
    if (!tfInstance || !modelStatus.isReady) return;

    try {
      const results = await tfInstance.predictProductPopularity(products.slice(0, 10));
      setPredictions(results);
    } catch (error) {
      console.error('Erro nas predições:', error);
    }
  };

  // Salvar modelo
  const handleSaveModel = async () => {
    if (!tfInstance) return;

    try {
      await tfInstance.saveModel('inventory-model-v1');
      alert('Modelo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
      alert('Erro ao salvar modelo');
    }
  };

  // Carregar modelo
  const handleLoadModel = async () => {
    if (!tfInstance) return;

    try {
      await tfInstance.loadModel('inventory-model-v1');
      const info = tfInstance.getModelInfo();
      setModelStatus(info);
      alert('Modelo carregado com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar modelo:', error);
      alert('Nenhum modelo salvo encontrado');
    }
  };

  const getStatusIcon = () => {
    if (modelStatus.isTraining) {
      return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
    }
    if (modelStatus.isReady) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  };

  const getStatusText = () => {
    if (modelStatus.isTraining) return 'Treinando...';
    if (modelStatus.isReady) return 'Modelo Pronto';
    return 'Aguardando Treinamento';
  };

  const getStatusColor = () => {
    if (modelStatus.isTraining) return 'bg-blue-100 text-blue-800';
    if (modelStatus.isReady) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status do TensorFlow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>TensorFlow.js Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Status Principal */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div>
                  <p className="font-medium">{getStatusText()}</p>
                  <p className="text-sm text-gray-500">
                    Backend: {modelStatus.backend.toUpperCase()}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor()}>
                {modelStatus.isReady ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            {/* Informações do Dataset */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Database className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-blue-900">{products.length}</p>
                <p className="text-xs text-blue-600">Produtos</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-900">{sales.length}</p>
                <p className="text-xs text-green-600">Vendas</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-purple-900">{events.length}</p>
                <p className="text-xs text-purple-600">Eventos</p>
              </div>
            </div>

            {/* Última Atualização */}
            {lastTrainingTime && (
              <div className="text-center text-sm text-gray-500">
                Último treinamento: {lastTrainingTime.toLocaleString('pt-BR')}
              </div>
            )}

            {/* Controles */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleTrainModel}
                disabled={modelStatus.isTraining || products.length === 0}
                className="w-full"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {modelStatus.isTraining ? 'Treinando...' : 'Treinar Modelo'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={generatePredictions}
                disabled={!modelStatus.isReady}
                className="w-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                Gerar Predições
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                onClick={handleSaveModel}
                disabled={!modelStatus.isReady}
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleLoadModel}
                size="sm"
              >
                <Database className="h-4 w-4 mr-2" />
                Carregar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predições do Modelo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Predições ML</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Top 5 produtos com maior probabilidade de venda
                </p>
                
                {predictions.slice(0, 5).map((prediction, index) => {
                  const product = products.find(p => p.id === prediction.productId);
                  if (!product) return null;

                  return (
                    <div key={prediction.productId} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm">{product.title}</span>
                        </div>
                        <Badge variant="outline">
                          {Math.round(prediction.probability * 100)}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress 
                          value={prediction.probability * 100} 
                          className="h-2"
                        />
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">Confiança:</span>
                            <span className="ml-1 font-medium">
                              {Math.round(prediction.confidence * 100)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Est. Vendas:</span>
                            <span className="ml-1 font-medium">
                              {prediction.estimatedSales}/mês
                            </span>
                          </div>
                        </div>
                        
                        {prediction.factors.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Fatores:</span>
                            <p className="mt-1">{prediction.factors.slice(0, 2).join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="font-medium">Nenhuma predição disponível</p>
                <p className="text-sm">
                  {!modelStatus.isReady 
                    ? 'Treine o modelo primeiro para ver predições'
                    : 'Clique em "Gerar Predições" para ver resultados'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
