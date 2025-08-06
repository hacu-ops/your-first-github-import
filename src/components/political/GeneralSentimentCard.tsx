import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import { generatePoliticalData } from "@/utils/politicalData";

interface GeneralSentimentCardProps {
  period: string;
  region: string;
}

const GeneralSentimentCard = ({ period, region }: GeneralSentimentCardProps) => {
  const politicalData = generatePoliticalData(period, region);
  const sentiment = politicalData.sentiment;
  const totalSentiment = sentiment.positive + sentiment.neutral + sentiment.negative;
  
  const sentimentScore = (
    (sentiment.positive * 1) + 
    (sentiment.neutral * 0.5) + 
    (sentiment.negative * 0)
  ) / totalSentiment;

  const getSentimentLevel = (score: number) => {
    if (score >= 0.7) return { label: "Muito Positivo", color: "text-emerald-400", bg: "bg-emerald-500/20" };
    if (score >= 0.6) return { label: "Positivo", color: "text-green-400", bg: "bg-green-500/20" };
    if (score >= 0.4) return { label: "Neutro", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    if (score >= 0.3) return { label: "Negativo", color: "text-orange-400", bg: "bg-orange-500/20" };
    return { label: "Muito Negativo", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const sentimentLevel = getSentimentLevel(sentimentScore);

  return (
    <Card className="glass-card border-white/10 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Heart className="h-5 w-5 text-pink-400" />
          Sentimento Popular Geral
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2 flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Índice Geral de Sentimento</span>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${sentimentLevel.bg} ${sentimentLevel.color}`}>
                {sentimentLevel.label}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 sentiment-slider-progress"
                  style={{ width: `${sentimentScore * 100}%` }}
                />
              </div>
              <span className="absolute -top-6 text-xs font-bold text-white" 
                    style={{ left: `${sentimentScore * 100}%`, transform: 'translateX(-50%)' }}>
                {(sentimentScore * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-white/80">Positivo</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">{sentiment.positive.toFixed(1)}%</span>
                <div className="text-xs text-emerald-400">
                  +2.3% vs período anterior
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-white/80">Neutro</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">{sentiment.neutral.toFixed(1)}%</span>
                <div className="text-xs text-yellow-400">
                  -0.8% vs período anterior
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-white/80">Negativo</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">{sentiment.negative.toFixed(1)}%</span>
                <div className="text-xs text-red-400">
                  -1.5% vs período anterior
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-white" />
            <span className="text-xs text-white/70 font-semibold">
              {region === "all" ? "Todo o Paraná" : region}
            </span>
          </div>
          <p className="text-xs text-white/60">
            Baseado em análise de {(Math.random() * 50000 + 10000).toFixed(0)} interações
            {region !== "all" && ` na região de ${region}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSentimentCard;