import { Product, Category, Sale, UserEvent, ServiceType, ServiceOrder, ServicePart, Technician, Alert, AIRecommendation, Client } from '@/types';

// Categorias mock
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Smartphones',
    parentId: null,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-2',
    name: 'iPhone',
    parentId: 'cat-1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-3',
    name: 'Samsung',
    parentId: 'cat-1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-4',
    name: 'Acessórios',
    parentId: null,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-5',
    name: 'Capas',
    parentId: 'cat-4',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Produtos mock
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    sku: 'IP15-128-BLK',
    title: 'iPhone 15 128GB Preto',
    categoryId: 'cat-2',
    costPrice: 3500,
    salePrice: 4200,
    stock: 25,
    images: ['/placeholder-iphone.jpg'],
    attributes: {
      color: 'Preto',
      storage: '128GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prod-2',
    sku: 'IP15-256-BLU',
    title: 'iPhone 15 256GB Azul',
    categoryId: 'cat-2',
    costPrice: 3800,
    salePrice: 4500,
    stock: 15,
    images: ['/placeholder-iphone.jpg'],
    attributes: {
      color: 'Azul',
      storage: '256GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prod-3',
    sku: 'IP14-128-WHT',
    title: 'iPhone 14 128GB Branco',
    categoryId: 'cat-2',
    costPrice: 2800,
    salePrice: 3300,
    stock: 8,
    images: ['/placeholder-iphone.jpg'],
    attributes: {
      color: 'Branco',
      storage: '128GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'prod-4',
    sku: 'SAM-S24-BLK',
    title: 'Samsung Galaxy S24 256GB Preto',
    categoryId: 'cat-3',
    costPrice: 3200,
    salePrice: 3800,
    stock: 12,
    images: ['/placeholder-samsung.jpg'],
    attributes: {
      color: 'Preto',
      storage: '256GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'prod-5',
    sku: 'IP15-CASE-BLK',
    title: 'Capa iPhone 15 Silicone Preta',
    categoryId: 'cat-5',
    costPrice: 25,
    salePrice: 49,
    stock: 3,
    images: ['/placeholder-case.jpg'],
    attributes: {
      color: 'Preto',
      material: 'Silicone',
      compatibility: 'iPhone 15'
    },
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: 'prod-6',
    sku: 'IP13-128-GRN',
    title: 'iPhone 13 128GB Verde',
    categoryId: 'cat-2',
    costPrice: 2200,
    salePrice: 2600,
    stock: 18,
    images: ['/placeholder-iphone.jpg'],
    attributes: {
      color: 'Verde',
      storage: '128GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'prod-7',
    sku: 'IP15-PRO-TIT',
    title: 'iPhone 15 Pro 256GB Titânio Natural',
    categoryId: 'cat-2',
    costPrice: 4800,
    salePrice: 5500,
    stock: 6,
    images: ['/placeholder-iphone.jpg'],
    attributes: {
      color: 'Titânio Natural',
      storage: '256GB',
      condition: 'Novo'
    },
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'prod-8',
    sku: 'SAM-A54-BLU',
    title: 'Samsung Galaxy A54 128GB Azul',
    categoryId: 'cat-3',
    costPrice: 1200,
    salePrice: 1450,
    stock: 22,
    images: ['/placeholder-samsung.jpg'],
    attributes: {
      color: 'Azul',
      storage: '128GB',
      condition: 'Novo'
    },
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  }
];

// Vendas mock
export const mockSales: Sale[] = [
  {
    id: 'sale-1',
    productId: 'prod-1',
    qty: 1,
    unitPrice: 4200,
    timestamp: '2024-02-08T10:30:00Z',
    customerName: 'João Silva',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-2',
    productId: 'prod-3',
    qty: 2,
    unitPrice: 3300,
    timestamp: '2024-02-08T14:15:00Z',
    customerName: 'Maria Santos',
    paymentMethod: 'credit',
    paymentStatus: 'completed',
    discount: 5
  },
  {
    id: 'sale-3',
    productId: 'prod-2',
    qty: 1,
    unitPrice: 4500,
    timestamp: '2024-02-07T16:45:00Z',
    customerName: 'Carlos Oliveira',
    paymentMethod: 'debit',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-4',
    productId: 'prod-5',
    qty: 3,
    unitPrice: 49,
    timestamp: '2024-02-07T11:20:00Z',
    customerName: 'Ana Costa',
    paymentMethod: 'cash',
    paymentStatus: 'completed',
    discount: 10
  },
  {
    id: 'sale-5',
    productId: 'prod-1',
    qty: 1,
    unitPrice: 4200,
    timestamp: '2024-02-06T09:00:00Z',
    customerName: 'Pedro Alves',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-6',
    productId: 'prod-4',
    qty: 1,
    unitPrice: 3800,
    timestamp: '2024-02-06T15:30:00Z',
    customerName: 'Lucia Ferreira',
    paymentMethod: 'credit',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-7',
    productId: 'prod-6',
    qty: 1,
    unitPrice: 2600,
    timestamp: '2024-02-05T13:45:00Z',
    customerName: 'Roberto Lima',
    paymentMethod: 'debit',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-8',
    productId: 'prod-1',
    qty: 2,
    unitPrice: 4200,
    timestamp: '2024-02-05T17:10:00Z',
    customerName: 'Fernanda Rocha',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    discount: 3
  },
  {
    id: 'sale-9',
    productId: 'prod-7',
    qty: 1,
    unitPrice: 5500,
    timestamp: '2024-02-08T09:15:00Z',
    customerName: 'Ricardo Santos',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    discount: 0
  },
  {
    id: 'sale-10',
    productId: 'prod-8',
    qty: 1,
    unitPrice: 1450,
    timestamp: '2024-02-08T11:45:00Z',
    customerName: 'Camila Silva',
    paymentMethod: 'cash',
    paymentStatus: 'completed',
    discount: 0
  }
];

// Eventos de usuário mock
export const mockEvents: UserEvent[] = [
  {
    id: 'event-1',
    userId: 'user-1',
    type: 'search',
    meta: { query: 'iPhone 15' },
    timestamp: '2024-02-08T10:25:00Z'
  },
  {
    id: 'event-2',
    userId: 'user-1',
    type: 'click',
    meta: { productId: 'prod-1' },
    timestamp: '2024-02-08T10:28:00Z'
  },
  {
    id: 'event-3',
    userId: 'user-1',
    type: 'purchase',
    meta: { saleId: 'sale-1' },
    timestamp: '2024-02-08T10:30:00Z'
  },
  {
    id: 'event-4',
    userId: 'user-2',
    type: 'search',
    meta: { query: 'Samsung' },
    timestamp: '2024-02-08T11:00:00Z'
  },
  {
    id: 'event-5',
    userId: 'user-2',
    type: 'view',
    meta: { productId: 'prod-4' },
    timestamp: '2024-02-08T11:05:00Z'
  }
];

// Função helper para gerar dados aleatórios para desenvolvimento
export function generateRandomData() {
  const colors = ['Preto', 'Branco', 'Azul', 'Verde', 'Rosa', 'Roxo'];
  const storages = ['64GB', '128GB', 256, '512GB', '1TB'];
  const brands = ['iPhone', 'Samsung', 'Xiaomi', 'Motorola'];
  
  // Gerar mais produtos para demonstração
  const additionalProducts: Product[] = [];
  
  for (let i = 9; i <= 20; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const storage = storages[Math.floor(Math.random() * storages.length)];
    const price = Math.floor(Math.random() * 3000) + 1000;
    
    additionalProducts.push({
      id: `prod-${i}`,
      sku: `${brand.substring(0, 3).toUpperCase()}-${i}`,
      title: `${brand} ${storage} ${color}`,
      categoryId: brand.includes('iPhone') ? 'cat-2' : 'cat-3',
      costPrice: price * 0.7,
      salePrice: price,
      stock: Math.floor(Math.random() * 50) + 1,
      images: [`/placeholder-${brand.toLowerCase()}.jpg`],
      attributes: {
        color,
        storage: storage.toString(),
        condition: 'Novo'
      },
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return {
    products: [...mockProducts, ...additionalProducts],
    categories: mockCategories,
    sales: mockSales,
    events: mockEvents
  };
}

// Clientes mock completos com histórico
export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-1111',
    document: '123.456.789-01',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    tags: ['VIP', 'Fidelizado'],
    totalPurchases: 3840.50,
    lastPurchase: '2024-02-08T10:30:00Z',
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2024-02-08T10:30:00Z'
  },
  {
    id: 'client-2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 98888-2222',
    document: '987.654.321-09',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    tags: ['Frequente'],
    totalPurchases: 2100.00,
    lastPurchase: '2024-02-07T15:45:00Z',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-02-07T15:45:00Z'
  },
  {
    id: 'client-3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '(11) 97777-3333',
    document: '456.789.123-45',
    address: {
      street: 'Rua Augusta',
      number: '567',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000'
    },
    tags: ['Novo'],
    totalPurchases: 890.00,
    lastPurchase: '2024-02-06T14:20:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-06T14:20:00Z'
  },
  {
    id: 'client-4',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    phone: '(11) 96666-4444',
    document: '321.654.987-12',
    address: {
      street: 'Rua Oscar Freire',
      number: '888',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    tags: ['VIP', 'Empresarial'],
    totalPurchases: 5670.25,
    lastPurchase: '2024-02-05T16:10:00Z',
    createdAt: '2023-05-10T00:00:00Z',
    updatedAt: '2024-02-05T16:10:00Z'
  },
  {
    id: 'client-5',
    name: 'Carlos Roberto',
    email: 'carlos.roberto@email.com',
    phone: '(11) 95555-5555',
    document: '789.123.456-78',
    address: {
      street: 'Rua 25 de Março',
      number: '150',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01021-000'
    },
    tags: ['Atacado', 'Revenda'],
    totalPurchases: 12540.80,
    lastPurchase: '2024-02-04T11:00:00Z',
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2024-02-04T11:00:00Z'
  },
  {
    id: 'client-6',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 94444-6666',
    document: '147.258.369-96',
    address: {
      street: 'Av. Faria Lima',
      number: '2000',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01451-000'
    },
    tags: ['Corporativo'],
    totalPurchases: 8200.00,
    lastPurchase: '2024-02-03T09:30:00Z',
    createdAt: '2023-07-18T00:00:00Z',
    updatedAt: '2024-02-03T09:30:00Z'
  },
  {
    id: 'client-7',
    name: 'Roberto Mendes',
    email: 'roberto.mendes@email.com',
    phone: '(11) 93333-7777',
    document: '963.852.741-85',
    tags: ['Eventual'],
    totalPurchases: 320.00,
    lastPurchase: '2024-01-15T14:45:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T14:45:00Z'
  },
  {
    id: 'client-8',
    name: 'Isabela Ferreira',
    email: 'isabela.ferreira@email.com',
    phone: '(11) 92222-8888',
    document: '852.741.963-74',
    address: {
      street: 'Rua Haddock Lobo',
      number: '595',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01414-001'
    },
    tags: ['Estudante', 'Desconto'],
    totalPurchases: 1450.90,
    lastPurchase: '2024-01-28T13:20:00Z',
    createdAt: '2023-09-05T00:00:00Z',
    updatedAt: '2024-01-28T13:20:00Z'
  },
  {
    id: 'client-9',
    name: 'Lucas Almeida',
    email: 'lucas.almeida@email.com',
    phone: '(11) 91111-9999',
    document: '741.852.963-63',
    address: {
      street: 'Rua da Consolação',
      number: '1200',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01302-001'
    },
    tags: ['Técnico', 'Parceiro'],
    totalPurchases: 3200.75,
    lastPurchase: '2024-02-01T10:15:00Z',
    createdAt: '2023-11-12T00:00:00Z',
    updatedAt: '2024-02-01T10:15:00Z'
  },
  {
    id: 'client-10',
    name: 'Patrícia Rodrigues',
    email: 'patricia.rodrigues@email.com',
    phone: '(11) 90000-1010',
    document: '159.753.486-52',
    address: {
      street: 'Av. Rebouças',
      number: '3000',
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05401-300'
    },
    tags: ['Influencer', 'Parcerias'],
    totalPurchases: 4800.40,
    lastPurchase: '2024-01-30T16:45:00Z',
    createdAt: '2023-06-08T00:00:00Z',
    updatedAt: '2024-01-30T16:45:00Z'
  }
];
