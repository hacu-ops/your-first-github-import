import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapPin, MessageSquare, TrendingUp, Download, Send, Users, Layers } from "lucide-react";
import { Opportunity } from "@/utils/electoralData";

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
}

const OpportunityDetailsModal = ({ isOpen, onClose, opportunity }: OpportunityDetailsModalProps) => {
  if (!opportunity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 max-w-3xl text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{opportunity.title}</DialogTitle>
          <div className="flex items-center gap-4 text-sm text-white/70 pt-2">
            <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{opportunity.citations} sugestões</span></div>
            <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{opportunity.city}</span></div>
            <div className="flex items-center gap-1"><Layers className="h-4 w-4" /><span>{opportunity.category}</span></div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto pr-4">
          {/* Trend Chart */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-400" />Tendência da Demanda</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={opportunity.analysis.trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="mentions" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement by City */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin className="h-5 w-5 text-red-400" />Engajamento por Cidade</h3>
            <div className="space-y-2">
              {opportunity.analysis.engagementByCity.map(item => (
                <div key={item.city} className="flex items-center justify-between text-sm">
                  <span>{item.city}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full"><div className="h-2 bg-red-400 rounded-full" style={{width: `${item.engagement}%`}}></div></div>
                    <span>{item.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Comments */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-green-400" />Comentários Populares</h3>
            <div className="space-y-3">
              {opportunity.analysis.popularComments.map((comment, index) => (
                <blockquote key={index} className="border-l-2 border-green-400 pl-3 text-sm italic text-white/80">
                  {comment}
                </blockquote>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 my-4" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="glass-card border-white/20"><Download className="h-4 w-4 mr-2" />Exportar</Button>
          <Button className="bg-gradient-primary"><Send className="h-4 w-4 mr-2" />Enviar ao Gabinete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailsModal;