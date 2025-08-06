import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Lightbulb, Rocket, TrendingUp, MapPin, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Demand {
  id: number;
  rank: number;
  name: string;
  city: string;
  neighborhood: string;
  category: string;
  suggestions: number;
  support: number;
  isTrending: boolean;
}

interface DemandCardProps {
  demand: Demand;
  onOpenDetails: () => void;
  animationDelay: number;
}

const DemandCard = ({ demand, onOpenDetails, animationDelay }: DemandCardProps) => {
  const { toast } = useToast();

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    toast({
      title: "Ação Registrada",
      description: `${action} para "${demand.name}"`,
      variant: "glass",
    });
  };

  return (
    <Card 
      className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white/50">{demand.rank}º</span>
            <div>
              <h3 className="font-bold text-white text-lg">{demand.name}</h3>
              <div className="flex items-center gap-4 text-xs text-white/70 mt-1">
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span>{demand.city}</span></div>
                <div className="flex items-center gap-1"><Layers className="h-3 w-3" /><span>{demand.category}</span></div>
              </div>
            </div>
          </div>
          {demand.isTrending && <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30"><TrendingUp className="h-3 w-3 mr-1" />Tendência</Badge>}
        </div>

        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-white/80">Nível de Apoio Popular</label>
          <div className="flex items-center gap-3">
            <Progress value={demand.support} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-yellow-500" />
            <span className="font-bold text-white">{demand.support}%</span>
          </div>
          <p className="text-xs text-white/60">Baseado em {demand.suggestions} sugestões e apoios.</p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
          <Button onClick={onOpenDetails} variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            <Eye className="h-4 w-4 mr-2" />
            Ver Dossiê
          </Button>
          <Button onClick={(e) => handleActionClick(e, "Convertida em Oportunidade")} variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            <Lightbulb className="h-4 w-4 mr-2" />
            Converter
          </Button>
          <Button onClick={(e) => handleActionClick(e, "Campanha Criada")} variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            <Rocket className="h-4 w-4 mr-2" />
            Criar Campanha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandCard;