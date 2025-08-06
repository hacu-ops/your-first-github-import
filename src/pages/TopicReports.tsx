import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebarState } from "@/hooks/useSidebarState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import { 
  ArrowLeft, 
  Hash, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  MapPin,
  Calendar,
  Lightbulb,
  BarChart3,
  Activity,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const TopicReports = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;
  const { isCollapsed, toggleSidebar } = useSidebarState();

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-full">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Tópico não encontrado</h2>
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Generate comprehensive data for the topic
  const generateDetailedAnalysis = () => {
    // Advanced timeline data
    const timelineData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      timelineData.push({
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        mentions: Math.floor(Math.random() * 800 + 200),
        sentiment: Math.random() * 100,
        engagement: Math.floor(Math.random() * 500 + 100),
        reach: Math.floor(Math.random() * 50000 + 10000)
      });
    }

    // Sentiment distribution
    const sentimentData = [
      { name: 'Positivo', value: 45, color: '#10b981' },
      { name: 'Neutro', value: 35, color: '#6b7280' },
      { name: 'Negativo', value: 20, color: '#ef4444' }
    ];

    // Platform distribution
    const platformData = [
      { platform: "Twitter", mentions: 2340, percentage: 42 },
      { platform: "Instagram", mentions: 1890, percentage: 34 },
      { platform: "Facebook", mentions: 980, percentage: 18 },
      { platform: "LinkedIn", mentions: 320, percentage: 6 }
    ];

    // Key conversations
    const keyConversations = [
      {
        id: 1,
        text: "A nova política de saúde do estado está sendo muito bem recebida pela população. Finalmente algo concreto!",
        author: "@cidadaopr",
        engagement: 234,
        sentiment: "positive",
        platform: "Twitter",
        timestamp: "2h"
      },
      {
        id: 2,
        text: "Precisamos de mais transparência sobre como os recursos da saúde estão sendo aplicados",
        author: "@transparenciapr",
        engagement: 156,
        sentiment: "neutral",
        platform: "Facebook",
        timestamp: "4h"
      },
      {
        id: 3,
        text: "Os novos hospitais no interior vão fazer toda a diferença para nossa região",
        author: "@interiorpr",
        engagement: 189,
        sentiment: "positive",
        platform: "Instagram",
        timestamp: "6h"
      }
    ];

    // AI recommendations
    const aiRecommendations = [
      {
        type: "opportunity",
        title: "Amplificar narrativa positiva",
        description: "O sentimento está 73% positivo. Aproveite para compartilhar mais conquistas na área da saúde.",
        priority: "high",
        action: "Criar campanha de comunicação destacando resultados"
      },
      {
        type: "risk",
        title: "Monitorar questionamentos sobre transparência",
        description: "Há crescente demanda por informações sobre aplicação de recursos.",
        priority: "medium",
        action: "Publicar relatório de prestação de contas"
      },
      {
        type: "engagement",
        title: "Engajar com influenciadores locais",
        description: "Perfis do interior estão compartilhando conteúdo positivo.",
        priority: "high",
        action: "Estabelecer parcerias com lideranças regionais"
      }
    ];

    return { timelineData, sentimentData, platformData, keyConversations, aiRecommendations };
  };

  const { timelineData, sentimentData, platformData, keyConversations, aiRecommendations } = generateDetailedAnalysis();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-400/20';
      case 'negative': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4" />;
      case 'risk': return <AlertCircle className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={isCollapsed ? "lg:pl-24" : "lg:pl-72"}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="glass-card border-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Hash className="h-6 w-6 text-orange-400" />
                <h1 className="text-2xl font-bold text-white">{topic.topic}</h1>
                <Badge className={`${getSentimentColor(topic.sentiment)} border-0 ml-2`}>
                  {topic.sentiment === 'positive' ? 'Positivo' : 
                   topic.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-white/60">
              Última atualização: {new Date().toLocaleString('pt-BR')}
            </div>
          </div>

          {/* Overview KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white/70">Total de Menções</span>
                </div>
                <p className="text-2xl font-bold text-white">{topic.mentions.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-emerald-400">+{topic.change}% vs período anterior</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-white/70">Engajamento</span>
                </div>
                <p className="text-2xl font-bold text-white">12.4K</p>
                <p className="text-xs text-emerald-400">+23% vs período anterior</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-white/70">Alcance</span>
                </div>
                <p className="text-2xl font-bold text-white">850K</p>
                <p className="text-xs text-emerald-400">+31% vs período anterior</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white/70">Score de Impacto</span>
                </div>
                <p className="text-2xl font-bold text-white">87/100</p>
                <p className="text-xs text-emerald-400">Alto impacto</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="glass-card border-white/10">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="conversations">Conversas</TabsTrigger>
              <TabsTrigger value="ai-insights">Insights de IA</TabsTrigger>
              <TabsTrigger value="geographic">Geografia</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Timeline and Sentiment */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        Evolução das Menções (30 dias)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
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
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-400" />
                        Distribuição do Sentimento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={sentimentData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {sentimentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2 mt-4">
                        {sentimentData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm text-white/80">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-white">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Platform Distribution */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-400" />
                    Distribuição por Plataforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium w-20">{platform.platform}</span>
                          <div className="flex-1 max-w-xs">
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${platform.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-white/70">{platform.mentions} menções</span>
                          <span className="text-sm font-medium text-white w-8">{platform.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                    Principais Conversas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyConversations.map((conversation) => (
                      <div key={conversation.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-blue-400">{conversation.author}</span>
                            <Badge variant="outline" className="text-xs border-white/20">
                              {conversation.platform}
                            </Badge>
                            <Badge className={`${getSentimentColor(conversation.sentiment)} border-0 text-xs`}>
                              {conversation.sentiment === 'positive' ? 'Positivo' : 
                               conversation.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                            </Badge>
                          </div>
                          <span className="text-xs text-white/60">{conversation.timestamp}</span>
                        </div>
                        <p className="text-white/80 text-sm mb-2">{conversation.text}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span>{conversation.engagement} interações</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    Recomendações de IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiRecommendations.map((recommendation, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-2 mb-2">
                            {getRecommendationIcon(recommendation.type)}
                            <h3 className="text-white font-medium">{recommendation.title}</h3>
                            <Badge className={`${getPriorityColor(recommendation.priority)} border-0 text-xs`}>
                              {recommendation.priority === 'high' ? 'Alta' : 
                               recommendation.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{recommendation.description}</p>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">Ação recomendada:</span>
                          <span className="text-sm text-white/80">{recommendation.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-400" />
                    Análise Geográfica Detalhada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Mapa de calor interativo em desenvolvimento</p>
                    <p className="text-sm text-white/40 mt-2">Visualização regional das menções e sentimentos</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TopicReports;