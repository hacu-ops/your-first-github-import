import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Heart, TrendingUp } from "lucide-react";
import { PoliticalMetrics } from "@/utils/politicalData";

interface ProposalsRankingProps {
  proposals: PoliticalMetrics['proposals'];
}

const ProposalsRanking = ({ proposals }: ProposalsRankingProps) => {
  const getRankingIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Social': 'text-green-400 bg-green-400/20 border-green-400/30',
      'Transporte': 'text-blue-400 bg-blue-400/20 border-blue-400/30',
      'Educação': 'text-purple-400 bg-purple-400/20 border-purple-400/30',
      'Saúde': 'text-red-400 bg-red-400/20 border-red-400/30',
      'Economia': 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
    };
    return colors[category as keyof typeof colors] || 'text-gray-400 bg-gray-400/20 border-gray-400/30';
  };

  const getProgressBarColor = (support: number) => {
    if (support >= 80) return 'bg-gradient-to-r from-green-400 to-emerald-500';
    if (support >= 60) return 'bg-gradient-to-r from-blue-400 to-cyan-500';
    if (support >= 40) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  return (
    <Card className="glass-card border-white/10 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Projetos com Maior Engajamento
        </CardTitle>
        <p className="text-sm text-white/70">
          Projetos e propostas com maior apoio popular
        </p>
      </CardHeader>
      
      <CardContent className="pt-2 flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          {proposals.map((proposal, index) => (
            <div 
              key={proposal.title}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="text-lg font-bold text-white/70 min-w-[2rem]">
                  {getRankingIcon(index)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white group-hover:text-white/90 transition-colors leading-tight">
                      {proposal.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(proposal.category)} ml-2`}>
                      {proposal.category}
                    </span>
                  </div>

                  {/* Support percentage and progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Apoio popular</span>
                      <span className="text-lg font-bold text-white">{proposal.support}%</span>
                    </div>
                    
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${getProgressBarColor(proposal.support)}`}
                        style={{ width: `${proposal.support}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Heart className="h-3 w-3" />
                      <span>{Math.round(proposal.support * 142).toLocaleString('pt-BR')} pessoas apoiam</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-yellow-400" />
            <p className="text-xs text-white/80 font-medium">
              Sistema de votação popular ativo - {proposals.reduce((total, p) => total + (p.support * 142), 0).toLocaleString('pt-BR')} votos totais
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalsRanking;