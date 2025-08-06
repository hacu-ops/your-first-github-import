import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface RegionalApprovalHighlightsProps {
  approvalData: {
    [key: string]: number;
  };
}

const RegionalApprovalHighlights = ({ approvalData }: RegionalApprovalHighlightsProps) => {
  const regions = Object.entries(approvalData).map(([name, value]) => ({
    name,
    value,
    // Simulate a trend for visual purposes
    trend: Math.floor(Math.random() * 10) - 4,
  }));

  const sortedRegions = [...regions].sort((a, b) => b.value - a.value);
  const topRegions = sortedRegions.slice(0, 3);
  const bottomRegions = sortedRegions.slice(-3).reverse();

  const RegionListItem = ({ region }: { region: typeof topRegions[0] }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <span className="font-semibold text-white">{region.name}</span>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">{region.value}%</span>
        <div className={`flex items-center gap-1 text-xs ${
          region.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {region.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{region.trend}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Destaques Regionais de Aprovação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Regions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-emerald-400" />
              <h3 className="font-semibold text-white">Regiões em Destaque</h3>
            </div>
            <div className="space-y-2">
              {topRegions.map(region => <RegionListItem key={region.name} region={region} />)}
            </div>
          </div>

          {/* Bottom Regions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h3 className="font-semibold text-white">Pontos de Atenção</h3>
            </div>
            <div className="space-y-2">
              {bottomRegions.map(region => <RegionListItem key={region.name} region={region} />)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalApprovalHighlights;