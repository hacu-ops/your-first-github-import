
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Layers, Users, BarChart, MessageSquare, Cloud, TrendingUp, CheckCircle, Calendar, ThumbsUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type Demand } from "./DemandCard";

interface DemandDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

const DemandDetailsModal = ({ isOpen, onClose, demand }: DemandDetailsModalProps) => {
  if (!demand) return null;

  const mockSentimentData = [
    { name: 'Positivo', value: 65, color: '#10B981' },
    { name: 'Neutro', value: 25, color: '#6B7280' },
    { name: 'Negativo', value: 10, color: '#EF4444' }
  ];

  const mockTrendData = [
    { name: 'Sem 1', sugestões: 25 },
    { name: 'Sem 2', sugestões: 45 },
    { name: 'Sem 3', sugestões: 78 },
    { name: 'Sem 4', sugestões: demand.suggestions }
  ];

  const mockKeywords = [
    { word: 'urgente', size: 24, color: '#EF4444' },
    { word: 'necessário', size: 20, color: '#10B981' },
    { word: 'comunidade', size: 18, color: '#3B82F6' },
    { word: 'melhorar', size: 16, color: '#8B5CF6' },
    { word: 'importante', size: 14, color: '#F59E0B' },
    { word: 'família', size: 12, color: '#06B6D4' }
  ];

  const mockComments = [
    "Essa creche é uma necessidade urgente para as mães que trabalham na região. Nossos filhos merecem um lugar seguro e acolhedor.",
    "Já passou da hora de investirem na educação infantil aqui no Jardim das Américas. É uma promessa antiga que precisa sair do papel.",
    "Como mãe de duas crianças pequenas, sei o quanto isso faria diferença na vida das famílias trabalhadoras do bairro.",
    "A lista de espera para creche aqui está gigantesca. Precisamos de mais vagas urgentemente.",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto text-white">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-white text-2xl font-bold">{demand.name}</DialogTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-white/70">{demand.city} - {demand.neighborhood}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-400" />
              <span className="text-white/70">{demand.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-white/70">{demand.suggestions} sugestões</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-yellow-400" />
              <span className="text-white/70">{demand.support}% de apoio</span>
            </div>
          </div>
          {demand.description && (
            <p className="text-white/80 leading-relaxed">{demand.description}</p>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Trend Evolution */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Evolução da Demanda
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sugestões" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <BarChart className="h-5 w-5 text-blue-400" />
                Análise de Sentimento
              </h3>
              <div className="space-y-3">
                {mockSentimentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white/80">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-white/10 rounded-full">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${item.value}%`, 
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                      <span className="text-white font-semibold text-sm">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keywords Cloud */}
        <Card className="glass-card border-white/10 mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
              <Cloud className="h-5 w-5 text-purple-400" />
              Palavras-Chave Mais Mencionadas
            </h3>
            <div className="flex flex-wrap gap-4 justify-center py-8">
              {mockKeywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="font-bold hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ 
                    fontSize: `${keyword.size}px`,
                    color: keyword.color
                  }}
                >
                  {keyword.word}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Comments */}
        <Card className="glass-card border-white/10 mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
              <MessageSquare className="h-5 w-5 text-green-400" />
              Comentários Mais Relevantes
            </h3>
            <div className="space-y-4">
              {mockComments.map((comment, index) => (
                <blockquote 
                  key={index}
                  className="border-l-4 border-green-400 pl-4 py-2 text-white/80 italic leading-relaxed bg-white/5 rounded-r-lg"
                >
                  "{comment}"
                </blockquote>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-white/10 my-6" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Calendar className="h-4 w-4" />
            <span>Última atualização: há 2 horas</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
              Vincular a Projeto Existente
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Converter em Oportunidade
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemandDetailsModal;
