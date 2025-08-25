import { 
  Product, 
  Category, 
  Sale, 
  UserEvent, 
  DashboardMetrics, 
  SearchSuggestion,
  ApiResponse,
  PaginatedResponse,
  ProductFilter
} from '../../types';

// Configuração da API
const API_BASE = '/api';

// Utility function para simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility function para fazer requests
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  // Simular delay de rede em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    await delay(Math.random() * 500 + 200);
  }

  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Products API
export const productsAPI = {
  getAll: async (filter?: ProductFilter): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();
    if (filter?.query) params.append('query', filter.query);
    if (filter?.category) params.append('category', filter.category);
    if (filter?.minPrice) params.append('minPrice', filter.minPrice.toString());
    if (filter?.maxPrice) params.append('maxPrice', filter.maxPrice.toString());
    if (filter?.inStock !== undefined) params.append('inStock', filter.inStock.toString());
    if (filter?.sortBy) params.append('sortBy', filter.sortBy);
    if (filter?.sortOrder) params.append('sortOrder', filter.sortOrder);
    
    const query = params.toString();
    return apiRequest<PaginatedResponse<Product>>(`/products${query ? `?${query}` : ''}`);
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>(`/products/${id}`);
  },

  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  update: async (id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<ApiResponse<void>>(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  getLowStock: async (threshold: number = 10): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>(`/products/low-stock?threshold=${threshold}`);
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    return apiRequest<ApiResponse<Category[]>>('/categories');
  },

  create: async (category: Omit<Category, 'id' | 'createdAt'>): Promise<ApiResponse<Category>> => {
    return apiRequest<ApiResponse<Category>>('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }
};

// Sales API
export const salesAPI = {
  getAll: async (limit?: number): Promise<ApiResponse<Sale[]>> => {
    const query = limit ? `?limit=${limit}` : '';
    return apiRequest<ApiResponse<Sale[]>>(`/sales${query}`);
  },

  create: async (sale: Omit<Sale, 'id' | 'timestamp'>): Promise<ApiResponse<Sale>> => {
    return apiRequest<ApiResponse<Sale>>('/sales', {
      method: 'POST',
      body: JSON.stringify(sale),
    });
  },

  getByPeriod: async (startDate: string, endDate: string): Promise<ApiResponse<Sale[]>> => {
    return apiRequest<ApiResponse<Sale[]>>(`/sales/period?start=${startDate}&end=${endDate}`);
  }
};

// Reports API
export const reportsAPI = {
  getDashboardMetrics: async (): Promise<ApiResponse<DashboardMetrics>> => {
    return apiRequest<ApiResponse<DashboardMetrics>>('/reports/dashboard');
  },

  getRevenueChart: async (period: 'week' | 'month' | 'year'): Promise<ApiResponse<unknown[]>> => {
    return apiRequest<ApiResponse<unknown[]>>(`/reports/revenue-chart?period=${period}`);
  },

  getTopProducts: async (limit: number = 10): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>(`/reports/top-products?limit=${limit}`);
  }
};

// Search API
export const searchAPI = {
  getSuggestions: async (query: string, limit: number = 8): Promise<SearchSuggestion[]> => {
    const response = await apiRequest<ApiResponse<SearchSuggestion[]>>(
      `/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    return response.data;
  },

  predictiveSearch: async (query: string, userId: string): Promise<SearchSuggestion[]> => {
    const response = await apiRequest<ApiResponse<SearchSuggestion[]>>(
      `/search/predictive?q=${encodeURIComponent(query)}&userId=${userId}`
    );
    return response.data;
  }
};

// Events API
export const eventsAPI = {
  create: async (event: Omit<UserEvent, 'id' | 'timestamp'>): Promise<ApiResponse<UserEvent>> => {
    return apiRequest<ApiResponse<UserEvent>>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }
};


