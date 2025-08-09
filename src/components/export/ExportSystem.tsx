'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share2, 
  Mail, 
  MessageCircle, 
  Link,
  FileText,
  FileSpreadsheet,
  Image,
  Calendar,
  Clock,
  Settings,
  Send,
  Copy,
  Check,
  BarChart3,
  Users,
  Eye
} from 'lucide-react';

interface ExportSystemProps {
  reportType: string;
  reportData: any;
  reportName: string;
}

export function ExportSystem({ reportType, reportData, reportName }: ExportSystemProps) {
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [shareMethod, setShareMethod] = useState<string>('email');
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [scheduledExports, setScheduledExports] = useState<any[]>([]);
  const [shareConfig, setShareConfig] = useState({
    emails: '',
    message: '',
    whatsapp: '',
    linkExpiry: '7',
    password: ''
  });

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF',
      icon: FileText,
      description: 'Documento formatado para impressão',
      size: '~1.2 MB'
    },
    {
      id: 'excel',
      name: 'Excel',
      icon: FileSpreadsheet,
      description: 'Planilha editável com dados',
      size: '~800 KB'
    },
    {
      id: 'csv',
      name: 'CSV',
      icon: FileSpreadsheet,
      description: 'Dados tabulares simples',
      size: '~200 KB'
    },
    {
      id: 'image',
      name: 'Imagem',
      icon: Image,
      description: 'PNG de alta qualidade',
      size: '~3.5 MB'
    }
  ];

  const shareMethods = [
    {
      id: 'email',
      name: 'E-mail',
      icon: Mail,
      description: 'Enviar por email com anexo'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      description: 'Compartilhar via WhatsApp Business'
    },
    {
      id: 'link',
      name: 'Link Compartilhável',
      icon: Link,
      description: 'Gerar link temporário para acesso'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simular processo de exportação
    setTimeout(() => {
      const fileName = `${reportName}_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      console.log(`Exportando relatório: ${fileName}`);
      
      // Aqui seria implementada a exportação real
      // Por exemplo: gerar PDF, Excel, etc.
      
      // Simular download
      const blob = new Blob(['Dados do relatório...'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
    }, 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    setTimeout(() => {
      console.log('Compartilhando relatório:', shareConfig);
      
      if (shareMethod === 'email') {
        // Implementar envio por email
        console.log('Enviando por email para:', shareConfig.emails);
      } else if (shareMethod === 'whatsapp') {
        // Implementar WhatsApp Business API
        const message = encodeURIComponent(`${shareConfig.message}\n\nRelatório: ${reportName}`);
        const whatsappUrl = `https://wa.me/${shareConfig.whatsapp.replace(/\D/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
      } else if (shareMethod === 'link') {
        // Gerar link compartilhável
        const shareLink = `https://sistema-japa.com/shared/${Math.random().toString(36).substr(2, 9)}`;
        navigator.clipboard.writeText(shareLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      }
      
      setIsSharing(false);
    }, 1500);
  };

  const scheduleExport = () => {
    const newSchedule = {
      id: Date.now(),
      reportName,
      format: exportFormat,
      frequency: 'weekly',
      recipients: shareConfig.emails.split(',').map(email => email.trim()),
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    setScheduledExports(prev => [...prev, newSchedule]);
    console.log('Relatório agendado:', newSchedule);
  };

  const removeScheduledExport = (id: number) => {
    setScheduledExports(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Formato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-blue-600" />
            <span>Exportar Relatório</span>
          </CardTitle>
          <CardDescription>
            Escolha o formato de exportação para o relatório "{reportName}"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map(format => {
              const Icon = format.icon;
              const isSelected = exportFormat === format.id;
              
              return (
                <div
                  key={format.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setExportFormat(format.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className="h-8 w-8 text-blue-600" />
                    <h4 className="font-medium text-gray-900">{format.name}</h4>
                    <p className="text-sm text-gray-600">{format.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {format.size}
                    </Badge>
                    {isSelected && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleExport} disabled={isExporting} className="bg-blue-600 hover:bg-blue-700">
              {isExporting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar {exportFormats.find(f => f.id === exportFormat)?.name}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Compartilhamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-green-600" />
            <span>Compartilhar Relatório</span>
          </CardTitle>
          <CardDescription>
            Envie o relatório por diferentes canais de comunicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Métodos de Compartilhamento */}
          <div>
            <Label className="text-base font-medium">Método de Compartilhamento</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {shareMethods.map(method => {
                const Icon = method.icon;
                const isSelected = shareMethod === method.id;
                
                return (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setShareMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configurações por Método */}
          <div className="space-y-4">
            {shareMethod === 'email' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="emails">E-mails dos Destinatários</Label>
                  <Input
                    id="emails"
                    value={shareConfig.emails}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, emails: e.target.value }))}
                    placeholder="email1@exemplo.com, email2@exemplo.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separe múltiplos e-mails com vírgula</p>
                </div>
                <div>
                  <Label htmlFor="message">Mensagem Personalizada</Label>
                  <Textarea
                    id="message"
                    value={shareConfig.message}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Olá! Segue o relatório solicitado..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {shareMethod === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="whatsapp">Número do WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={shareConfig.whatsapp}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsappMessage">Mensagem</Label>
                  <Textarea
                    id="whatsappMessage"
                    value={shareConfig.message}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Relatório Japa iPhone - Confira os dados..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {shareMethod === 'link' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="linkExpiry">Expiração do Link (dias)</Label>
                  <select
                    id="linkExpiry"
                    value={shareConfig.linkExpiry}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, linkExpiry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="1">1 dia</option>
                    <option value="7">7 dias</option>
                    <option value="30">30 dias</option>
                    <option value="never">Nunca expira</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="password">Senha de Proteção (opcional)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={shareConfig.password}
                    onChange={(e) => setShareConfig(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Deixe vazio para link público"
                  />
                </div>
                {linkCopied && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">Link copiado para a área de transferência!</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleShare} disabled={isSharing} className="bg-green-600 hover:bg-green-700">
              {isSharing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Compartilhando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Compartilhar por {shareMethods.find(m => m.id === shareMethod)?.name}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Automáticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span>Relatórios Automáticos</span>
          </CardTitle>
          <CardDescription>
            Configure envios automáticos e recorrentes de relatórios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-900">Agendar Envio Recorrente</h4>
              <p className="text-sm text-gray-600">
                Envie este relatório automaticamente para os destinatários configurados
              </p>
            </div>
            <Button 
              onClick={scheduleExport}
              variant="outline"
              disabled={!shareConfig.emails}
            >
              <Clock className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>

          {/* Lista de Relatórios Agendados */}
          {scheduledExports.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Relatórios Agendados</h4>
              <div className="space-y-2">
                {scheduledExports.map(schedule => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{schedule.reportName}</h5>
                      <p className="text-sm text-gray-600">
                        Formato: {schedule.format.toUpperCase()} • Frequência: {schedule.frequency}
                      </p>
                      <p className="text-xs text-gray-500">
                        Próximo envio: {new Date(schedule.nextRun).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-100 text-purple-800">
                        {schedule.recipients.length} destinatário(s)
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScheduledExport(schedule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas de Compartilhamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span>Estatísticas de Compartilhamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Download className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Downloads</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <p className="text-sm text-blue-700">Total de downloads</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Share2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Compartilhamentos</span>
              </div>
              <div className="text-2xl font-bold text-green-600">543</div>
              <p className="text-sm text-green-700">Links compartilhados</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Visualizações</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">3,891</div>
              <p className="text-sm text-purple-700">Links acessados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
