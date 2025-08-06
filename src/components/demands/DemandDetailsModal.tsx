import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Layers, Users, BarChart, MessageSquare, Cloud } from "lucide-react";
import { type Demand } from "./DemandCard";

interface DemandDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

const DemandDetailsModal = ({ isOpen, onClose, demand }: DemandDetailsModalProps) => {
  if (!demand) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 max-w-3xl text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Dossiê da Demanda: {demand.name}</DialogTitle>
          <div className="flex items-center gap-4 text-sm text-white/70 pt-2">
            <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{demand.city} - {demand.neighborhood}</span></div>
            <div className="flex items-center gap-1"><Layers className="h-4 w-4" /><span>{demand.category}</span></div>
            <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{demand.suggestions} sugestões</span></div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto pr-4">
          {/* Sentiment Analysis */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><BarChart className="h-5 w-5 text-blue-400" />Análise de Sentimento</h3>
            <div className="text-center py-8 bg-white/5 rounded-lg">
              <p className="text-white/70">Gráfico de sentimento virá aqui.</p>
            </div>
          </div>

          {/* Keyword Cloud */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Cloud className="h-5 w-5 text-purple-400" />Nuvem de Palavras-Chave</h3>
            <div className="text-center py-8 bg-white/5 rounded-lg">
              <p className="text-white/70">Nuvem de palavras-chave virá aqui.</p>
            </div>
          </div>

          {/* Popular Comments */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-green-400" />Comentários Populares</h3>
            <div className="space-y-3">
              <blockquote className="border-l-2 border-green-400 pl-3 text-sm italic text-white/80">
                "Essa creche é uma necessidade urgente para as mães que trabalham na região. Nossos filhos merecem um lugar seguro."
              </blockquote>
              <blockquote className="border-l-2 border-green-400 pl-3 text-sm italic text-white/80">
                "Já passou da hora de investirem na educação infantil aqui no Jardim das Américas. É uma promessa antiga."
              </blockquote>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 my-4" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="glass-card border-white/20">Vincular a Projeto</Button>
          <Button className="bg-gradient-primary">Converter em Oportunidade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemandDetailsModal;