import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  Users, 
  Hash,
  ArrowUp,
  ArrowDown,
  Minus,
  Clock,
  ExternalLink
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface TopicDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: {
    topic: string;
    mentions: number;
    sentiment: string;
    change: number;
  } | null;
}

const TopicDetailsModal = ({ isOpen, onClose, topic }: TopicDetailsModalProps) => {
  const navigate = useNavigate();
  
  if (!topic) return null;

  // Generate detailed data for the topic
  const generateTopicData = () => {
    // Timeline data for last 7 days
    const timelineData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      timelineData.push({
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        mentions: Math.floor(Math.random() * 500 + 100),
        sentiment: Math.random() * 100
      });
    }

    // Cities where topic is trending
    const citiesData = [
      { city: "Curitiba", mentions: Math.floor(Math.random() * 800 + 200), intensity: 85 },
      { city: "Londrina", mentions: Math.floor(Math.random() * 600 + 150), intensity: 72 },
      { city: "Maringá", mentions: Math.floor(Math.random() * 500 + 120), intensity: 68 },
      { city: "Ponta Grossa", mentions: Math.floor(Math.random() * 400 + 100), intensity: 55 },
      { city: "Cascavel", mentions: Math.floor(Math.random() * 350 + 80), intensity: 48 }
    ].sort((a, b) => b.intensity - a.intensity);

    // Related conversations/keywords
    const relatedConversations = [
      "reforma do sistema de saúde estadual",
      "novos leitos de UTI no Paraná", 
      "telemedicina para cidades do interior",
      "contratação de profissionais de saúde",
      "investimento em equipamentos hospitalares"
    ];

    // Key influencers
    const keyInfluencers = [
      { name: "@paranaverde", followers: "45.2K", engagement: "Alto" },
      { name: "@saude_pr_oficial", followers: "128K", engagement: "Muito Alto" },
      { name: "@jornalprnews", followers: "89.3K", engagement: "Médio" },
      { name: "@cidadaopr", followers: "67.1K", engagement: "Alto" }
    ];

    return { timelineData, citiesData, relatedConversations, keyInfluencers };
  };

  const { timelineData, citiesData, relatedConversations, keyInfluencers } = generateTopicData();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-400/20';
      case 'negative': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-4 w-4 text-emerald-400" />;
    if (change < 0) return <ArrowDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2 text-xl">
            <Hash className="h-6 w-6 text-orange-400" />
            {topic.topic}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-white/70">Total de Menções</span>
              </div>
              <p className="text-2xl font-bold text-white">{topic.mentions.toLocaleString('pt-BR')}</p>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(topic.change)}
                <span className={`text-sm font-medium ${
                  topic.change > 0 ? 'text-emerald-400' : 
                  topic.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {topic.change > 0 ? '+' : ''}{topic.change}% vs período anterior
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-white/70">Sentimento Geral</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getSentimentColor(topic.sentiment)} border-0`}>
                  {topic.sentiment === 'positive' ? 'Positivo' : 
                   topic.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                </Badge>
              </div>
              <p className="text-xs text-white/60 mt-1">Baseado em análise de IA</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-sm text-white/70">Última Atualização</span>
              </div>
              <p className="text-lg font-semibold text-white">há 12 min</p>
              <p className="text-xs text-white/60">Dados em tempo real</p>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              Evolução das Menções (7 dias)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mentions"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-400" />
              Distribuição Geográfica
            </h3>
            <div className="space-y-3">
              {citiesData.map((city, index) => (
                <div key={city.city} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/70 w-4">#{index + 1}</span>
                    <span className="text-white font-medium">{city.city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/70">{city.mentions} menções</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getIntensityColor(city.intensity)}`}
                          style={{ width: `${city.intensity}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/60 w-8">{city.intensity}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Conversations & Key Influencers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Related Conversations */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-400" />
                Conversas Relacionadas
              </h3>
              <div className="space-y-2">
                {relatedConversations.map((conversation, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                    <Hash className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{conversation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Influencers */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Principais Influenciadores
              </h3>
              <div className="space-y-3">
                {keyInfluencers.map((influencer, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-white/5">
                    <div>
                      <p className="text-sm font-medium text-white">{influencer.name}</p>
                      <p className="text-xs text-white/60">{influencer.followers} seguidores</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-white/20">
                      {influencer.engagement}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <Separator className="bg-white/10" />
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/60">
              Última atualização: {new Date().toLocaleString('pt-BR')}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="glass-card border-white/10"
                onClick={() => {
                  navigate('/topic-reports', { state: { topic } });
                  onClose();
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Relatório Completo
              </Button>
              <Button variant="outline" size="sm" className="glass-card border-white/10">
                Exportar Dados
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDetailsModal;