'use client';

import React from 'react';
import { Search, Bell, User, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { useInventoryStore } from '@/store';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    isLoading,
    selectSuggestion,
    clearSuggestions
  } = useAutocomplete();

  const { alerts, deleteAlert, markAlertAsRead } = useInventoryStore();
  const unreadAlerts = alerts.filter(a => !a.isRead);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch?.(searchQuery);
    clearSuggestions();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo e Título */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Japa iPhone</h1>
          </div>
        </div>

        {/* Barra de Busca Central */}
        <div className="flex-1 max-w-md mx-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar produtos, SKU ou categoria..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 w-full"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {/* Sugestões de Autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => {
                    selectSuggestion(suggestion);
                    handleSearch(suggestion.title);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {suggestion.type === 'product' && <Package className="h-4 w-4 text-blue-500" />}
                    {suggestion.type === 'category' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {suggestion.type === 'sku' && <Badge variant="outline" className="text-xs px-1 py-0">SKU</Badge>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{suggestion.title}</div>
                    {suggestion.subtitle && (
                      <div className="text-sm text-gray-500 truncate">{suggestion.subtitle}</div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400">
                    {Math.round(suggestion.score * 100)}%
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu do Usuário */}
        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadAlerts.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {unreadAlerts.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 text-sm font-medium">Notificações</div>
              <DropdownMenuSeparator />
              {alerts.length === 0 && (
                <div className="px-3 py-6 text-sm text-gray-500">Nenhuma notificação</div>
              )}
              {alerts.map((a) => (
                <div key={a.id} className="px-3 py-2 text-sm flex items-start gap-2">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${a.category === 'critical' ? 'text-red-600' : a.category === 'warning' ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{a.title}</div>
                    <div className="text-gray-600 truncate text-xs">{a.message}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-red-600" onClick={() => deleteAlert(a.id)}>Excluir</Button>
                  </div>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu do Usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">John Demo</p>
                <p className="text-xs leading-none text-muted-foreground">
                  demo@gmail.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

