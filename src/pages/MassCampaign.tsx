import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Video, Mic, Users, Eye, Rocket, TestTube2 } from "lucide-react";
import profileImage from "@/assets/profile-gestor-rh.jpg"; // Using a placeholder avatar

const mockProjects = [
  "Duplicação da PR-445",
  "Programa Mãe Paranaense",
  "Construção da Escola de Tempo Integral",
  "Internet nas Escolas Rurais",
  "Hospital Regional de Guarapuava",
  "Modernização do Porto de Paranaguá",
];

const mockCities = [
  "Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "Foz do Iguaçu"
];

const MassCampaign = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [project, setProject] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [format, setFormat] = useState("text");
  const [message, setMessage] = useState("");

  const estimatedReach = city ? (mockCities.indexOf(city) + 1) * 25000 : 0;
  const isFormComplete = project && city && message;

  const generateAutoMessage = () => {
    if (project) {
      setMessage(`Olá, {nome}! Estamos felizes em anunciar o andamento do projeto "{projeto}" aqui em {cidade}. Esta iniciativa trará grandes benefícios para nossa comunidade. Acompanhe as novidades!`);
    } else {
      setMessage("Por favor, selecione um projeto primeiro para gerar uma mensagem automática.");
    }
  };

  const renderPreview = () => {
    if (!project && !city && !message) {
      return <p className="text-center text-white/60">Configure a campanha para ver o preview da mensagem...</p>;
    }

    let previewMessage = message
      .replace('{nome}', 'Cidadão')
      .replace('{projeto}', project || 'Nome do Projeto')
      .replace('{cidade}', city || 'sua cidade');

    return (
      <div className="bg-[#075E54] p-3 rounded-lg shadow-lg">
        <div className="flex items-start gap-3">
          <img src={profileImage} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white/20" />
          <div className="bg-white text-slate-800 p-3 rounded-lg rounded-tl-none relative flex-1 min-w-0">
            <p className="font-bold text-sm text-blue-600">Ratinho Jr.</p>
            <p className="text-sm whitespace-pre-wrap break-words">{previewMessage}</p>
            <span className="text-xs text-slate-400 absolute bottom-1 right-2">14:30</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white">Campanha em Massa</h1>
            <p className="text-white/70 mt-1">Disparos estratégicos personalizados baseados em projetos e dados da plataforma.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Configuration */}
            <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="text-white">Configuração da Campanha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Projeto a Divulgar</label>
                  <Select value={project} onValueChange={setProject}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Selecione um projeto" /></SelectTrigger>
                    <SelectContent>{mockProjects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Cidade</label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Selecione a cidade" /></SelectTrigger>
                      <SelectContent>{mockCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Bairro (Opcional)</label>
                    <Input placeholder="Ex: Centro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="bg-white/10 border-white/20 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Formato da Mensagem</label>
                  <ToggleGroup type="single" value={format} onValueChange={(v) => v && setFormat(v)} className="w-full">
                    <ToggleGroupItem value="text" className="flex-1"><FileText className="h-4 w-4 mr-2" />Texto</ToggleGroupItem>
                    <ToggleGroupItem value="image" className="flex-1"><Image className="h-4 w-4 mr-2" />Imagem</ToggleGroupItem>
                    <ToggleGroupItem value="video" className="flex-1"><Video className="h-4 w-4 mr-2" />Vídeo</ToggleGroupItem>
                    <ToggleGroupItem value="audio" className="flex-1"><Mic className="h-4 w-4 mr-2" />Áudio</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Mensagem Personalizada</label>
                  <div className="relative">
                    <Textarea 
                      placeholder="Digite sua mensagem ou use 'Gerar Automático'..." 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/10 border-white/20 text-white min-h-[120px] pr-32" 
                    />
                    <Button onClick={generateAutoMessage} variant="outline" size="sm" className="absolute top-3 right-3 glass-card border-white/20">Gerar Automático</Button>
                  </div>
                  <p className="text-xs text-white/60">Use variáveis: {"{cidade}"}, {"{nome}"}, {"{projeto}"} para personalização.</p>
                </div>
                <div className="flex items-center gap-2 text-white/80 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Alcance Estimado:</span>
                  <span className="font-bold text-white">{estimatedReach.toLocaleString('pt-BR')} pessoas</span>
                </div>
              </CardContent>
            </Card>

            {/* Right: Preview */}
            <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-white">Preview da Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPreview()}
              </CardContent>
            </Card>
          </div>

          {/* Bottom: Execution */}
          <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Executar Campanha</h3>
                <p className="text-white/70">
                  {city ? `Campanha configurada para ${city}.` : "Selecione uma cidade para continuar."}
                </p>
                <div className="text-sm text-white/80 mt-2">
                  <span className="font-semibold">Alcance:</span> {estimatedReach.toLocaleString('pt-BR')} pessoas • <span className="font-semibold">Formato:</span> {format}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="glass-card border-white/20">
                  <TestTube2 className="h-4 w-4 mr-2" />
                  Testar Envio
                </Button>
                <Button disabled={!isFormComplete} className="bg-gradient-primary">
                  <Rocket className="h-4 w-4 mr-2" />
                  Executar Campanha
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MassCampaign;