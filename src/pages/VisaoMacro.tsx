import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useSidebarState } from "@/hooks/useSidebarState";
import RegionsAnalysis from "@/components/political/RegionsAnalysis";
import RegionalTopics from "@/components/political/RegionalTopics";
import GeneralSentimentCard from "@/components/political/GeneralSentimentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Eye } from "lucide-react";

const VisaoMacro = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className={`flex-1 min-w-0 transition-all duration-300 ${
          isCollapsed ? 'ml-28' : 'ml-72'
        }`}
      >
        <div className="pt-8 p-6 max-w-screen-2xl mx-auto space-y-6 min-h-screen flex flex-col">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-white mb-2">Visão Macro</h1>
            <p className="text-white/70 text-lg">
              Panorama completo da popularidade política no Estado do Paraná
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl font-bold">
                  <Map className="h-6 w-6 text-red-400" />
                  Mapa de Calor Interativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 max-w-3xl">
                  Explore a popularidade e o engajamento em cada município do Paraná. Clique no botão para abrir o mapa interativo em tela cheia e obter insights geográficos detalhados.
                </p>
                <Button 
                  onClick={() => navigate('/visao-macro/mapa')}
                  className="bg-gradient-primary"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar no Mapa
                </Button>
              </CardContent>
            </Card>
            
            <GeneralSentimentCard period="30d" />
            <RegionalTopics />
            <div className="lg:col-span-2">
              <RegionsAnalysis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaoMacro;