import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useDataLoading } from "@/hooks/useDataLoading";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { 
  Calendar as CalendarIcon, 
  RefreshCw,
  Download,
  MessageSquare,
  MapPin,
  Heart,
  Hash,
  Filter,
  ChevronsUpDown,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Sidebar from "@/components/Sidebar";
import DemandsList from "@/components/political/DemandsList";
import AlertsPanel from "@/components/political/AlertsPanel";
import ProposalsRanking from "@/components/political/ProposalsRanking";
import TotalInteractionsCard from "@/components/political/TotalInteractionsCard";
import GeneralSentimentCard from "@/components/political/GeneralSentimentCard";
import TopicsCloud from "@/components/political/TopicsCloud";
import { generatePoliticalData } from "@/utils/politicalData";
import { getPeriodComparisonText } from "@/utils/periodUtils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [period, setPeriod] = useState("7d");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const { isCollapsed: sidebarCollapsed, toggleSidebar } = useSidebarState();
  const [customDateRange, setCustomDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const { toast } = useToast();
  const { isLoading, showContent } = useDataLoading(600);

  const politicalData = generatePoliticalData(period, selectedRegion);

  const cities = [
    "Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel",
    "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava",
    "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais",
    "Campo Largo"
  ];

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Bom Dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa Tarde";
    } else {
      return "Boa Noite";
    }
  };

  const handleExport = (format: string) => {
    toast({
      title: "Exportação iniciada",
      description: `Gerando relatório em ${format.toUpperCase()}...`,
      variant: "glass",
      duration: 3000,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Dados atualizados",
      description: "Dashboard atualizado com sucesso!",
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
      />
      
      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-28' : 'ml-72'
        }`}
      >
        <div className="pt-8 p-6 space-y-6 min-h-screen flex flex-col">
          {/* Header */}
          <div className="mb-4 animate-fade-in-up">
            <div className="flex items-end justify-between mb-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {getGreeting()}, Governador!
                </h1>
                <p className="text-xs text-white/70 font-medium">
                  Dashboard política mais poderosa do Brasil - Análise em tempo real
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-semibold">Filtros Globais:</span>
                </div>

                <Popover open={isCityPickerOpen} onOpenChange={setIsCityPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isCityPickerOpen}
                      className="w-48 justify-between glass-card border-white/10 text-xs h-8 hover:bg-white/5 text-white"
                    >
                      <MapPin className="h-3 w-3 mr-2" />
                      <span className="truncate">
                        {selectedRegion === 'all' ? 'Todo o Paraná' : cities.find(c => c === selectedRegion) || 'Selecionar cidade'}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0 glass-card border-0">
                    <Command>
                      <CommandInput placeholder="Pesquisar cidade..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            key="all"
                            value="Todo o Paraná"
                            onSelect={() => {
                              setSelectedRegion("all");
                              setIsCityPickerOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedRegion === "all" ? "opacity-100" : "opacity-0"
                              )}
                            />
                            Todo o Paraná
                          </CommandItem>
                          {cities.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={() => {
                                setSelectedRegion(city);
                                setIsCityPickerOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedRegion === city ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {city}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Select value={period} onValueChange={(value) => {
                  setPeriod(value);
                  if (value === "custom") {
                    setTimeout(() => setIsDatePickerOpen(true), 100);
                  } else {
                    setIsDatePickerOpen(false);
                  }
                }}>
                  <SelectTrigger className="w-40 glass-card border-white/10 text-xs h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="1d">Hoje</SelectItem>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="all_time">Período Total</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>

                {period === "custom" && (
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="glass-card border-white/10 text-xs h-8">
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {customDateRange.from ? (
                          customDateRange.to ? (
                            <>
                              {format(customDateRange.from, "dd/MM", { locale: ptBR })} -{" "}
                              {format(customDateRange.to, "dd/MM", { locale: ptBR })}
                            </>
                          ) : (
                            format(customDateRange.from, "dd/MM", { locale: ptBR })
                          )
                        ) : (
                          "Selecionar período"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 glass-card border-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={customDateRange.from}
                        selected={{
                          from: customDateRange.from,
                          to: customDateRange.to,
                        }}
                        onSelect={(range) => {
                          setCustomDateRange({
                            from: range?.from,
                            to: range?.to
                          });
                          if (range?.from && range?.to) {
                            setIsDatePickerOpen(false);
                            toast({
                              title: "Período selecionado",
                              description: `${format(range.from, "dd/MM/yyyy", { locale: ptBR })} até ${format(range.to, "dd/MM/yyyy", { locale: ptBR })}`,
                              duration: 3000,
                            });
                          }
                        }}
                        numberOfMonths={2}
                        locale={ptBR}
                        className="rounded-md border-0 p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                )}
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline-glow"
                    className="text-xs h-8 px-3"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Recarregar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* NEW LAYOUT - Above the fold */}
          <div className="space-y-6 mb-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <TotalInteractionsCard
                value={politicalData.interactions.total.toLocaleString('pt-BR')}
                subtitle="WhatsApp, Facebook, Instagram e outros"
                change={getPeriodComparisonText(period, politicalData.interactions.trend, customDateRange)}
                changeType={politicalData.interactions.trend > 0 ? "positive" : "negative"}
                period={period}
                region={selectedRegion}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <GeneralSentimentCard period={period} region={selectedRegion} />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <AlertsPanel alerts={politicalData.alerts} />
              </div>
            </div>
          </div>

          {/* Seção: Demandas e Ações */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Demandas e Ações</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-400/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <DemandsList demands={politicalData.demands} />
              <ProposalsRanking proposals={politicalData.proposals} />
              <TopicsCloud period={period} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;