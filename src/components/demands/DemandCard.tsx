
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Lightbulb, Rocket, TrendingUp, MapPin, Layers, CheckCircle } from "lucide-react";
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
  status?: "active" | "resolved";
  description?: string;
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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Saúde': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Educação': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Segurança': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Infraestrutura': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Lazer': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Esporte': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getSupportColor = (support: number) => {
    if (support >= 80) return '[&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-green-500';
    if (support >= 60) return '[&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-orange-500';
    return '[&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-red-500';
  };

  return (
    <Card 
      className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up cursor-pointer group"
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={onOpenDetails}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-white/50 font-bold text-lg flex-shrink-0">
              {demand.rank}º
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-lg group-hover:text-white/90 transition-colors line-clamp-2">
                {demand.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/70 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{demand.city}, {demand.neighborhood}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={getCategoryColor(demand.category)}>
              <Layers className="h-3 w-3 mr-1" />
              {demand.category}
            </Badge>
            {demand.isTrending && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Tendência
              </Badge>
            )}
            {demand.status === 'resolved' && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Atendido
              </Badge>
            )}
          </div>
        </div>

        {/* Support Level */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/80">Nível de Apoio Popular</label>
            <span className="font-bold text-white text-lg">{demand.support}%</span>
          </div>
          <Progress 
            value={demand.support} 
            className={`h-3 rounded-full ${getSupportColor(demand.support)}`}
          />
          <p className="text-xs text-white/60">
            Baseado em {demand.suggestions.toLocaleString('pt-BR')} sugestões e apoios da comunidade.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
          <Button 
            onClick={onOpenDetails} 
            variant="ghost" 
            size="sm" 
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Dossiê
          </Button>
          <Button 
            onClick={(e) => handleActionClick(e, "Convertida em Projeto")} 
            variant="ghost" 
            size="sm" 
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Converter em Projeto
          </Button>
          <Button 
            onClick={(e) => handleActionClick(e, "Campanha Criada")} 
            variant="ghost" 
            size="sm" 
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Criar Campanha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandCard;
