import { Brain, Sparkles, TrendingUp, Target } from "lucide-react";

interface CandidateInsightsProps {
  scoreJustification: string;
  choiceExplanation: string;
  score: number;
}

const CandidateInsights = ({ 
  scoreJustification,
  choiceExplanation,
  score
}: CandidateInsightsProps) => {
  return (
    <div className="space-y-4">
      {/* Score Justification */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-2xl border border-blue-500/30 hover:border-blue-500/40 hover:bg-blue-500/25 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-blue-500/20 border border-blue-500/30">
            <Brain className="w-4 h-4 text-blue-300" />
          </div>
          <h3 className="text-white text-base font-semibold">Justificativa do Score</h3>
        </div>
        <p className="text-blue-100 leading-relaxed">{scoreJustification}</p>
      </div>

      {/* Choice Explanation */}
      <div className="glass-card p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-2xl border border-purple-500/30 hover:border-purple-500/40 hover:bg-purple-500/25 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-purple-500/20 border border-purple-500/30">
            <Target className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="text-white text-base font-semibold">Justificativa da Escolha</h3>
        </div>
        <p className="text-purple-100 leading-relaxed">{choiceExplanation}</p>
      </div>
    </div>
  );
};

export default CandidateInsights;