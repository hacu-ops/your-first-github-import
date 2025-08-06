import { Brain, TrendingUp, Award, Target } from "lucide-react";

interface ScoreData {
  name: string;
  value: number;
  color: string;
}

interface CandidateScoreAndInsightsProps {
  data: ScoreData[];
  total: number;
  scoreJustification: string;
  choiceExplanation: string;
}

const CandidateScoreAndInsights = ({ 
  data, 
  total, 
  scoreJustification, 
  choiceExplanation 
}: CandidateScoreAndInsightsProps) => {
  return (
    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-2xl p-6 glass-card-hover h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 border border-white/20">
            <Award className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white text-base font-semibold">Score Geral</h3>
            <p className="text-gray-300 text-xs">Análise completa do perfil</p>
          </div>
        </div>
        
        {/* Score Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-white font-bold text-lg">{total}</span>
          <span className="text-white/70 text-sm">/100</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <div className="relative w-28 h-28">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${total * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(45 100% 60%)" />
                  <stop offset="100%" stopColor="hsl(25 95% 53%)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total}</div>
                <div className="text-xs text-gray-300">pontos</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Breakdown */}
        <div className="flex-1 w-full space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-200">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-white">{item.value}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    backgroundColor: item.color,
                    width: `${(item.value / 50) * 100}%` // Assuming max 50 per skill
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Justificativas */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        {/* Score Justification */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-white" />
            <h4 className="text-white text-sm font-medium">Justificativa do Score</h4>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">{scoreJustification}</p>
        </div>

        {/* Choice Explanation */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-white" />
            <h4 className="text-white text-sm font-medium">Justificativa da Escolha</h4>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">{choiceExplanation}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateScoreAndInsights;