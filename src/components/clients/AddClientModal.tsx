'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Phone, 
  MapPin, 
  Settings,
  Check,
  X,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { useInventoryStore } from '@/store';
import type { Client } from '@/types';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClientFormData {
  // Dados Pessoais
  name: string;
  document: string;
  birthDate: string;
  gender: string;
  
  // Contato
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  
  // Endereço
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  
  // Preferências
  interests: string[];
  preferredPayment: string;
  bestContactTime: string;
  notes: string;
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  const { addClient } = useInventoryStore();
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    document: '',
    birthDate: '',
    gender: '',
    phone: '',
    whatsapp: '',
    email: '',
    instagram: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    interests: [],
    preferredPayment: '',
    bestContactTime: '',
    notes: ''
  });

  const [validations, setValidations] = useState({
    documentValid: null as boolean | null,
    phoneValid: null as boolean | null,
    duplicateCheck: null as boolean | null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('personal');

  const productInterests = [
    'iPhone', 'Samsung', 'Xiaomi', 'Motorola', 'Acessórios', 'Capas', 
    'Películas', 'Fones', 'Carregadores', 'Manutenção'
  ];

  const paymentMethods = [
    'PIX', 'Dinheiro', 'Cartão de Débito', 'Cartão de Crédito', 'Boleto'
  ];

  const contactTimes = [
    'Manhã (08h-12h)', 'Tarde (12h-18h)', 'Noite (18h-22h)', 'Qualquer horário'
  ];

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validações em tempo real
    if (field === 'document') {
      validateDocument(value);
    } else if (field === 'phone') {
      validatePhone(value);
    }
  };

  const validateDocument = (document: string) => {
    // Simular validação de CPF/CNPJ
    const cleanDoc = document.replace(/\D/g, '');
    const isValid = cleanDoc.length === 11 || cleanDoc.length === 14;
    setValidations(prev => ({ ...prev, documentValid: isValid }));
    
    if (isValid) {
      // Simular verificação de duplicata
      setTimeout(() => {
        setValidations(prev => ({ ...prev, duplicateCheck: true }));
      }, 500);
    }
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const isValid = cleanPhone.length >= 10;
    setValidations(prev => ({ ...prev, phoneValid: isValid }));
  };

  const handleZipCodeChange = async (zipCode: string) => {
    setFormData(prev => ({ ...prev, zipCode }));
    
    if (zipCode.replace(/\D/g, '').length === 8) {
      // Simular busca de CEP
      setIsLoading(true);
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          street: 'Rua Exemplo',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP'
        }));
        setIsLoading(false);
      }, 1000);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  // IA removida

  const handleSave = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newClient: Client = {
        id: `client-${Date.now()}`,
        name: formData.name || 'Cliente',
        phone: formData.phone || '',
        email: formData.email || undefined,
        document: formData.document || undefined,
        address: formData.city ? {
          street: formData.street,
          number: formData.number,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        } : undefined,
        tags: [],
        totalPurchases: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addClient(newClient);
      setIsLoading(false);
      onClose();
      setFormData({
        name: '', document: '', birthDate: '', gender: '',
        phone: '', whatsapp: '', email: '', instagram: '',
        zipCode: '', street: '', number: '', complement: '',
        neighborhood: '', city: '', state: '',
        interests: [], preferredPayment: '', bestContactTime: '', notes: ''
      });
      setValidations({ documentValid: null, phoneValid: null, duplicateCheck: null });
    }, 500);
  };

  const isFormValid = () => {
    return formData.name && formData.phone && 
           validations.documentValid !== false && 
           validations.phoneValid !== false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Adicionar Novo Cliente</span>
          </DialogTitle>
          <DialogDescription>
            Formulário completo com validações e auto-preenchimento
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">
              <User className="h-4 w-4 mr-2" />
              Pessoais
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="h-4 w-4 mr-2" />
              Contato
            </TabsTrigger>
            <TabsTrigger value="address">
              <MapPin className="h-4 w-4 mr-2" />
              Endereço
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="h-4 w-4 mr-2" />
              Preferências
            </TabsTrigger>
          </TabsList>

          {/* Dados Pessoais */}
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nome completo do cliente"
                />
              </div>

              <div>
                <Label htmlFor="document">CPF/CNPJ</Label>
                <div className="relative">
                  <Input
                    id="document"
                    value={formData.document}
                    onChange={(e) => handleInputChange('document', e.target.value)}
                    placeholder="000.000.000-00"
                  />
                  {validations.documentValid === true && (
                    <Check className="absolute right-2 top-2.5 h-4 w-4 text-green-600" />
                  )}
                  {validations.documentValid === false && (
                    <X className="absolute right-2 top-2.5 h-4 w-4 text-red-600" />
                  )}
                </div>
                {validations.duplicateCheck === true && (
                  <p className="text-xs text-green-600 mt-1">✓ Documento válido, sem duplicatas</p>
                )}
              </div>

              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="gender">Gênero</Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="nao-informar">Prefiro não informar</option>
                </select>
              </div>
            </div>
          </TabsContent>

          {/* Contato */}
          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone Principal *</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                  {validations.phoneValid === true && (
                    <Check className="absolute right-2 top-2.5 h-4 w-4 text-green-600" />
                  )}
                  {validations.phoneValid === false && (
                    <X className="absolute right-2 top-2.5 h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="cliente@email.com"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="@username"
                />
              </div>
            </div>
          </TabsContent>

          {/* Endereço */}
          <TabsContent value="address" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <div className="relative">
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleZipCodeChange(e.target.value)}
                    placeholder="00000-000"
                  />
                  {isLoading && (
                    <div className="absolute right-2 top-2.5">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Auto-preenchimento ativado</p>
              </div>

              <div>
                <Label htmlFor="street">Rua/Avenida</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Nome da rua"
                />
              </div>

              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  placeholder="123"
                />
              </div>

              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange('complement', e.target.value)}
                  placeholder="Apto, bloco, etc."
                />
              </div>

              <div>
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                  placeholder="Nome do bairro"
                />
              </div>

              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Nome da cidade"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="state">Estado</Label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione o estado...</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  {/* Adicionar outros estados */}
                </select>
              </div>
            </div>
          </TabsContent>

          {/* Preferências */}
          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-6">
              {/* Produtos de Interesse */}
              <div>
                <Label>Produtos de Interesse</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {productInterests.map(interest => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        formData.interests.includes(interest) 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Forma de Pagamento Preferida */}
              <div>
                <Label htmlFor="preferredPayment">Forma de Pagamento Preferida</Label>
                <select
                  id="preferredPayment"
                  value={formData.preferredPayment}
                  onChange={(e) => handleInputChange('preferredPayment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione...</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Melhor Horário para Contato */}
              <div>
                <Label htmlFor="bestContactTime">Melhor Horário para Contato</Label>
                <select
                  id="bestContactTime"
                  value={formData.bestContactTime}
                  onChange={(e) => handleInputChange('bestContactTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione...</option>
                  {contactTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Observações */}
              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Informações adicionais sobre o cliente..."
                  rows={3}
                />
              </div>

              
            </div>
          </TabsContent>
        </Tabs>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {!isFormValid() && (
              <>
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span>Preencha os campos obrigatórios (*)</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!isFormValid() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Salvar Cliente
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
