import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, User, CheckCircle, RotateCcw, MessageSquare, XCircle } from "lucide-react";

interface EventDetailsModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pendente":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "reagendado":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "realizado":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entrevista Técnica":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Entrevista RH":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Apresentação":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Entrevista Final":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Dinâmica de Grupo":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "Workshop":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 text-white max-w-lg backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Detalhes do Agendamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Candidate Info */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
            <Avatar className="w-16 h-16 ring-2 ring-white/20">
              <AvatarImage 
                src={event.candidate?.avatar || `/src/assets/candidate-${event.id}.jpg`} 
                alt={event.candidate?.name || event.candidate} 
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-white font-semibold">
                {(event.candidate?.name || event.candidate)?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg text-white mb-1">
                {event.candidate?.name || event.candidate}
              </h3>
              <p className="text-white/70 mb-2">{event.position}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className={getStatusColor(event.status)} variant="outline">
                  {event.status}
                </Badge>
                <Badge className={getTypeColor(event.type)} variant="outline">
                  {event.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60">Data</p>
                  <p className="text-sm font-medium text-white">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Clock className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60">Horário</p>
                  <p className="text-sm font-medium text-white">{event.time} ({event.duration}min)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60">Local</p>
                  <p className="text-sm font-medium text-white">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <User className="h-4 w-4 text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60">Recrutador</p>
                  <p className="text-sm font-medium text-white">{event.recruiter}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {event.candidate?.email && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/10">
              <h4 className="font-semibold text-white mb-2">Contato</h4>
              <div className="space-y-1">
                <p className="text-sm text-white/80">{event.candidate.email}</p>
                {event.candidate.phone && (
                  <p className="text-sm text-white/80">{event.candidate.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {event.notes && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-white/10">
              <h4 className="font-semibold text-white mb-2">Observações</h4>
              <p className="text-sm text-white/80">{event.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30" 
              variant="outline"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30" 
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reagendar
            </Button>
            <Button 
              size="sm" 
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30" 
              variant="outline"
            >
              <XCircle className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/20" 
              variant="outline"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;