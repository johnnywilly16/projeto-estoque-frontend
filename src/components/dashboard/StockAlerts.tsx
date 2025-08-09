'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  AlertCircle, 
  ShoppingCart,
  Package,
  TrendingDown,
  Plus
} from 'lucide-react';
import { Product } from '@/types';

interface StockAlert {
  product: Product;
  currentStock: number;
  minimumStock: number;
  severity: 'low' | 'critical' | 'out';
  daysUntilOut?: number;
  suggestedReorder?: number;
}

interface StockAlertsProps {
  alerts: StockAlert[];
  onReorderProduct?: (productId: string, quantity: number) => void;
}

export function StockAlerts({ alerts, onReorderProduct }: StockAlertsProps) {
  const getSeverityIcon = (severity: StockAlert['severity']) => {
    switch (severity) {
      case 'out':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'low':
        return <TrendingDown className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: StockAlert['severity']) => {
    switch (severity) {
      case 'out':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'critical':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityLabel = (severity: StockAlert['severity']) => {
    switch (severity) {
      case 'out':
        return 'Esgotado';
      case 'critical':
        return 'Crítico';
      case 'low':
        return 'Baixo';
      default:
        return 'Normal';
    }
  };

  const getStockPercentage = (current: number, minimum: number) => {
    if (minimum === 0) return current > 0 ? 100 : 0;
    return Math.min((current / minimum) * 100, 100);
  };

  // Agrupar alertas por severidade
  const criticalAlerts = alerts.filter(a => a.severity === 'out' || a.severity === 'critical');
  const lowStockAlerts = alerts.filter(a => a.severity === 'low');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Alertas de Estoque</span>
            </CardTitle>
            <p className="text-sm text-gray-500">
              {alerts.length} produto(s) precisam de atenção
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {criticalAlerts.length > 0 && (
              <Badge variant="destructive">
                {criticalAlerts.length} urgente(s)
              </Badge>
            )}
            {lowStockAlerts.length > 0 && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                {lowStockAlerts.length} baixo(s)
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Alertas Críticos */}
          {criticalAlerts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-red-700 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Críticos & Esgotados</span>
              </h4>
              
              {criticalAlerts.map((alert) => (
                <div 
                  key={alert.product.id}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(alert.severity)}
                      <span className="font-medium text-gray-900">
                        {alert.product.title}
                      </span>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {getSeverityLabel(alert.severity)}
                      </Badge>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-700 border-red-300 hover:bg-red-50"
                      onClick={() => onReorderProduct?.(alert.product.id, alert.suggestedReorder || 50)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Repor
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Estoque atual: <span className="font-medium">{alert.currentStock}</span>
                      </span>
                      <span className="text-gray-600">
                        Mínimo: <span className="font-medium">{alert.minimumStock}</span>
                      </span>
                    </div>
                    
                    <Progress 
                      value={getStockPercentage(alert.currentStock, alert.minimumStock)} 
                      className="h-2"
                    />
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>SKU: {alert.product.sku}</span>
                      {alert.daysUntilOut && (
                        <span className="text-red-600 font-medium">
                          {alert.daysUntilOut} dias até esgotar
                        </span>
                      )}
                      {alert.suggestedReorder && (
                        <span>Sugestão: {alert.suggestedReorder} unidades</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Alertas de Estoque Baixo */}
          {lowStockAlerts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-yellow-700 flex items-center space-x-2">
                <TrendingDown className="h-4 w-4" />
                <span>Estoque Baixo</span>
              </h4>
              
              {lowStockAlerts.map((alert) => (
                <div 
                  key={alert.product.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(alert.severity)}
                      <span className="font-medium text-gray-900">
                        {alert.product.title}
                      </span>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {getSeverityLabel(alert.severity)}
                      </Badge>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                      onClick={() => onReorderProduct?.(alert.product.id, alert.suggestedReorder || 30)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Repor
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Estoque: <span className="font-medium">{alert.currentStock}</span>
                      </span>
                      <span className="text-gray-600">
                        Mínimo: <span className="font-medium">{alert.minimumStock}</span>
                      </span>
                    </div>
                    
                    <Progress 
                      value={getStockPercentage(alert.currentStock, alert.minimumStock)} 
                      className="h-2"
                    />
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>SKU: {alert.product.sku}</span>
                      {alert.daysUntilOut && (
                        <span>{alert.daysUntilOut} dias de estoque</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Estado Vazio */}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="font-medium">Tudo sob controle!</p>
              <p className="text-sm">Nenhum alerta de estoque no momento</p>
            </div>
          )}

          {/* Ações Gerais */}
          {alerts.length > 0 && (
            <div className="pt-4 border-t space-y-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href="/relatorios">
                  <Package className="h-4 w-4 mr-2" />
                  Ver Relatório Detalhado
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

