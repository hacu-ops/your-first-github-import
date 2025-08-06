import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { PoliticalMetrics } from "@/utils/politicalData";

interface DemandsListProps {
  demands: PoliticalMetrics['demands'];
}

const DemandsList = ({ demands }: DemandsListProps) => {
  const topDemands = demands.slice(0, 15);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Saúde': '🏥',
      'Educação': '📚',
      'Segurança': '🛡️',
      'Economia': '💼',
      'Infraestrutura': '🏗️',
      'Meio Ambiente': '🌱',
      'Transporte': '🚌',
      'Habitação': '🏠',
      'Cultura': '🎭',
      'Esporte': '⚽'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-emerald-400';
    if (trend < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-3 w-3" />;
    if (trend < 0) return <ArrowDown className="h-3 w-3" />;
    return null;
  };

  return (
    <Card className="glass-card border-white/10 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <FileText className="h-5 w-5 text-blue-400" />
          Principais Demandas Populares
        </CardTitle>
        <p className="text-sm text-white/70">
          As 15 categorias mais solicitadas pela população
        </p>
      </CardHeader>
      
      <CardContent className="pt-2 flex flex-col flex-1 justify-between">
        <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-2">
          {topDemands.map((demand, index) => (
            <div 
              key={demand.category}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-lg">
                  {getCategoryIcon(demand.category)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white group-hover:text-white/90 transition-colors">
                    {demand.category}
                  </h4>
                  <p className="text-xs text-white/60">
                    {demand.count.toLocaleString('pt-BR')} solicitações
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Progress bar */}
                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${Math.min(100, (demand.count / topDemands[0].count) * 100)}%` 
                    }}
                  />
                </div>

                {/* Trend indicator */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 ${getTrendColor(demand.trend)}`}>
                  {getTrendIcon(demand.trend)}
                  <span className="text-xs font-semibold">
                    {demand.trend > 0 ? '+' : ''}{demand.trend}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <p className="text-xs text-white/80 font-medium">
              {demands.reduce((total, d) => total + d.count, 0).toLocaleString('pt-BR')} demandas totais registradas
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandsList;