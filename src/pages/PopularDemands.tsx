
import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Filter, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import DemandSummaryCards from "@/components/demands/DemandSummaryCards";
import DemandCard, { type Demand } from "@/components/demands/DemandCard";
import DemandDetailsModal from "@/components/demands/DemandDetailsModal";
import VoiceOfPeople from "@/components/demands/VoiceOfPeople";
import DemandEvolutionChart from "@/components/demands/DemandEvolutionChart";
import StrategicInsights from "@/components/demands/StrategicInsights";
import SuggestProjectForm from "@/components/demands/SuggestProjectForm";

const mockDemands: Demand[] = [
  { 
    id: 1, 
    rank: 1, 
    name: "Construção de nova creche no Jardim das Américas", 
    city: "Londrina", 
    neighborhood: "Jardim das Américas", 
    category: "Educação", 
    suggestions: 182, 
    support: 87, 
    isTrending: true,
    status: "active",
    description: "Demanda por nova creche para atender as famílias trabalhadoras da região."
  },
  { 
    id: 2, 
    rank: 2, 
    name: "Melhoria na iluminação pública do Centro Cívico", 
    city: "Curitiba", 
    neighborhood: "Centro Cívico", 
    category: "Segurança", 
    suggestions: 156, 
    support: 82, 
    isTrending: true,
    status: "active",
    description: "Instalação de novas luminárias LED para maior segurança noturna."
  },
  { 
    id: 3, 
    rank: 3, 
    name: "Ampliação do posto de saúde da Zona 7", 
    city: "Maringá", 
    neighborhood: "Zona 7", 
    category: "Saúde", 
    suggestions: 141, 
    support: 78, 
    isTrending: false,
    status: "active",
    description: "Expansão do posto para atender melhor a demanda crescente da região."
  },
  { 
    id: 4, 
    rank: 4, 
    name: "Asfaltamento da Rua Principal", 
    city: "Cascavel", 
    neighborhood: "Parque São Paulo", 
    category: "Infraestrutura", 
    suggestions: 128, 
    support: 65, 
    isTrending: false,
    status: "resolved",
    description: "Pavimentação completa da via principal do bairro."
  },
  { 
    id: 5, 
    rank: 5, 
    name: "Criação de parque com área de lazer", 
    city: "Ponta Grossa", 
    neighborhood: "Uvaranas", 
    category: "Lazer", 
    suggestions: 115, 
    support: 71, 
    isTrending: true,
    status: "active",
    description: "Espaço verde para recreação familiar e atividades ao ar livre."
  },
  { 
    id: 6, 
    rank: 6, 
    name: "Reforma da quadra de esportes", 
    city: "Foz do Iguaçu", 
    neighborhood: "Vila A", 
    category: "Esporte", 
    suggestions: 98, 
    support: 59, 
    isTrending: false,
    status: "active",
    description: "Revitalização completa da quadra poliesportiva do bairro."
  },
];

const PopularDemands = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [demands] = useState<Demand[]>(mockDemands);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [supportRange, setSupportRange] = useState([0, 100]);
  const [trendFilter, setTrendFilter] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleOpenDetails = (demand: Demand) => {
    setSelectedDemand(demand);
    setIsModalOpen(true);
  };

  const filteredDemands = demands.filter(demand => {
    const matchesSearch = demand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demand.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demand.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || demand.city === selectedCity;
    const matchesNeighborhood = !selectedNeighborhood || demand.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase());
    const matchesCategory = !selectedCategory || demand.category === selectedCategory;
    const matchesSupport = demand.support >= supportRange[0] && demand.support <= supportRange[1];
    const matchesTrend = !trendFilter || 
                        (trendFilter === "trending" && demand.isTrending) ||
                        (trendFilter === "stable" && !demand.isTrending);

    return matchesSearch && matchesCity && matchesNeighborhood && matchesCategory && matchesSupport && matchesTrend;
  });

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

          {/* Summary Cards */}
          <DemandSummaryCards />

          {/* Smart Filters */}
          <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input 
                    placeholder="Buscar por palavra-chave..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Curitiba">Curitiba</SelectItem>
                    <SelectItem value="Londrina">Londrina</SelectItem>
                    <SelectItem value="Maringá">Maringá</SelectItem>
                    <SelectItem value="Cascavel">Cascavel</SelectItem>
                    <SelectItem value="Ponta Grossa">Ponta Grossa</SelectItem>
                    <SelectItem value="Foz do Iguaçu">Foz do Iguaçu</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Segurança">Segurança</SelectItem>
                    <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                    <SelectItem value="Lazer">Lazer</SelectItem>
                    <SelectItem value="Esporte">Esporte</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={trendFilter} onValueChange={setTrendFilter}>
                  <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Tendência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="trending">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Em Alta
                      </div>
                    </SelectItem>
                    <SelectItem value="stable">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-yellow-400" />
                        Estável
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  className="glass-card border-white/20"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avançados
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                  <div>
                    <Input 
                      placeholder="Filtrar por bairro..." 
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Nível de Apoio: {supportRange[0]}% - {supportRange[1]}%</label>
                    <Slider
                      value={supportRange}
                      onValueChange={setSupportRange}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content - Demands Ranking */}
            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-white">Ranking das Demandas Populares</h2>
              <div className="space-y-4">
                {filteredDemands.map((demand, index) => (
                  <DemandCard 
                    key={demand.id} 
                    demand={demand} 
                    onOpenDetails={() => handleOpenDetails(demand)}
                    animationDelay={0.3 + index * 0.05}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-2 space-y-6">
              {/* Voice of People */}
              <VoiceOfPeople />
              
              {/* Suggest Project Form */}
              <SuggestProjectForm />
            </div>
          </div>

          {/* Charts and Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolution Chart */}
            <DemandEvolutionChart />
            
            {/* Strategic Insights */}
            <StrategicInsights />
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
