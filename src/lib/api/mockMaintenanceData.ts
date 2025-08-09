import { ServiceType, ServiceOrder, ServicePart, Technician, Alert, AIRecommendation } from '@/types';

// Tipos de serviço mock
export const mockServiceTypes: ServiceType[] = [
  {
    id: 'service-1',
    name: 'Troca de Tela',
    category: 'screen',
    basePrice: 250,
    estimatedTime: 60,
    description: 'Substituição completa da tela do aparelho',
    warranty: 90,
    isActive: true,
    skillLevel: 'intermediate',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'service-2',
    name: 'Troca de Bateria',
    category: 'battery',
    basePrice: 120,
    estimatedTime: 30,
    description: 'Substituição da bateria por uma nova original',
    warranty: 180,
    isActive: true,
    skillLevel: 'basic',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'service-3',
    name: 'Reparo de Placa',
    category: 'board',
    basePrice: 400,
    estimatedTime: 180,
    description: 'Reparo ou reballing da placa principal',
    warranty: 60,
    isActive: true,
    skillLevel: 'advanced',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'service-4',
    name: 'Desbloqueio',
    category: 'unlock',
    basePrice: 80,
    estimatedTime: 15,
    description: 'Desbloqueio por software ou remoção de iCloud',
    warranty: 30,
    isActive: true,
    skillLevel: 'basic',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'service-5',
    name: 'Limpeza Completa',
    category: 'cleaning',
    basePrice: 50,
    estimatedTime: 45,
    description: 'Limpeza interna e externa do aparelho',
    warranty: 15,
    isActive: true,
    skillLevel: 'basic',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Técnicos mock
export const mockTechnicians: Technician[] = [
  {
    id: 'tech-1',
    name: 'Carlos Silva',
    email: 'carlos@japaiphone.com',
    phone: '(11) 99999-1111',
    specialties: ['service-1', 'service-2', 'service-5'],
    skillLevel: 'pleno',
    hourlyRate: 45,
    isActive: true,
    totalServices: 156,
    avgRating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'tech-2',
    name: 'Ana Costa',
    email: 'ana@japaiphone.com',
    phone: '(11) 99999-2222',
    specialties: ['service-1', 'service-3'],
    skillLevel: 'senior',
    hourlyRate: 60,
    isActive: true,
    totalServices: 234,
    avgRating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'tech-3',
    name: 'Pedro Santos',
    email: 'pedro@japaiphone.com',
    phone: '(11) 99999-3333',
    specialties: ['service-2', 'service-4', 'service-5'],
    skillLevel: 'junior',
    hourlyRate: 30,
    isActive: true,
    totalServices: 89,
    avgRating: 4.6,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  }
];

// Peças de serviço mock
export const mockServiceParts: ServicePart[] = [
  {
    id: 'part-1',
    name: 'Tela iPhone 14 Original',
    category: 'screen',
    compatibleDevices: ['iPhone 14'],
    costPrice: 180,
    salePrice: 220,
    stock: 5,
    minStock: 5,
    supplier: 'TechParts Brasil',
    partNumber: 'IP14-SCR-001',
    warranty: 90,
    location: 'Prateleira A-1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'part-2',
    name: 'Bateria iPhone 14',
    category: 'battery',
    compatibleDevices: ['iPhone 14'],
    costPrice: 80,
    salePrice: 100,
    stock: 25,
    minStock: 10,
    supplier: 'BatteryMax',
    partNumber: 'IP14-BAT-001',
    warranty: 180,
    location: 'Gaveta B-2',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'part-3',
    name: 'Alto-falante iPhone 14',
    category: 'speaker',
    compatibleDevices: ['iPhone 14', 'iPhone 14 Plus'],
    costPrice: 25,
    salePrice: 40,
    stock: 30,
    minStock: 8,
    supplier: 'SoundParts',
    partNumber: 'IP14-SPK-001',
    warranty: 60,
    location: 'Gaveta C-1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'part-4',
    name: 'Conector Lightning iPhone',
    category: 'connector',
    compatibleDevices: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
    costPrice: 35,
    salePrice: 55,
    stock: 20,
    minStock: 8,
    supplier: 'ConnectParts',
    partNumber: 'IP-LIGHT-001',
    warranty: 90,
    location: 'Gaveta D-1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'part-5',
    name: 'Câmera Traseira iPhone 14',
    category: 'camera',
    compatibleDevices: ['iPhone 14'],
    costPrice: 120,
    salePrice: 160,
    stock: 8,
    minStock: 3,
    supplier: 'CameraTech',
    partNumber: 'IP14-CAM-001',
    warranty: 120,
    location: 'Prateleira B-3',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-08T00:00:00Z'
  }
];

// Ordens de serviço mock
export const mockServiceOrders: ServiceOrder[] = [
  {
    id: 'order-1',
    clientId: 'client-1',
    deviceType: 'iPhone',
    deviceModel: 'iPhone 14',
    deviceImei: '123456789012345',
    problemDescription: 'Tela trincada após queda',
    initialDiagnosis: 'Display danificado, touch funcionando',
    serviceTypes: ['service-1'],
    status: 'in_progress',
    priority: 'high',
    partsCost: 220,
    laborCost: 60,
    totalCost: 280,
    discount: 0,
    finalPrice: 280,
    technicianId: 'tech-1',
    startDate: '2024-02-08T09:00:00Z',
    estimatedDelivery: '2024-02-08T18:00:00Z',
    warrantyDays: 90,
    paymentStatus: 'pending',
    paidAmount: 0,
    internalNotes: 'Cliente aguarda contato para aprovação',
    partsUsed: [
      {
        id: 'part-1',
        name: 'Tela iPhone 14 Original',
        category: 'screen',
        compatibleDevices: ['iPhone 14'],
        costPrice: 180,
        salePrice: 220,
        stock: 15,
        minStock: 5,
        warranty: 90,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-02-08T00:00:00Z'
      }
    ],
    createdAt: '2024-02-08T08:30:00Z',
    updatedAt: '2024-02-08T09:00:00Z'
  },
  {
    id: 'order-2',
    clientId: 'client-2',
    deviceType: 'Samsung',
    deviceModel: 'Galaxy S23',
    problemDescription: 'Bateria não segura carga',
    initialDiagnosis: 'Bateria viciada, necessário substituição',
    serviceTypes: ['service-2'],
    status: 'completed',
    priority: 'normal',
    partsCost: 100,
    laborCost: 30,
    totalCost: 130,
    discount: 10,
    finalPrice: 117,
    technicianId: 'tech-3',
    startDate: '2024-02-07T14:00:00Z',
    estimatedDelivery: '2024-02-07T16:00:00Z',
    completedDate: '2024-02-07T15:45:00Z',
    deliveredDate: '2024-02-07T17:30:00Z',
    warrantyDays: 180,
    warrantyExpires: '2024-08-05T00:00:00Z',
    paymentMethod: 'pix',
    paymentStatus: 'completed',
    paidAmount: 117,
    customerNotes: 'Serviço excelente, muito rápido!',
    partsUsed: [],
    createdAt: '2024-02-07T13:30:00Z',
    updatedAt: '2024-02-07T17:30:00Z'
  },
  {
    id: 'order-3',
    clientId: 'client-3',
    deviceType: 'iPhone',
    deviceModel: 'iPhone 13',
    deviceImei: '987654321098765',
    problemDescription: 'Aparelho não carrega',
    initialDiagnosis: 'Conector Lightning danificado',
    serviceTypes: ['service-2'],
    status: 'waiting_parts',
    priority: 'normal',
    partsCost: 55,
    laborCost: 45,
    totalCost: 100,
    discount: 0,
    finalPrice: 100,
    technicianId: 'tech-2',
    startDate: '2024-02-08T10:00:00Z',
    estimatedDelivery: '2024-02-09T16:00:00Z',
    warrantyDays: 90,
    paymentStatus: 'partial',
    paidAmount: 50,
    internalNotes: 'Aguardando chegada da peça - Conector Lightning',
    partsUsed: [],
    createdAt: '2024-02-08T09:15:00Z',
    updatedAt: '2024-02-08T14:30:00Z'
  },
  {
    id: 'order-4',
    clientId: 'client-4',
    deviceType: 'iPhone',
    deviceModel: 'iPhone 12',
    problemDescription: 'Aparelho molhou, não liga',
    initialDiagnosis: 'Dano por líquido, necessário limpeza e teste',
    serviceTypes: ['service-5', 'service-3'],
    status: 'testing',
    priority: 'urgent',
    partsCost: 0,
    laborCost: 150,
    totalCost: 150,
    discount: 0,
    finalPrice: 150,
    technicianId: 'tech-2',
    startDate: '2024-02-08T13:00:00Z',
    estimatedDelivery: '2024-02-09T13:00:00Z',
    warrantyDays: 30,
    paymentStatus: 'pending',
    paidAmount: 0,
    internalNotes: 'Limpeza realizada, aguardando teste de funcionalidade',
    customerNotes: 'Aparelho caiu na água ontem',
    partsUsed: [],
    createdAt: '2024-02-08T12:30:00Z',
    updatedAt: '2024-02-08T16:45:00Z'
  }
];

// Alertas mock
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'stock',
    category: 'warning',
    title: 'Estoque Baixo - Telas iPhone 14',
    message: 'Apenas 5 unidades restantes. Reabastecer urgente!',
    actionRequired: true,
    actionUrl: '/manutencoes',
    isRead: false,
    createdAt: '2024-02-08T10:00:00Z'
  },
  {
    id: 'alert-2',
    type: 'service',
    category: 'critical',
    title: 'Ordem Atrasada',
    message: 'Ordem #order-1 passou do prazo estimado de entrega',
    actionRequired: true,
    actionUrl: '/manutencoes',
    isRead: false,
    createdAt: '2024-02-08T18:30:00Z'
  },
  {
    id: 'alert-3',
    type: 'financial',
    category: 'info',
    title: 'Meta de Vendas Atingida!',
    message: 'Parabéns! Meta do mês foi alcançada 3 dias antes do prazo',
    actionRequired: false,
    isRead: false,
    createdAt: '2024-02-08T12:00:00Z'
  },
  {
    id: 'alert-4',
    type: 'stock',
    category: 'critical',
    title: 'Peça em Falta',
    message: 'Câmera Traseira iPhone 14 - estoque crítico (3 unidades)',
    actionRequired: true,
    actionUrl: '/manutencoes',
    isRead: false,
    createdAt: '2024-02-08T15:20:00Z'
  },
  {
    id: 'alert-5',
    type: 'service',
    category: 'warning',
    title: 'Garantia Vencendo',
    message: '5 garantias de serviços vencem nos próximos 7 dias',
    actionRequired: false,
    isRead: false,
    createdAt: '2024-02-08T08:00:00Z'
  }
];

// Recomendações IA mock
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'inventory',
    category: 'critical',
    title: 'Reabastecer Telas iPhone 14',
    description: 'Baseado no histórico de vendas e sazonalidade',
    reasoning: [
      'Vendas de telas iPhone 14 aumentaram 40% no último mês',
      'Estoque atual de 5 unidades durará apenas 3 dias',
      'Fornecedor tem prazo de entrega de 7 dias'
    ],
    expectedImpact: 'Evitar perda de vendas de R$ 2.800',
    confidence: 0.92,
    estimatedROI: 2800,
    actionSteps: [
      'Contatar fornecedor TechParts Brasil',
      'Solicitar 20 unidades de tela iPhone 14',
      'Negociar desconto por volume'
    ],
    dataPoints: [
      { label: 'Vendas últimos 30 dias', value: 12 },
      { label: 'Estoque atual', value: 5 },
      { label: 'Dias restantes', value: 3 }
    ],
    isImplemented: false,
    createdAt: '2024-02-08T11:00:00Z',
    validUntil: '2024-02-15T00:00:00Z'
  },
  {
    id: 'rec-2',
    type: 'pricing',
    category: 'important',
    title: 'Ajustar Preço do Serviço de Bateria',
    description: 'Oportunidade de aumentar margem sem perder competitividade',
    reasoning: [
      'Concorrência cobra em média R$ 140 pelo serviço',
      'Nossa margem atual é de apenas 25%',
      'Cliente satisfação alta (4.8/5) permite aumento'
    ],
    expectedImpact: 'Aumento de receita de R$ 600/mês',
    confidence: 0.78,
    estimatedROI: 600,
    actionSteps: [
      'Aumentar preço de R$ 120 para R$ 135',
      'Monitorar impacto nas vendas',
      'Ajustar se necessário'
    ],
    dataPoints: [
      { label: 'Preço atual', value: 'R$ 120' },
      { label: 'Preço sugerido', value: 'R$ 135' },
      { label: 'Preço concorrência', value: 'R$ 140' }
    ],
    isImplemented: false,
    createdAt: '2024-02-08T14:00:00Z'
  },
  {
    id: 'rec-3',
    type: 'service',
    category: 'important',
    title: 'Otimizar Fluxo de Manutenções',
    description: 'Reduzir tempo médio de reparo baseado em análise de gargalos',
    reasoning: [
      'Tempo médio atual: 2.5 dias por serviço',
      'Concorrência entrega em 1.8 dias em média',
      'Gargalo identificado: espera por diagnóstico'
    ],
    expectedImpact: 'Reduzir tempo de entrega em 30%',
    confidence: 0.85,
    estimatedROI: 1200,
    actionSteps: [
      'Implementar diagnóstico paralelo durante recebimento',
      'Criar checklist padronizado por tipo de aparelho',
      'Treinar técnicos para diagnóstico rápido'
    ],
    dataPoints: [
      { label: 'Tempo atual (dias)', value: 2.5 },
      { label: 'Meta (dias)', value: 1.8 },
      { label: 'Redução esperada', value: '30%' }
    ],
    isImplemented: false,
    createdAt: '2024-02-08T16:00:00Z'
  },
  {
    id: 'rec-4',
    type: 'marketing',
    category: 'suggestion',
    title: 'Campanha de Limpeza Preventiva',
    description: 'Promover serviços de limpeza durante período seco',
    reasoning: [
      'Serviços de limpeza têm margem alta (80%)',
      'Baixa demanda atual (apenas 5% dos serviços)',
      'Período seco favorece campanhas de manutenção'
    ],
    expectedImpact: 'Aumento de 40% em serviços de limpeza',
    confidence: 0.65,
    estimatedROI: 800,
    actionSteps: [
      'Criar pacote promocional "Limpeza + Diagnóstico"',
      'Oferecer desconto para clientes recorrentes',
      'Divulgar benefícios da limpeza preventiva'
    ],
    dataPoints: [
      { label: 'Margem atual', value: '80%' },
      { label: 'Demanda atual', value: '5%' },
      { label: 'Meta de crescimento', value: '40%' }
    ],
    isImplemented: false,
    createdAt: '2024-02-08T17:30:00Z'
  }
];

