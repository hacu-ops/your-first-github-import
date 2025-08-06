import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { MessageSquare, TrendingUp } from "lucide-react";

interface InteractionChartProps {
  period: string;
}

const InteractionChart = ({ period }: InteractionChartProps) => {
  // Generate mock data based on period
  const generateData = () => {
    const days = period === '1d' ? 24 : period === '7d' ? 7 : 30;
    const baseValue = period === '1d' ? 800 : period === '7d' ? 2200 : 15000;
    
    return Array.from({ length: days }, (_, i) => {
      const variation = 0.7 + Math.random() * 0.6;
      return {
        period: period === '1d' ? `${i}h` : period === '7d' ? `Dia ${i + 1}` : `${i + 1}`,
        whatsapp: Math.round(baseValue * 0.7 * variation),
        facebook: Math.round(baseValue * 0.15 * variation),
        instagram: Math.round(baseValue * 0.1 * variation),
        outros: Math.round(baseValue * 0.05 * variation),
        total: Math.round(baseValue * variation),
      };
    });
  };

  const data = generateData();
  const totalInteractions = data.reduce((sum, item) => sum + item.total, 0);
  const avgGrowth = 12.5;

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Interações por Canal
          </CardTitle>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">
              +{avgGrowth}% vs período anterior
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <span>Total: {totalInteractions.toLocaleString('pt-BR')} interações</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span>Outros</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="whatsapp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="facebook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="instagram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="period" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(20px)'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Area
                type="monotone"
                dataKey="whatsapp"
                stackId="1"
                stroke="#10b981"
                fill="url(#whatsapp)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="facebook"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#facebook)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="instagram"
                stackId="1"
                stroke="#8b5cf6"
                fill="url(#instagram)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="outros"
                stackId="1"
                stroke="#f97316"
                fill="rgba(249,115,22,0.1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractionChart;