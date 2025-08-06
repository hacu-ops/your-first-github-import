import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { useState } from "react";

interface ApprovalChartProps {
  period: string;
}

const ApprovalChart = ({ period }: ApprovalChartProps) => {
  const [timelineFilter, setTimelineFilter] = useState("3m");
  
  // Generate approval data based on timeline
  const generateApprovalData = (timeline: string) => {
    const dataPoints = timeline === "1m" ? 30 : timeline === "3m" ? 90 : timeline === "6m" ? 180 : 365;
    const data = [];
    
    for (let i = dataPoints; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate approval rating with some variation (45-75% range)
      const baseApproval = 62;
      const variation = Math.sin(i / 20) * 8 + Math.random() * 4 - 2;
      const approval = Math.max(45, Math.min(75, baseApproval + variation));
      
      data.push({
        date: date.toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: timeline === "1y" ? 'short' : '2-digit' 
        }),
        approval: Math.round(approval * 10) / 10,
        trend: i < dataPoints / 2 ? 'up' : 'stable'
      });
    }
    
    return data;
  };

  const approvalData = generateApprovalData(timelineFilter);
  const currentApproval = approvalData[approvalData.length - 1]?.approval || 64.2;
  const previousApproval = approvalData[approvalData.length - 8]?.approval || 62.1;
  const trend = currentApproval - previousApproval;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card border-white/10 p-3 rounded-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-primary font-bold">
            {payload[0].value}% de aprovação
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Nível de Aprovação
          </CardTitle>
          
          <Select value={timelineFilter} onValueChange={setTimelineFilter}>
            <SelectTrigger className="w-28 glass-card border-white/10 text-white h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-0">
              <SelectItem value="1m">1 mês</SelectItem>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{currentApproval}%</span>
            <div className={`flex items-center gap-1 ${
              trend >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="font-semibold">
                {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% vs período anterior
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={approvalData}>
              <defs>
                <linearGradient id="approvalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="approval"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#approvalGradient)"
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Additional insights */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-white/70">Maior aprovação</span>
            </div>
            <p className="text-lg font-bold text-white">
              {Math.max(...approvalData.map(d => d.approval)).toFixed(1)}%
            </p>
            <p className="text-xs text-white/60">No período selecionado</p>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-white/70">Menor aprovação</span>
            </div>
            <p className="text-lg font-bold text-white">
              {Math.min(...approvalData.map(d => d.approval)).toFixed(1)}%
            </p>
            <p className="text-xs text-white/60">No período selecionado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalChart;