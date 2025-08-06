import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Hash, ArrowUp, ArrowDown, Minus, Info } from "lucide-react";
import { getTopicTrends } from "@/utils/politicalData";
import TopicDetailsModal from "./TopicDetailsModal";

interface TopicsCloudProps {
  period: string;
}

const TopicsCloud = ({ period }: TopicsCloudProps) => {
  const topics = getTopicTrends(period);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTopicDetails = (topic: any) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-emerald-400" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'negative': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <Card className="glass-card border-white/10 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Hash className="h-5 w-5 text-orange-400" />
          Top Assuntos do Período
        </CardTitle>
        <p className="text-sm text-white/70">
          Temas mais comentados no período selecionado
        </p>
      </CardHeader>
      
      <CardContent className="pt-2 flex flex-col flex-1 justify-between">
        <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-2">
          {topics.slice(0, 15).map((topic, index) => (
            <div 
              key={topic.topic}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-sm font-bold text-white/50 w-6">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white group-hover:text-white/90 transition-colors">
                    {topic.topic}
                  </h4>
                  <p className="text-xs text-white/60">
                    {topic.mentions.toLocaleString('pt-BR')} menções
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSentimentColor(topic.sentiment)}`}>
                  {topic.sentiment === 'positive' ? 'Positivo' : 
                   topic.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                </span>
                
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  {getTrendIcon(topic.change)}
                  <span className={`text-xs font-semibold ${
                    topic.change > 0 ? 'text-emerald-400' : 
                    topic.change < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {topic.change > 0 ? '+' : ''}{topic.change}%
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleTopicDetails(topic)}
                >
                  <Info className="h-3 w-3 text-white/70" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center flex-shrink-0">
          <Link to="/reports" className="text-sm font-medium text-white/70 hover:text-white hover:underline transition-colors">
            Ver os top 100 assuntos em alta
          </Link>
        </div>
      </CardContent>
      
      {/* Topic Details Modal */}
      <TopicDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topic={selectedTopic}
      />
    </Card>
  );
};

export default TopicsCloud;