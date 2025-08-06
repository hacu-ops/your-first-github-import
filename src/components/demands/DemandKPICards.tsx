import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, PlusCircle, BarChart, MapPin } from "lucide-react";

const DemandKPICards = () => {
  const kpis = [
    { title: "Total de Sugestões", value: "1,234", icon: MessageSquare, color: "text-blue-400" },
    { title: "Novas (Últimos 7 dias)", value: "89", icon: PlusCircle, color: "text-green-400" },
    { title: "Categoria Principal", value: "Saúde", icon: BarChart, color: "text-purple-400" },
    { title: "Região Mais Ativa", value: "Curitiba", icon: MapPin, color: "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      {kpis.map((kpi, index) => (
        <Card key={index} className="glass-card border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${kpi.color}`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-white/70">{kpi.title}</p>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DemandKPICards;