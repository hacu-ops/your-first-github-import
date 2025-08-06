
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, AlertCircle, Target } from "lucide-react";

const StrategicInsights = () => {
  const insights = [
    {
      type: "trend",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      title: "Crescimento Significativo",
      description: "Curitiba teve aumento de 38% nas demandas por iluminação em bairros periféricos.",
      priority: "high"
    },
    {
      type: "category",
      icon: Target,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      title: "Mudança de Prioridade",
      description: "Educação voltou ao topo em 11 cidades do interior após período focado em saúde.",
      priority: "medium"
    },
    {
      type: "alert",
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      title: "Atenção Necessária",
      description: "Região metropolitana de Maringá concentra 45% das demandas de saúde do estado.",
      priority: "high"
    },
    {
      type: "opportunity",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      title: "Oportunidade Estratégica",
      description: "Projetos de infraestrutura têm 73% de aprovação quando combinados com melhorias de segurança.",
      priority: "medium"
    }
  ];

  return (
    <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Insights Estratégicos
        </CardTitle>
        <p className="text-sm text-white/70">Análise inteligente das tendências identificadas</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${insight.bgColor} border ${insight.borderColor} hover:bg-white/10 transition-all duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-white/10 ${insight.color} flex-shrink-0`}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {insight.priority === 'high' ? 'Alta' : 'Média'}
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StrategicInsights;
