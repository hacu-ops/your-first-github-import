import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DemandKPICards from "@/components/demands/DemandKPICards";
import DemandCard, { type Demand } from "@/components/demands/DemandCard";
import DemandDetailsModal from "@/components/demands/DemandDetailsModal";

const mockDemands: Demand[] = [
  { id: 1, rank: 1, name: "Construção de nova creche", city: "Londrina", neighborhood: "Jardim das Américas", category: "Educação", suggestions: 182, support: 75, isTrending: true },
  { id: 2, rank: 2, name: "Melhoria na iluminação pública", city: "Curitiba", neighborhood: "Centro Cívico", category: "Segurança", suggestions: 156, support: 88, isTrending: false },
  { id: 3, rank: 3, name: "Ampliação do posto de saúde", city: "Maringá", neighborhood: "Zona 7", category: "Saúde", suggestions: 141, support: 92, isTrending: true },
  { id: 4, rank: 4, name: "Asfaltamento da Rua Principal", city: "Cascavel", neighborhood: "Parque São Paulo", category: "Infraestrutura", suggestions: 128, support: 65, isTrending: false },
  { id: 5, rank: 5, name: "Criação de parque com área de lazer", city: "Ponta Grossa", neighborhood: "Uvaranas", category: "Lazer", suggestions: 115, support: 81, isTrending: true },
  { id: 6, rank: 6, name: "Reforma da quadra de esportes", city: "Foz do Iguaçu", neighborhood: "Vila A", category: "Esporte", suggestions: 98, support: 70, isTrending: false },
];

const PopularDemands = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const { toast } = useToast();
  const [formState, setFormState] = useState({ city: "", neighborhood: "", title: "", category: "", description: "", name: "" });
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sugestão Enviada!",
      description: "Obrigado por contribuir! Sua sugestão será analisada pela equipe do governo.",
      variant: "glass",
      duration: 5000,
    });
    setFormState({ city: "", neighborhood: "", title: "", category: "", description: "", name: "" });
  };

  const handleOpenDetails = (demand: Demand) => {
    setSelectedDemand(demand);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white">Demandas Populares</h1>
            <p className="text-white/70 mt-1">Veja o que o povo mais deseja. Os projetos mais sugeridos aparecem no topo.</p>
          </div>

          {/* KPI Dashboard */}
          <DemandKPICards />

          {/* Filters */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Input placeholder="Buscar por palavra-chave..." className="max-w-xs bg-white/10 border-white/20 text-white" />
            <Select><SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white"><SelectValue placeholder="Cidade" /></SelectTrigger></Select>
            <Select><SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white"><SelectValue placeholder="Categoria" /></SelectTrigger></Select>
            <Button variant="outline" className="glass-card border-white/20"><Filter className="h-4 w-4 mr-2" />Filtros Avançados</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ranking */}
            <div className="lg:col-span-2 space-y-4">
              {mockDemands.map((demand, index) => (
                <DemandCard 
                  key={demand.id} 
                  demand={demand} 
                  onOpenDetails={() => handleOpenDetails(demand)}
                  animationDelay={0.2 + index * 0.05}
                />
              ))}
            </div>

            {/* Suggestion Form */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Card className="glass-card border-white/10 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white">Sugira um Projeto</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Select value={formState.city} onValueChange={(v) => handleInputChange('city', v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Cidade" /></SelectTrigger>
                      <SelectContent><SelectItem value="curitiba">Curitiba</SelectItem><SelectItem value="londrina">Londrina</SelectItem></SelectContent>
                    </Select>
                    <Input placeholder="Bairro" value={formState.neighborhood} onChange={(e) => handleInputChange('neighborhood', e.target.value)} className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Título da sugestão" value={formState.title} onChange={(e) => handleInputChange('title', e.target.value)} className="bg-white/10 border-white/20 text-white" />
                    <Select value={formState.category} onValueChange={(v) => handleInputChange('category', v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Categoria" /></SelectTrigger>
                      <SelectContent><SelectItem value="saude">Saúde</SelectItem><SelectItem value="educacao">Educação</SelectItem></SelectContent>
                    </Select>
                    <Textarea placeholder="Descreva sua sugestão..." value={formState.description} onChange={(e) => handleInputChange('description', e.target.value)} className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Seu nome (opcional)" value={formState.name} onChange={(e) => handleInputChange('name', e.target.value)} className="bg-white/10 border-white/20 text-white" />
                    <Button type="submit" className="w-full bg-gradient-primary">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Sugestão
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <DemandDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        demand={selectedDemand}
      />
    </div>
  );
};

export default PopularDemands;