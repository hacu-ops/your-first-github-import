import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, Layers, AlertTriangle, Download, Send } from "lucide-react";
import { mockOpportunities, Opportunity } from "@/utils/electoralData";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import OpportunityDetailsModal from "@/components/opportunities/OpportunityDetailsModal";
import InsightForm from "@/components/opportunities/InsightForm";

const ElectoralOpportunities = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white">Central de Oportunidades Eleitorais</h1>
            <p className="text-white/70 mt-1">Veja onde o povo está pedindo mudança. Priorize ações, alinhe pautas e amplifique seu impacto.</p>
          </div>

          {/* Filters */}
          <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </div>
              <Select><SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white"><MapPin className="h-4 w-4 mr-2" /><SelectValue placeholder="Cidade" /></SelectTrigger></Select>
              <Select><SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white"><Layers className="h-4 w-4 mr-2" /><SelectValue placeholder="Categoria" /></SelectTrigger></Select>
              <Select><SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white"><AlertTriangle className="h-4 w-4 mr-2" /><SelectValue placeholder="Urgência" /></SelectTrigger></Select>
              <div className="flex-grow" />
              <Button variant="outline" className="glass-card border-white/20"><Download className="h-4 w-4 mr-2" />Exportar PDF</Button>
              <Button variant="outline" className="glass-card border-white/20"><Download className="h-4 w-4 mr-2" />Exportar Excel</Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ranking Section */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-white">Ranking de Oportunidades</h2>
              {opportunities.map((opp, index) => (
                <OpportunityCard 
                  key={opp.id} 
                  opportunity={opp} 
                  onOpenDetails={() => handleOpenDetails(opp)}
                  animationDelay={0.2 + index * 0.05}
                />
              ))}
            </div>

            {/* Insight Form Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Enviar Insight Interno</h2>
              <InsightForm />
            </div>
          </div>
        </div>
      </div>

      <OpportunityDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunity={selectedOpportunity}
      />
    </div>
  );
};

export default ElectoralOpportunities;