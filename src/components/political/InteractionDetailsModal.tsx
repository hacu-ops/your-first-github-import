import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import InteractionChart from "./InteractionChart";

interface InteractionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  period: string;
}

const InteractionDetailsModal = ({ isOpen, onClose, period }: InteractionDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 max-w-4xl text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Detalhes das Interações
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <InteractionChart period={period} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InteractionDetailsModal;