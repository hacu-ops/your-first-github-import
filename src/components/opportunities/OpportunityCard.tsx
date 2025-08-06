import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, MapPin, Layers, Eye, TrendingUp, Zap } from "lucide-react";
import { Opportunity } from "@/utils/electoralData";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onOpenDetails: () => void;
  animationDelay: number;
}

const OpportunityCard = ({ opportunity, onOpenDetails, animationDelay }: OpportunityCardProps) => {
  const getImpactColor = (score: number) => {
    if (score > 90) return "bg-emerald-500";
    if (score > 75) return "bg-green-500";
    if (score > 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <Card 
      className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white/50">{opportunity.rank}º</span>
            <h3 className="font-bold text-white text-lg">{opportunity.title}</h3>
          </div>
          <div className="flex gap-2">
            {opportunity.type === 'emerging' && <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30"><TrendingUp className="h-3 w-3 mr-1" />Emergente</Badge>}
            {opportunity.type === 'strategic' && <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30"><Zap className="h-3 w-3 mr-1" />Estratégico</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
          <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{opportunity.citations} sugestões</span></div>
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{opportunity.city}</span></div>
          <div className="flex items-center gap-1"><Layers className="h-4 w-4" /><span>{opportunity.category}</span></div>
        </div>

        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-white/80">Impacto Potencial</label>
          <div className="flex items-center gap-3">
            <Progress value={opportunity.impactScore} className={`h-2 [&>div]:${getImpactColor(opportunity.impactScore)}`} />
            <span className="font-bold text-white">{opportunity.impactScore}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onOpenDetails} variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;