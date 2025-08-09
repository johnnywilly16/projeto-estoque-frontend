'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Settings,
  BarChart3,
  AlertTriangle,
  Zap,
  FileText,
  Wrench,

  Download,
  Target,
  UserCheck,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useInventoryStore } from '@/store';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Produtos',
    href: '/produtos',
    icon: Package,
  },
  {
    title: 'Vendas',
    href: '/vendas',
    icon: ShoppingCart,
  },
  {
    title: 'Clientes',
    href: '/clientes',
    icon: Users,
    badge: 'COMPLETO',
  },
  {
    title: 'Manutenções',
    href: '/manutencoes',
    icon: Wrench,
  },
];

const analyticsNavItems: NavItem[] = [
  {
    title: 'Relatórios',
    href: '/relatorios',
    icon: BarChart3,
    badge: 'COMPLETO',
  },

  {
    title: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
  },
  {
    title: 'Alertas',
    href: '/alertas',
    icon: AlertTriangle,
    badge: 5,
  },
];

const managementNavItems: NavItem[] = [
  {
    title: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { alerts } = useInventoryStore();
  const unreadCount = alerts.filter(a => !a.isRead).length;

  const NavGroup = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
          {title}
        </h2>
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start h-9',
                  isActive && 'bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
                asChild={!item.disabled}
                disabled={item.disabled}
              >
                {item.disabled ? (
                  <div className="flex items-center">
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} className="flex items-center">
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={typeof item.badge === 'string' ? 'default' : 'destructive'} 
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <NavGroup title="Principal" items={mainNavItems} />
        <Separator />
        <NavGroup title="Analytics" items={analyticsNavItems} />
        <Separator />
        <NavGroup title="Gerenciamento" items={managementNavItems} />
      </div>

      {/* Widget do Sistema Japa iPhone */}
      <div className="mx-3 mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Package className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Sistema Japa iPhone</span>
        </div>
        <p className="text-xs text-blue-600 mb-3">
          Sistema completo de gestão de estoque operacional.
        </p>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="font-bold text-green-600">1,247</div>
              <div className="text-green-700">Clientes</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">847</div>
              <div className="text-purple-700">Relatórios</div>
            </div>
          </div>
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/relatorios">
              <BarChart3 className="w-3 h-3 mr-1" />
              Ver Relatórios
            </Link>
          </Button>
        </div>
      </div>

      {/* Widget de Alertas */}
      <div className="mx-3 mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Oportunidades</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-green-700">Vendas VIP:</span>
            <span className="font-medium text-green-800">24 clientes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Reestoque:</span>
            <span className="font-medium text-green-800">R$ 89k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Alertas:</span>
            <span className="font-medium text-orange-600">5 pendentes</span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="w-full mt-3 text-green-700 border-green-300 hover:bg-green-50" asChild>
          <Link href="/alertas">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Ver Alertas
          </Link>
        </Button>
      </div>

      {/* Status do Sistema */}
      <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Sistema:</span>
            <span className="text-green-600 font-medium">Online</span>
          </div>

          <div className="flex justify-between">
            <span>Última Sync:</span>
            <span className="text-gray-700">Agora</span>
          </div>
        </div>
      </div>
    </div>
  );
}
