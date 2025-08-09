'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = 'neutral',
  description,
  className,
  prefix = '',
  suffix = ''
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString('pt-BR');
    }
    return val;
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            'p-2 rounded-lg border',
            getTrendColor()
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {/* Valor Principal */}
          <div className="text-2xl font-bold text-gray-900">
            {prefix}{formatValue(value)}{suffix}
          </div>
          
          {/* Mudança/Tendência */}
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center space-x-2">
              {change !== undefined && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    'flex items-center space-x-1 text-xs',
                    getTrendColor()
                  )}
                >
                  {getTrendIcon()}
                  <span className={getChangeColor()}>
                    {change > 0 && '+'}
                    {change}%
                  </span>
                </Badge>
              )}
              
              {changeLabel && (
                <span className="text-xs text-gray-500">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
          
          {/* Descrição */}
          {description && (
            <p className="text-xs text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      </CardContent>
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
    </Card>
  );
}

