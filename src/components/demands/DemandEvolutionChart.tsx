
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

const DemandEvolutionChart = () => {
  const chartData = [
    {
      name: 'Sem 1',
      Saúde: 65,
      Educação: 45,
      Segurança: 35,
      Infraestrutura: 25,
      Lazer: 15,
    },
    {
      name: 'Sem 2',
      Saúde: 78,
      Educação: 52,
      Segurança: 42,
      Infraestrutura: 38,
      Lazer: 22,
    },
    {
      name: 'Sem 3',
      Saúde: 85,
      Educação: 58,
      Segurança: 48,
      Infraestrutura: 45,
      Lazer: 28,
    },
    {
      name: 'Sem 4',
      Saúde: 92,
      Educação: 65,
      Segurança: 55,
      Infraestrutura: 52,
      Lazer: 35,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-3">
          <p className="text-white font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value} sugestões`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Evolução das Demandas
        </CardTitle>
        <p className="text-sm text-white/70">Volume de sugestões por categoria nas últimas 4 semanas</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
            />
            <Bar dataKey="Saúde" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Educação" fill="#10B981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Segurança" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Infraestrutura" fill="#EF4444" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Lazer" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandEvolutionChart;
