import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { SearchSuggestion } from '../types';
import { searchAPI } from '../lib/api';
import { useInventoryStore } from '../store';

interface UseAutocompleteOptions {
  minLength?: number;
  debounceMs?: number;
  maxSuggestions?: number;
}

export function useAutocomplete(options: UseAutocompleteOptions = {}) {
  const {
    minLength = 2,
    debounceMs = 300,
    maxSuggestions = 8
  } = options;

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const debouncedQuery = useDebounce(query, debounceMs);
  const { addEvent } = useInventoryStore();

  // Função para buscar sugestões
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minLength) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    try {
      // Registrar evento de busca
      addEvent({
        id: crypto.randomUUID(),
        userId: 'user-1', // Em um app real, pegar do contexto de auth
        type: 'search',
        meta: { query: searchQuery },
        timestamp: new Date().toISOString()
      });

      const response = await searchAPI.getSuggestions(searchQuery, maxSuggestions);
      setSuggestions(response);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [minLength, maxSuggestions, addEvent]);

  // Executar busca quando query debounced mudar
  useEffect(() => {
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  // Função para selecionar uma sugestão
  const selectSuggestion = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    
    // Registrar evento de clique
    addEvent({
      id: crypto.randomUUID(),
      userId: 'user-1',
      type: 'click',
      meta: { 
        suggestionId: suggestion.id,
        suggestionType: suggestion.type,
        query: debouncedQuery 
      },
      timestamp: new Date().toISOString()
    });
  }, [addEvent, debouncedQuery]);

  // Função para limpar sugestões
  const clearSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    isLoading,
    selectSuggestion,
    clearSuggestions
  };
}

