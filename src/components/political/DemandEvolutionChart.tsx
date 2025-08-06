import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, FileText, CheckCircle } from "lucide-react";

interface DemandEvolutionChartProps {
  period: string;
}

const DemandEvolutionChart = ({ period }: DemandEvolutionChartProps) => {
  // Generate mock data based on period
  const generateData = () => {
    const points = period === '1d' ? 24 : period === '7d' ? 7 : 30;
    
    return Array.from({ length: points }, (_, i) => {
      const baseReceived = period === '1d' ? 45 : period === '7d' ? 280 : 1200;
      const baseResolved = period === '1d' ? 32 : period === '7d' ? 210 : 950;
      
      const variation = 0.7 + Math.random() * 0.6;
      const received = Math.round(baseReceived * variation);
      const resolved = Math.round(Math.min(received * 0.85, baseResolved * variation));
      
      return {
        period: period === '1d' ? `${i}h` : period === '7d' ? `Dia ${i + 1}` : `${i + 1}`,
        recebidas: received,
        atendidas: resolved,
        pendentes: received - resolved,
      };
    });
  };

  const data = generateData();
  const totalReceived = data.reduce((sum, item) => sum + item.recebidas, 0);
  const totalResolved = data.reduce((sum, item) => sum + item.atendidas, 0);
  const resolutionRate = ((totalResolved / totalReceived) * 100).toFixed(1);

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          Evolução: Demandas vs Respostas
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <span>Taxa de Resolução: {resolutionRate}%</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Recebidas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>Atendidas</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              <Line
                type="monotone"
                dataKey="recebidas"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="atendidas"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <FileText className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-blue-300">Recebidas</p>
            <p className="text-xl font-bold text-white">{totalReceived.toLocaleString('pt-BR')}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-emerald-300">Atendidas</p>
            <p className="text-xl font-bold text-white">{totalResolved.toLocaleString('pt-BR')}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <TrendingUp className="h-5 w-5 text-orange-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-orange-300">Taxa</p>
            <p className="text-xl font-bold text-white">{resolutionRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandEvolutionChart;