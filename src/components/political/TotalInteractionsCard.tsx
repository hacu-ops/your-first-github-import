import { useState } from "react";
import { MessageSquare, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractionDetailsModal from "./InteractionDetailsModal";

interface TotalInteractionsCardProps {
  value: string;
  subtitle: string;
  change: string;
  changeType: "positive" | "negative";
  period: string;
  region: string;
}

const TotalInteractionsCard = ({ value, subtitle, change, changeType, period, region }: TotalInteractionsCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="glass-card border-white/10 h-full p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {region === 'all' ? 'Total de Interações' : `Interações em ${region}`}
            </h3>
            <p className="text-sm text-white/70">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-5 w-5" />
            </Button>
            <p className="text-4xl font-bold text-white">{value}</p>
          </div>
          <div className={`flex items-center justify-end gap-1 text-sm mt-1 ${
            changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            <TrendingUp className="h-4 w-4" />
            <span>{change}</span>
          </div>
        </div>
      </div>
      <InteractionDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        period={period}
      />
    </>
  );
};

export default TotalInteractionsCard;