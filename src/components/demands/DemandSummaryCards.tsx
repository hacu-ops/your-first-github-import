
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, PlusCircle, BarChart, MapPin, TrendingUp } from "lucide-react";

const DemandSummaryCards = () => {
  const summaryData = [
    { 
      title: "Total de Sugestões", 
      value: "1.234", 
      icon: MessageSquare, 
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    { 
      title: "Novas (Últimos 7 dias)", 
      value: "89", 
      icon: PlusCircle, 
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      trend: "+12%"
    },
    { 
      title: "Categoria Principal", 
      value: "Saúde", 
      icon: BarChart, 
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    { 
      title: "Região Mais Ativa", 
      value: "Curitiba", 
      icon: MapPin, 
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      {summaryData.map((item, index) => (
        <Card key={index} className={`glass-card border-white/10 hover:${item.borderColor} transition-all duration-300`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-medium">{item.title}</p>
                <p className="text-3xl font-bold text-white flex items-center gap-2">
                  {item.value}
                  {item.trend && (
                    <span className="text-sm text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {item.trend}
                    </span>
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${item.bgColor} border ${item.borderColor} ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DemandSummaryCards;
