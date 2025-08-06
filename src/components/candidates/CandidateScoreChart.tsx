import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { TrendingUp, Award } from "lucide-react";

interface ScoreData {
  name: string;
  value: number;
  color: string;
}

interface CandidateScoreChartProps {
  data: ScoreData[];
  total: number;
}

const CandidateScoreChart = ({ data, total }: CandidateScoreChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-white text-sm font-medium">{payload[0].name}</p>
          <p className="text-primary text-xs">{payload[0].value} pontos</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-lg h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500/20 border border-blue-500/30">
            <Award className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <h3 className="text-white text-base font-semibold">Score Geral</h3>
            <p className="text-blue-200 text-xs">Análise completa do perfil</p>
          </div>
        </div>
        
        {/* Score Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/30">
          <TrendingUp className="w-3 h-3 text-blue-300" />
          <span className="text-white font-bold text-lg">{total}</span>
          <span className="text-blue-200 text-sm">/100</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
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
                  <span className="text-xs text-blue-100">{item.name}</span>
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
    </div>
  );
};

export default CandidateScoreChart;