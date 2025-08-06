import React from "react";
import { X, MapPin, TrendingUp, TrendingDown, Users, MessageSquare, Hash, Heart } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoliticalMetrics } from "@/utils/politicalData";

interface CityData {
  city: string;
  value: number;
  population: number;
  trend: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics: string[];
  demographics: {
    age_18_30: number;
    age_31_45: number;
    age_46_60: number;
    age_60_plus: number;
  };
}

interface CityModalProps {
  city: CityData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CityModal = ({ city, isOpen, onClose }: CityModalProps) => {
  if (!city) return null;

  const engagementRate = ((city.value / city.population) * 100).toFixed(2);
  const trendIcon = city.trend >= 0 ? TrendingUp : TrendingDown;
  const trendColor = city.trend >= 0 ? "text-emerald-400" : "text-red-400";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 max-w-none w-[95vw] sm:w-[90vw] lg:w-[75vw] xl:w-[70vw] max-w-[1000px] h-[85vh] p-0 border-none bg-transparent shadow-none">
        <div className="relative w-full h-full bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-500 animate-scale-in rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/40 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-red-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{city.city}</h1>
                  <p className="text-sm text-white/70">Análise de Engajamento Político</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="pt-24 p-6 h-full overflow-y-auto">
            <div className="space-y-6">
              {/* KPIs Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-sm text-white/70">População Total</p>
                      <p className="text-2xl font-bold text-white">{city.population.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-emerald-400" />
                    <div>
                      <p className="text-sm text-white/70">Pessoas Ativas</p>
                      <p className="text-2xl font-bold text-white">{city.value.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-emerald-400">{engagementRate}% da população</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    {React.createElement(trendIcon, { className: `h-8 w-8 ${trendColor}` })}
                    <div>
                      <p className="text-sm text-white/70">Tendência</p>
                      <p className={`text-2xl font-bold ${trendColor}`}>
                        {city.trend >= 0 ? '+' : ''}{city.trend}%
                      </p>
                      <p className="text-sm text-white/70">vs mês anterior</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="glass-card border-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  Análise de Sentimento
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">{city.sentiment.positive}%</p>
                    <p className="text-sm text-white/70">Positivo</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-400">{city.sentiment.neutral}%</p>
                    <p className="text-sm text-white/70">Neutro</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">{city.sentiment.negative}%</p>
                    <p className="text-sm text-white/70">Negativo</p>
                  </div>
                </div>

                {/* Sentiment Bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div 
                      className="bg-emerald-400" 
                      style={{ width: `${city.sentiment.positive}%` }}
                    />
                    <div 
                      className="bg-yellow-400" 
                      style={{ width: `${city.sentiment.neutral}%` }}
                    />
                    <div 
                      className="bg-red-400" 
                      style={{ width: `${city.sentiment.negative}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="glass-card border-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Demografia do Engajamento</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{city.demographics.age_18_30}%</p>
                    <p className="text-sm text-white/70">18-30 anos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">{city.demographics.age_31_45}%</p>
                    <p className="text-sm text-white/70">31-45 anos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{city.demographics.age_46_60}%</p>
                    <p className="text-sm text-white/70">46-60 anos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-400">{city.demographics.age_60_plus}%</p>
                    <p className="text-sm text-white/70">60+ anos</p>
                  </div>
                </div>
              </div>

              {/* Main Topics */}
              <div className="glass-card border-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Hash className="h-5 w-5 text-purple-400" />
                  Principais Pautas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {city.topics.map((topic, index) => (
                    <Badge 
                      key={index}
                      className="bg-purple-500/20 border-purple-400/40 text-purple-200 hover:bg-purple-500/30"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CityModal;