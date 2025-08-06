import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimeSeriesChartProps {
  period: string;
}

// Generate dynamic data based on period
const generateTimeSeriesData = (period: string) => {
  const now = new Date();
  
  switch (period) {
    case '1d':
      // Last 24 hours in 3-hour intervals
      return Array.from({ length: 8 }, (_, i) => {
        const date = subHours(now, (7 - i) * 3);
        return {
          date: format(date, 'HH:mm', { locale: ptBR }),
          cvs: Math.floor(Math.random() * 20) + 5 + i * 2,
          convites: Math.floor(Math.random() * 8) + 2 + i
        };
      });
      
    case '7d':
      // Last 7 days
      return Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        return {
          date: format(date, 'dd/MM', { locale: ptBR }),
          cvs: Math.floor(Math.random() * 30) + 40 + i * 5,
          convites: Math.floor(Math.random() * 12) + 8 + i * 2
        };
      });
      
    case '30d':
      // Last 30 days in 5-day intervals
      return Array.from({ length: 6 }, (_, i) => {
        const date = subDays(now, (5 - i) * 5);
        return {
          date: format(date, 'dd/MM', { locale: ptBR }),
          cvs: Math.floor(Math.random() * 40) + 60 + i * 8,
          convites: Math.floor(Math.random() * 15) + 15 + i * 3
        };
      });
      
    default:
      return generateTimeSeriesData('7d');
  }
};

const TimeSeriesChart = ({ period }: TimeSeriesChartProps) => {
  const data = generateTimeSeriesData(period);
  const getFilteredData = () => {
    // Since we're generating data dynamically, we don't need to filter
    return data;
  };

  const filteredData = getFilteredData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border-0 shadow-2xl backdrop-blur-md bg-black/80" style={{ boxShadow: 'var(--chart-glow-primary)' }}>
          <p className="text-sm text-white font-semibold mb-2">{`Data: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
              />
              <p className="text-sm font-medium text-white">
                {`${entry.name}: ${entry.value}`}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-3 animate-fade-in h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
          CVs vs Convites
        </h3>
        <p className="text-xs text-white/70 font-medium">Análise comparativa do funil</p>
      </div>
      
      <div className="h-48 relative animate-scale-in" style={{ animationDelay: '200ms' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="cvsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(45 100% 60%)" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="hsl(45 100% 60%)" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="convitesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(25 95% 53%)" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="hsl(25 95% 53%)" stopOpacity={0.05}/>
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
              dataKey="date" 
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
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              iconType="circle"
            />
            <Area 
              type="monotone" 
              dataKey="cvs" 
              stroke="hsl(45 100% 60%)" 
              strokeWidth={2}
              fill="url(#cvsGradient)"
              name="CVs Processados"
              dot={false}
              filter="url(#lineGlow)"
              activeDot={{ 
                r: 6, 
                stroke: "hsl(45 100% 60%)", 
                strokeWidth: 2, 
                fill: "hsl(var(--background))",
                style: { 
                  filter: 'drop-shadow(0 0 8px hsl(45 100% 60%))',
                  boxShadow: '0 0 12px hsl(45 100% 60% / 0.6)'
                }
              }}
            />
            <Area 
              type="monotone" 
              dataKey="convites" 
              stroke="hsl(25 95% 53%)" 
              strokeWidth={2}
              fill="url(#convitesGradient)"
              name="Convites Enviados"
              dot={false}
              filter="url(#lineGlow)"
              activeDot={{ 
                r: 6, 
                stroke: "hsl(25 95% 53%)", 
                strokeWidth: 2, 
                fill: "hsl(var(--background))",
                style: { 
                  filter: 'drop-shadow(0 0 8px hsl(25 95% 53%))',
                  boxShadow: '0 0 12px hsl(25 95% 53% / 0.6)'
                }
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Compact Insights Cards */}
      <div className="grid grid-cols-3 gap-2 mt-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Conversão</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '42.5%' : period === '7d' ? '45.9%' : '43.4%'}
          </p>
        </div>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Pico</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '19' : period === '7d' ? '89' : '112'}
          </p>
        </div>
        <div className="glass-card bg-black/40 p-2 text-center group hover:scale-105 transition-transform">
          <p className="text-xs text-white/70 mb-1 uppercase tracking-wider">Tendência</p>
          <p className="text-sm font-bold text-white">
            {period === '1d' ? '+15%' : period === '7d' ? '+12%' : '+8%'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;