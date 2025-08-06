import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Crown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RegionRanking {
  name: string;
  value: number;
  trend: number;
  category: 'top' | 'bottom' | 'rising' | 'declining';
}

const RegionsAnalysis = () => {
  const topRegions: RegionRanking[] = [
    { name: "Curitiba", value: 95, trend: 12, category: 'top' },
    { name: "Londrina", value: 78, trend: 8, category: 'top' },
    { name: "Maringá", value: 72, trend: -3, category: 'top' },
    { name: "Ponta Grossa", value: 68, trend: 15, category: 'top' },
    { name: "Cascavel", value: 65, trend: 6, category: 'top' }
  ];

  const bottomRegions: RegionRanking[] = [
    { name: "Campo Largo", value: 32, trend: -1, category: 'bottom' },
    { name: "Pinhais", value: 35, trend: 8, category: 'bottom' },
    { name: "Apucarana", value: 38, trend: 3, category: 'bottom' },
    { name: "Toledo", value: 42, trend: -2, category: 'bottom' },
    { name: "Araucária", value: 45, trend: 7, category: 'bottom' }
  ];

  const risingRegions: RegionRanking[] = [
    { name: "Ponta Grossa", value: 68, trend: 15, category: 'rising' },
    { name: "Curitiba", value: 95, trend: 12, category: 'rising' },
    { name: "Colombo", value: 55, trend: 11, category: 'rising' },
    { name: "São José dos Pinhais", value: 62, trend: 9, category: 'rising' },
    { name: "Pinhais", value: 35, trend: 8, category: 'rising' }
  ];

  const decliningRegions: RegionRanking[] = [
    { name: "Foz do Iguaçu", value: 58, trend: -8, category: 'declining' },
    { name: "Paranaguá", value: 48, trend: -5, category: 'declining' },
    { name: "Maringá", value: 72, trend: -3, category: 'declining' },
    { name: "Toledo", value: 42, trend: -2, category: 'declining' },
    { name: "Campo Largo", value: 32, trend: -1, category: 'declining' }
  ];

  const RegionList = ({ 
    regions, 
    title, 
    icon: Icon, 
    colorClass,
    bgClass 
  }: { 
    regions: RegionRanking[], 
    title: string, 
    icon: any,
    colorClass: string,
    bgClass: string
  }) => (
    <div className={`p-4 rounded-xl border border-white/10 ${bgClass}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${colorClass}`} />
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        {regions.map((region, index) => (
          <div key={region.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/50 w-4">
                #{index + 1}
              </span>
              <span className="text-sm font-medium text-white">{region.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {region.value}%
              </Badge>
              <span className={`text-xs font-semibold ${
                region.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {region.trend >= 0 ? '+' : ''}{region.trend}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Análise Regional
        </CardTitle>
        <p className="text-sm text-white/70">
          Rankings de popularidade e tendências por região
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegionList
            regions={topRegions}
            title="Regiões Mais Populares"
            icon={Crown}
            colorClass="text-emerald-400"
            bgClass="bg-emerald-500/10"
          />
          
          <RegionList
            regions={bottomRegions}
            title="Regiões Menos Populares"
            icon={AlertTriangle}
            colorClass="text-red-400"
            bgClass="bg-red-500/10"
          />
          
          <RegionList
            regions={risingRegions}
            title="Em Alta"
            icon={TrendingUp}
            colorClass="text-green-400"
            bgClass="bg-green-500/10"
          />
          
          <RegionList
            regions={decliningRegions}
            title="Em Declínio"
            icon={TrendingDown}
            colorClass="text-orange-400"
            bgClass="bg-orange-500/10"
          />
        </div>

        {/* Resumo das insights */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <h4 className="font-semibold text-white mb-2 text-sm">Insights Principais</h4>
          <ul className="text-xs text-white/80 space-y-1">
            <li>• <strong>Curitiba</strong> mantém liderança com 95% de popularidade (+12%)</li>
            <li>• <strong>Ponta Grossa</strong> apresenta o maior crescimento (+15%)</li>
            <li>• <strong>Foz do Iguaçu</strong> mostra maior queda (-8%)</li>
            <li>• Região metropolitana concentra 67% da atividade total</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionsAnalysis;