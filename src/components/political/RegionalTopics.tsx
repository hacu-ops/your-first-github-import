import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface RegionalTopic {
  topic: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  trend: number;
  engagement: number;
}

interface RegionTopics {
  region: string;
  topics: RegionalTopic[];
  totalMentions: number;
  dominantSentiment: string;
}

const RegionalTopics = () => {
  const [selectedRegion, setSelectedRegion] = useState("curitiba");

  const regionalData: Record<string, RegionTopics> = {
    curitiba: {
      region: "Curitiba",
      totalMentions: 45678,
      dominantSentiment: "Positivo",
      topics: [
        { topic: "Transporte Público", mentions: 8934, sentiment: 'positive', trend: 15, engagement: 92 },
        { topic: "Ciclofaixas", mentions: 7234, sentiment: 'positive', trend: 23, engagement: 87 },
        { topic: "Parques Urbanos", mentions: 6543, sentiment: 'positive', trend: 8, engagement: 84 },
        { topic: "Educação Municipal", mentions: 5432, sentiment: 'neutral', trend: 5, engagement: 76 },
        { topic: "Segurança", mentions: 4987, sentiment: 'negative', trend: -3, engagement: 89 },
        { topic: "Cultura", mentions: 4234, sentiment: 'positive', trend: 12, engagement: 71 }
      ]
    },
    londrina: {
      region: "Londrina",
      totalMentions: 23456,
      dominantSentiment: "Neutro",
      topics: [
        { topic: "Agricultura", mentions: 5234, sentiment: 'positive', trend: 18, engagement: 88 },
        { topic: "Universidades", mentions: 4567, sentiment: 'positive', trend: 7, engagement: 85 },
        { topic: "Centro Histórico", mentions: 3456, sentiment: 'neutral', trend: 2, engagement: 67 },
        { topic: "Saúde Pública", mentions: 3234, sentiment: 'negative', trend: -8, engagement: 82 },
        { topic: "Economia Local", mentions: 2987, sentiment: 'neutral', trend: 4, engagement: 74 },
        { topic: "Infraestrutura", mentions: 2345, sentiment: 'negative', trend: -5, engagement: 69 }
      ]
    },
    maringa: {
      region: "Maringá",
      totalMentions: 18765,
      dominantSentiment: "Positivo",
      topics: [
        { topic: "Planejamento Urbano", mentions: 4321, sentiment: 'positive', trend: 9, engagement: 91 },
        { topic: "Áreas Verdes", mentions: 3654, sentiment: 'positive', trend: 14, engagement: 86 },
        { topic: "Turismo", mentions: 2987, sentiment: 'positive', trend: 6, engagement: 78 },
        { topic: "Comércio", mentions: 2456, sentiment: 'neutral', trend: -2, engagement: 72 },
        { topic: "Trânsito", mentions: 2234, sentiment: 'negative', trend: -7, engagement: 83 },
        { topic: "Esportes", mentions: 1987, sentiment: 'positive', trend: 11, engagement: 75 }
      ]
    },
    cascavel: {
      region: "Cascavel",
      totalMentions: 15432,
      dominantSentiment: "Neutro",
      topics: [
        { topic: "Agronegócio", mentions: 3876, sentiment: 'positive', trend: 12, engagement: 89 },
        { topic: "Desenvolvimento", mentions: 2987, sentiment: 'positive', trend: 8, engagement: 81 },
        { topic: "Habitação", mentions: 2345, sentiment: 'neutral', trend: 3, engagement: 68 },
        { topic: "Educação", mentions: 2234, sentiment: 'positive', trend: 5, engagement: 76 },
        { topic: "Meio Ambiente", mentions: 1987, sentiment: 'negative', trend: -4, engagement: 84 },
        { topic: "Tecnologia", mentions: 1654, sentiment: 'positive', trend: 15, engagement: 73 }
      ]
    }
  };

  const currentData = regionalData[selectedRegion];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'negative': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Positivo';
      case 'negative': return 'Negativo';
      default: return 'Neutro';
    }
  };

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Hash className="h-5 w-5 text-orange-400" />
          Assuntos por Região
        </CardTitle>
        
        <div className="flex items-center gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 glass-card border-white/10 text-white">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-0">
              <SelectItem value="curitiba">Curitiba</SelectItem>
              <SelectItem value="londrina">Londrina</SelectItem>
              <SelectItem value="maringa">Maringá</SelectItem>
              <SelectItem value="cascavel">Cascavel</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="text-sm text-white/70">
            <span className="font-medium">{currentData.totalMentions.toLocaleString('pt-BR')}</span> menções totais
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Resumo da região */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">{currentData.region}</h3>
              <p className="text-sm text-white/70">Sentimento predominante: {currentData.dominantSentiment}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{currentData.totalMentions.toLocaleString('pt-BR')}</div>
              <div className="text-xs text-white/70">menções este mês</div>
            </div>
          </div>
        </div>

        {/* Lista de tópicos */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {currentData.topics.map((topic, index) => (
            <div 
              key={topic.topic}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-sm font-bold text-white/50 w-6">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{topic.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/60">
                      {topic.mentions.toLocaleString('pt-BR')} menções
                    </span>
                    <span className="text-xs text-white/60">•</span>
                    <span className="text-xs text-white/60">
                      {topic.engagement}% engajamento
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`text-xs border ${getSentimentColor(topic.sentiment)}`}>
                  {getSentimentLabel(topic.sentiment)}
                </Badge>
                
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  <TrendingUp className={`h-3 w-3 ${
                    topic.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`} />
                  <span className={`text-xs font-semibold ${
                    topic.trend >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {topic.trend >= 0 ? '+' : ''}{topic.trend}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="h-4 w-4 text-orange-400" />
            <p className="text-xs text-white/80 font-medium">
              Insights para {currentData.region}
            </p>
          </div>
          <ul className="text-xs text-white/70 space-y-1">
            {selectedRegion === 'curitiba' && (
              <>
                <li>• Transporte público e mobilidade urbana são os temas de maior destaque</li>
                <li>• Forte engajamento em questões ambientais e sustentabilidade</li>
                <li>• Segurança apresenta sentimento misto, mas alto engajamento</li>
              </>
            )}
            {selectedRegion === 'londrina' && (
              <>
                <li>• Agricultura é o tema dominante com sentimento muito positivo</li>
                <li>• Universidades geram grande engajamento na comunidade</li>
                <li>• Saúde pública requer mais atenção (-8% na tendência)</li>
              </>
            )}
            {selectedRegion === 'maringa' && (
              <>
                <li>• Planejamento urbano é amplamente elogiado pelos cidadãos</li>
                <li>• Áreas verdes são um diferencial da cidade</li>
                <li>• Trânsito é o principal ponto de crítica (-7%)</li>
              </>
            )}
            {selectedRegion === 'cascavel' && (
              <>
                <li>• Agronegócio impulsiona discussões sobre desenvolvimento</li>
                <li>• Tecnologia emergindo como novo foco de interesse</li>
                <li>• Questões ambientais demandam maior atenção</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalTopics;