import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreHistogramProps {
  period: string;
}

// Generate dynamic score data based on period
const generateScoreData = (period: string) => {
  const baseData = {
    '1d': [
      { range: '0-20', count: 2, percentage: '8%' },
      { range: '21-40', count: 3, percentage: '12%' },
      { range: '41-60', count: 6, percentage: '24%' },
      { range: '61-80', count: 9, percentage: '36%' },
      { range: '81-100', count: 5, percentage: '20%' },
    ],
    '7d': [
      { range: '0-20', count: 5, percentage: '4%' },
      { range: '21-40', count: 12, percentage: '10%' },
      { range: '41-60', count: 28, percentage: '23%' },
      { range: '61-80', count: 45, percentage: '37%' },
      { range: '81-100', count: 32, percentage: '26%' },
    ],
    '30d': [
      { range: '0-20', count: 18, percentage: '5%' },
      { range: '21-40', count: 35, percentage: '9%' },
      { range: '41-60', count: 89, percentage: '24%' },
      { range: '61-80', count: 142, percentage: '38%' },
      { range: '81-100', count: 89, percentage: '24%' },
    ]
  };

  return baseData[period] || baseData['7d'];
};

const ScoreHistogram = ({ period }: ScoreHistogramProps) => {
  const scoreData = generateScoreData(period);
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = scoreData.find(d => d.range === label);
      return (
        <div className="glass-card p-4 border-0 shadow-2xl backdrop-blur-md bg-black/80" style={{ boxShadow: 'var(--chart-glow-primary)' }}>
          <p className="text-sm text-white font-semibold mb-2">{`Score: ${label}`}</p>
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                background: 'linear-gradient(180deg, hsl(45 100% 60%), hsl(25 95% 53%))',
                boxShadow: '0 0 12px hsl(45 100% 60% / 0.6)'
              }}
            />
            <p className="text-sm font-medium text-white">
              {`Candidatos: ${payload[0].value}`}
            </p>
          </div>
          <p className="text-xs text-white/70">
            {`Percentual: ${data?.percentage}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-3 animate-fade-in h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
          Distribuição de Score
        </h3>
        <p className="text-xs text-white/70 font-medium">Qualidade dos candidatos por faixa</p>
      </div>
      
      <div className="flex-1 relative mb-3 animate-scale-in h-48" style={{ animationDelay: '300ms' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={scoreData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(45 100% 60%)" />
                <stop offset="100%" stopColor="hsl(25 95% 53%)" />
              </linearGradient>
              <filter id="barGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="1 3" 
              stroke="hsl(var(--glass-border))" 
              opacity={0.2}
              vertical={false}
            />
            <XAxis 
              dataKey="range" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar 
              dataKey="count" 
              fill="url(#barGradient)"
              radius={[12, 12, 0, 0]}
              filter="url(#barGlow)"
              style={{
                filter: 'drop-shadow(0 4px 8px hsl(45 100% 60% / 0.2))'
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Compact Summary Stats */}
      <div className="grid grid-cols-3 gap-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Média</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '76.4' : period === '7d' ? '73.2' : '74.8'}
          </p>
        </div>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Máximo</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '92' : period === '7d' ? '98' : '96'}
          </p>
        </div>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Mínimo</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '28' : period === '7d' ? '15' : '12'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreHistogram;