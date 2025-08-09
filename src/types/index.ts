// Tipos principais do sistema de estoque

export interface Product {
  id: string;
  sku: string;
  title: string;
  categoryId: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  qty: number;
  unitPrice: number;
  timestamp: string;
  customerId?: string;
  customerName?: string;
  paymentMethod: 'pix' | 'cash' | 'debit' | 'credit';
  paymentStatus: 'pending' | 'completed' | 'failed';
  discount?: number;
  notes?: string;
}

export interface UserEvent {
  id: string;
  userId: string;
  type: 'search' | 'click' | 'purchase' | 'update' | 'view';
  meta: Record<string, unknown>;
  timestamp: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalSales: number;
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  revenueGrowth: number;
  salesGrowth: number;
  profitMargin: number;
}

export interface ChartData {
  date: string;
  revenue: number;
  sales: number;
  profit: number;
}

export interface TopSellingProduct {
  product: Product;
  totalSold: number;
  revenue: number;
}

export interface StockAlert {
  product: Product;
  currentStock: number;
  minimumStock: number;
  severity: 'low' | 'critical' | 'out';
}

export interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'sku';
  title: string;
  subtitle?: string;
  score: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  query?: string;
  sortBy?: 'title' | 'price' | 'stock' | 'created';
  sortOrder?: 'asc' | 'desc';
}

export interface MLPrediction {
  productId: string;
  probability: number;
  reason: string;
}

export interface RecommendationResult {
  type: 'restock' | 'promotion' | 'bundle' | 'new_product';
  title: string;
  description: string;
  products: Product[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: number;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  document?: string; // CPF/CNPJ
  address?: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tags: string[];
  totalPurchases: number;
  lastPurchase?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  clientId: string;
  type: 'delivery' | 'pickup' | 'service';
  title: string;
  description?: string;
  scheduledDate: string;
  duration: number; // minutes
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  products?: { productId: string; qty: number }[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TensorFlowModel {
  id: string;
  name: string;
  type: 'recommendation' | 'prediction' | 'classification';
  version: string;
  accuracy?: number;
  lastTrained: string;
  status: 'training' | 'ready' | 'error';
}

export interface MLPrediction {
  productId: string;
  probability: number;
  confidence: number;
  timeframe: 'week' | 'month' | 'quarter';
  factors: string[];
  estimatedSales: number;
}

// Sistema de Manutenções/Assistência Técnica
export interface ServiceType {
  id: string;
  name: string;
  category: 'screen' | 'battery' | 'board' | 'unlock' | 'cleaning' | 'other';
  basePrice: number;
  estimatedTime: number; // em minutos
  description: string;
  warranty: number; // dias
  isActive: boolean;
  skillLevel: 'basic' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  deviceType: string;
  deviceModel: string;
  deviceImei?: string;
  problemDescription: string;
  initialDiagnosis?: string;
  serviceTypes: string[]; // IDs dos tipos de serviço
  status: 'pending_approval' | 'approved' | 'in_progress' | 'waiting_parts' | 'testing' | 'completed' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  // Orçamento
  partsCost: number;
  laborCost: number;
  totalCost: number;
  discount: number;
  finalPrice: number;
  
  // Controle
  technicianId?: string;
  startDate?: string;
  estimatedDelivery?: string;
  completedDate?: string;
  deliveredDate?: string;
  
  // Garantia
  warrantyDays: number;
  warrantyExpires?: string;
  
  // Pagamento
  paymentMethod?: 'pix' | 'cash' | 'debit' | 'credit';
  paymentStatus: 'pending' | 'partial' | 'completed';
  paidAmount: number;
  
  // Observações
  internalNotes?: string;
  customerNotes?: string;
  partsUsed: ServicePart[];
  
  createdAt: string;
  updatedAt: string;
}

export interface ServicePart {
  id: string;
  name: string;
  category: 'screen' | 'battery' | 'connector' | 'speaker' | 'camera' | 'other';
  compatibleDevices: string[];
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  supplier?: string;
  partNumber?: string;
  warranty: number; // dias
  location?: string; // localização no estoque
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email?: string;
  phone: string;
  specialties: string[]; // IDs dos tipos de serviço que domina
  skillLevel: 'junior' | 'pleno' | 'senior';
  hourlyRate: number;
  isActive: boolean;
  totalServices: number;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
}

// Relatórios e Analytics
export interface FinancialMetrics {
  period: string;
  salesRevenue: number;
  serviceRevenue: number;
  totalRevenue: number;
  productCosts: number;
  partsCosts: number;
  laborCosts: number;
  totalCosts: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  salesCount: number;
  serviceCount: number;
  avgTicketSales: number;
  avgTicketService: number;
}

export interface ServiceMetrics {
  period: string;
  totalServices: number;
  completedServices: number;
  cancelledServices: number;
  avgCompletionTime: number;
  avgCustomerRating: number;
  mostCommonIssues: { issue: string; count: number }[];
  mostProfitableServices: { serviceType: string; profit: number }[];
  technicianPerformance: { technicianId: string; completedServices: number; avgRating: number }[];
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerRetentionRate: number;
  avgCustomerValue: number;
  topCustomers: { clientId: string; totalValue: number }[];
  customerSatisfaction: number;
  npsScore: number;
}

export interface Alert {
  id: string;
  type: 'stock' | 'service' | 'financial' | 'customer';
  category: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  actionRequired: boolean;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
}

// IA e Recomendações Avançadas
export interface AIRecommendation {
  id: string;
  type: 'inventory' | 'pricing' | 'service' | 'marketing' | 'operational';
  category: 'critical' | 'important' | 'suggestion';
  title: string;
  description: string;
  reasoning: string[];
  expectedImpact: string;
  confidence: number;
  estimatedROI?: number;
  actionSteps: string[];
  dataPoints: { label: string; value: string | number }[];
  isImplemented: boolean;
  createdAt: string;
  validUntil?: string;
}
