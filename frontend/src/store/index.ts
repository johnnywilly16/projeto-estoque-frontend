import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  Product, Sale, Category, DashboardMetrics, UserEvent, SearchSuggestion, Client, Schedule,
  ServiceType, ServiceOrder, ServicePart, Technician, FinancialMetrics, ServiceMetrics,
  CustomerMetrics, Alert
} from '../types';

interface InventoryStore {
  // Estado - Vendas e Produtos
  products: Product[];
  categories: Category[];
  sales: Sale[];
  events: UserEvent[];
  clients: Client[];
  schedules: Schedule[];
  
  // Estado - Manutenções
  serviceTypes: ServiceType[];
  serviceOrders: ServiceOrder[];
  serviceParts: ServicePart[];
  technicians: Technician[];
  
  // Estado - Métricas e Analytics
  metrics: DashboardMetrics | null;
  financialMetrics: FinancialMetrics | null;
  serviceMetrics: ServiceMetrics | null;
  customerMetrics: CustomerMetrics | null;
  
  // Estado - Sistema
  alerts: Alert[];

  searchSuggestions: SearchSuggestion[];
  loading: boolean;
  error: string | null;

  // Ações para produtos
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Ações para categorias
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  
  // Ações para vendas
  setSales: (sales: Sale[]) => void;
  addSale: (sale: Sale) => void;
  
  // Ações para métricas
  setMetrics: (metrics: DashboardMetrics) => void;
  recalcFinancialAndServiceMetrics: () => void;
  
  // Ações para eventos
  addEvent: (event: UserEvent) => void;
  
  // Ações para clientes
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Ações para agendamentos
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, updates: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  
  // Ações para tipos de serviço
  setServiceTypes: (serviceTypes: ServiceType[]) => void;
  addServiceType: (serviceType: ServiceType) => void;
  updateServiceType: (id: string, updates: Partial<ServiceType>) => void;
  deleteServiceType: (id: string) => void;
  
  // Ações para ordens de serviço
  setServiceOrders: (serviceOrders: ServiceOrder[]) => void;
  addServiceOrder: (serviceOrder: ServiceOrder) => void;
  updateServiceOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  deleteServiceOrder: (id: string) => void;
  
  // Ações para peças de serviço
  setServiceParts: (serviceParts: ServicePart[]) => void;
  addServicePart: (servicePart: ServicePart) => void;
  updateServicePart: (id: string, updates: Partial<ServicePart>) => void;
  deleteServicePart: (id: string) => void;
  
  // Ações para técnicos
  setTechnicians: (technicians: Technician[]) => void;
  addTechnician: (technician: Technician) => void;
  updateTechnician: (id: string, updates: Partial<Technician>) => void;
  deleteTechnician: (id: string) => void;
  
  // Ações para métricas
  setFinancialMetrics: (metrics: FinancialMetrics) => void;
  setServiceMetrics: (metrics: ServiceMetrics) => void;
  setCustomerMetrics: (metrics: CustomerMetrics) => void;
  
  // Ações para alertas
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  markAlertAsRead: (id: string) => void;
  deleteAlert: (id: string) => void;
  regenerateStockAlerts: () => void;
  
  
  // Ações para busca
  setSearchSuggestions: (suggestions: SearchSuggestion[]) => void;
  
  // Ações de controle
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Seletores calculados
  getLowStockProducts: () => Product[];
  getTopSellingProducts: (limit?: number) => Product[];
  getTotalRevenue: () => number;
  getRevenueByPeriod: (days: number) => number;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
  // Estado inicial - Vendas e Produtos
  products: [],
  categories: [],
  sales: [],
  events: [],
  clients: [],
  schedules: [],
  
  // Estado inicial - Manutenções
  serviceTypes: [],
  serviceOrders: [],
  serviceParts: [],
  technicians: [],
  
  // Estado inicial - Métricas e Analytics
  metrics: null,
  financialMetrics: null,
  serviceMetrics: null,
  customerMetrics: null,
  
  // Estado inicial - Sistema
  alerts: [],

  searchSuggestions: [],
  loading: false,
  error: null,

  // Implementação das ações
  setProducts: (products) => {
    set({ products });
    get().regenerateStockAlerts();
  },
  
  addProduct: (product) => set((state) => {
    const products = [...state.products, product];
    const next = { products } as Partial<InventoryStore>;
    set(next);
    get().regenerateStockAlerts();
    return next as Partial<InventoryStore>;
  }),
  
  updateProduct: (id, updates) => set((state) => {
    const products = state.products.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    const next = { products } as Partial<InventoryStore>;
    set(next);
    get().regenerateStockAlerts();
    return next as Partial<InventoryStore>;
  }),
  
  deleteProduct: (id) => set((state) => {
    const products = state.products.filter(p => p.id !== id);
    const next = { products } as Partial<InventoryStore>;
    set(next);
    get().regenerateStockAlerts();
    return next as Partial<InventoryStore>;
  }),
  
  setCategories: (categories) => set({ categories }),
  
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category]
  })),
  
  setSales: (sales) => set({ sales }),
  
  addSale: (sale) => set((state) => {
    // Atualizar estoque do produto
    const updatedProducts = state.products.map(p => 
      p.id === sale.productId 
        ? { ...p, stock: Math.max(0, p.stock - sale.qty) }
        : p
    );
    const next: Partial<InventoryStore> = {
      sales: [...state.sales, sale],
      products: updatedProducts
    };
    set(next);
    get().regenerateStockAlerts();
    get().recalcFinancialAndServiceMetrics();
    return next;
  }),
  
  setMetrics: (metrics) => set({ metrics }),

  recalcFinancialAndServiceMetrics: () => {
    const { sales, serviceOrders, products, metrics } = get();
    const salesRevenue = sales.reduce((total, s) => total + (s.qty * s.unitPrice), 0);
    const completedStatuses: ServiceOrder['status'][] = ['completed', 'delivered'];
    const serviceRevenue = serviceOrders
      .filter(so => completedStatuses.includes(so.status))
      .reduce((sum, so) => sum + (so.finalPrice ?? so.totalCost ?? 0), 0);
    const totalRevenue = salesRevenue + serviceRevenue;

    const updatedMetrics: DashboardMetrics = {
      totalRevenue,
      totalSales: metrics?.totalSales ?? sales.reduce((sum, s) => sum + s.qty, 0),
      totalProducts: metrics?.totalProducts ?? products.length,
      activeProducts: metrics?.activeProducts ?? products.filter(p => p.stock > 0).length,
      lowStockProducts: metrics?.lowStockProducts ?? products.filter(p => p.stock <= 10).length,
      revenueGrowth: metrics?.revenueGrowth ?? 0,
      salesGrowth: metrics?.salesGrowth ?? 0,
      profitMargin: metrics?.profitMargin ?? 0,
    };

    const financialMetrics: FinancialMetrics = {
      period: 'atual',
      salesRevenue,
      serviceRevenue,
      totalRevenue,
      productCosts: 0,
      partsCosts: 0,
      laborCosts: 0,
      totalCosts: 0,
      grossProfit: totalRevenue,
      netProfit: totalRevenue,
      profitMargin: updatedMetrics.profitMargin,
      salesCount: sales.length,
      serviceCount: serviceOrders.length,
      avgTicketSales: sales.length ? salesRevenue / sales.length : 0,
      avgTicketService: serviceOrders.length ? serviceRevenue / serviceOrders.length : 0,
    };

    const serviceMetrics: ServiceMetrics = {
      period: 'atual',
      totalServices: serviceOrders.length,
      completedServices: serviceOrders.filter(so => completedStatuses.includes(so.status)).length,
      cancelledServices: serviceOrders.filter(so => so.status === 'cancelled').length,
      avgCompletionTime: 0,
      avgCustomerRating: 0,
      mostCommonIssues: [],
      mostProfitableServices: [],
      technicianPerformance: [],
    };

    set({ metrics: updatedMetrics, financialMetrics, serviceMetrics });
  },
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, event]
  })),
  
  // Implementação das ações para clientes
  setClients: (clients) => set({ clients }),
  
  addClient: (client) => set((state) => ({
    clients: [...state.clients, client]
  })),
  
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    )
  })),
  
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(c => c.id !== id)
  })),
  
  // Implementação das ações para agendamentos
  setSchedules: (schedules) => set({ schedules }),
  
  addSchedule: (schedule) => set((state) => ({
    schedules: [...state.schedules, schedule]
  })),
  
  updateSchedule: (id, updates) => set((state) => ({
    schedules: state.schedules.map(s => 
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    )
  })),
  
  deleteSchedule: (id) => set((state) => ({
    schedules: state.schedules.filter(s => s.id !== id)
  })),
  
  // Implementação das ações para tipos de serviço
  setServiceTypes: (serviceTypes) => set({ serviceTypes }),
  
  addServiceType: (serviceType) => set((state) => ({
    serviceTypes: [...state.serviceTypes, serviceType]
  })),
  
  updateServiceType: (id, updates) => set((state) => ({
    serviceTypes: state.serviceTypes.map(st => 
      st.id === id ? { ...st, ...updates, updatedAt: new Date().toISOString() } : st
    )
  })),
  
  deleteServiceType: (id) => set((state) => ({
    serviceTypes: state.serviceTypes.filter(st => st.id !== id)
  })),
  
  // Implementação das ações para ordens de serviço
  setServiceOrders: (serviceOrders) => set({ serviceOrders }),
  
  addServiceOrder: (serviceOrder) => set((state) => {
    const next = { serviceOrders: [...state.serviceOrders, serviceOrder] } as Partial<InventoryStore>;
    set(next);
    get().recalcFinancialAndServiceMetrics();
    return next;
  }),
  
  updateServiceOrder: (id, updates) => set((state) => {
    const serviceOrders = state.serviceOrders.map(so => 
      so.id === id ? { ...so, ...updates, updatedAt: new Date().toISOString() } : so
    );
    const next = { serviceOrders } as Partial<InventoryStore>;
    set(next);
    get().recalcFinancialAndServiceMetrics();
    return next;
  }),
  
  deleteServiceOrder: (id) => set((state) => {
    const next = { serviceOrders: state.serviceOrders.filter(so => so.id !== id) } as Partial<InventoryStore>;
    set(next);
    get().recalcFinancialAndServiceMetrics();
    return next;
  }),
  
  // Implementação das ações para peças de serviço
  setServiceParts: (serviceParts) => set({ serviceParts }),
  
  addServicePart: (servicePart) => set((state) => ({
    serviceParts: [...state.serviceParts, servicePart]
  })),
  
  updateServicePart: (id, updates) => set((state) => ({
    serviceParts: state.serviceParts.map(sp => 
      sp.id === id ? { ...sp, ...updates, updatedAt: new Date().toISOString() } : sp
    )
  })),
  
  deleteServicePart: (id) => set((state) => ({
    serviceParts: state.serviceParts.filter(sp => sp.id !== id)
  })),
  
  // Implementação das ações para técnicos
  setTechnicians: (technicians) => set({ technicians }),
  
  addTechnician: (technician) => set((state) => ({
    technicians: [...state.technicians, technician]
  })),
  
  updateTechnician: (id, updates) => set((state) => ({
    technicians: state.technicians.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    )
  })),
  
  deleteTechnician: (id) => set((state) => ({
    technicians: state.technicians.filter(t => t.id !== id)
  })),
  
  // Implementação das ações para métricas
  setFinancialMetrics: (financialMetrics) => set({ financialMetrics }),
  setServiceMetrics: (serviceMetrics) => set({ serviceMetrics }),
  setCustomerMetrics: (customerMetrics) => set({ customerMetrics }),
  
  // Implementação das ações para alertas
  setAlerts: (alerts) => set({ alerts }),
  
  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, alert]
  })),
  
  markAlertAsRead: (id) => set((state) => ({
    alerts: state.alerts.map(a => 
      a.id === id ? { ...a, isRead: true } : a
    )
  })),
  
  deleteAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== id)
  })),

  regenerateStockAlerts: () => {
    const { products, alerts } = get();
    const otherAlerts = alerts.filter(a => a.type !== 'stock');
    const stockAlerts: Alert[] = products.map((p) => {
      let category: Alert['category'] | null = null;
      if (p.stock === 0) category = 'critical';
      else if (p.stock <= 10) category = 'warning';
      else category = null;
      if (!category) return null as unknown as Alert;
      return {
        id: `alert-stock-${p.id}`,
        type: 'stock',
        category,
        title: category === 'critical' ? 'Produto esgotado' : 'Estoque baixo',
        message: `${p.title} — estoque atual ${p.stock}`,
        actionRequired: true,
        actionUrl: '/produtos',
        isRead: false,
        createdAt: new Date().toISOString(),
      } as Alert;
    }).filter((x): x is Alert => Boolean(x));
    set({ alerts: [...otherAlerts, ...stockAlerts] });
  },
  
  
  setSearchSuggestions: (suggestions) => set({ searchSuggestions: suggestions }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Seletores calculados
  getLowStockProducts: () => {
    const { products } = get();
    return products.filter(p => p.stock <= 10); // Considerar estoque baixo <= 10
  },
  
  getTopSellingProducts: (limit = 10) => {
    const { products, sales } = get();
    
    // Calcular vendas por produto
    const salesByProduct = sales.reduce((acc, sale) => {
      acc[sale.productId] = (acc[sale.productId] || 0) + sale.qty;
      return acc;
    }, {} as Record<string, number>);
    
    // Ordenar produtos por vendas
    return products
      .map(product => ({
        ...product,
        totalSold: salesByProduct[product.id] || 0
      }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, limit);
  },
  
  getTotalRevenue: () => {
    const { sales } = get();
    return sales.reduce((total, sale) => total + (sale.qty * sale.unitPrice), 0);
  },
  
  getRevenueByPeriod: (days) => {
    const { sales } = get();
    const now = new Date();
    const periodStart = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return sales
      .filter(sale => new Date(sale.timestamp) >= periodStart)
      .reduce((total, sale) => total + (sale.qty * sale.unitPrice), 0);
  }
    }),
    {
      name: 'inventory-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        sales: state.sales,
        events: state.events,
        clients: state.clients,
        schedules: state.schedules,
        alerts: state.alerts,
        metrics: state.metrics,
        financialMetrics: state.financialMetrics,
        serviceMetrics: state.serviceMetrics,
        customerMetrics: state.customerMetrics,
      }),
    }
  )
);
