import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, TrendingUp, Users, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EventDetailsModal from "./EventDetailsModal";

const SchedulingOverview = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const stats = [
    {
      title: "Agendamentos Ativos",
      value: "24",
      change: "+12% vs mês anterior",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Próximos 7 Dias",
      value: "8",
      change: "3 entrevistas, 5 reuniões",
      icon: Clock,
      color: "text-green-400"
    },
    {
      title: "Taxa de Comparecimento",
      value: "92%",
      change: "+5% vs mês anterior",
      icon: CheckCircle,
      color: "text-emerald-400"
    },
    {
      title: "Candidatos Agendados",
      value: "18",
      change: "Em 6 processos diferentes",
      icon: Users,
      color: "text-purple-400"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      candidate: "Ana Silva",
      position: "Desenvolvedora Frontend",
      time: "14:00",
      date: "Hoje",
      type: "Entrevista Técnica",
      status: "confirmado",
      recruiter: "João Santos"
    },
    {
      id: 2,
      candidate: "Carlos Lima",
      position: "UX Designer",
      time: "16:30",
      date: "Hoje",
      type: "Entrevista RH",
      status: "pendente",
      recruiter: "Maria Costa"
    },
    {
      id: 3,
      candidate: "Paula Mendes",
      position: "Product Manager",
      time: "09:00",
      date: "Amanhã",
      type: "Apresentação",
      status: "confirmado",
      recruiter: "Ana Paula"
    },
    {
      id: 4,
      candidate: "Roberto Santos",
      position: "Desenvolvedor Backend",
      time: "11:00",
      date: "Amanhã",
      type: "Entrevista Final",
      status: "reagendado",
      recruiter: "João Santos"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-500/50 text-green-100 backdrop-blur-sm";
      case "pendente":
        return "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-500/50 text-yellow-100 backdrop-blur-sm";
      case "reagendado":
        return "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-500/50 text-blue-100 backdrop-blur-sm";
      default:
        return "bg-gradient-to-r from-gray-500/30 to-slate-500/30 border-gray-500/50 text-gray-100 backdrop-blur-sm";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entrevista Técnica":
        return "bg-gradient-to-r from-purple-500/30 to-violet-500/30 border-purple-500/50 text-purple-100 backdrop-blur-sm";
      case "Entrevista RH":
        return "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-500/50 text-blue-100 backdrop-blur-sm";
      case "Apresentação":
        return "bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-500/50 text-emerald-100 backdrop-blur-sm";
      case "Entrevista Final":
        return "bg-gradient-to-r from-orange-500/30 to-red-500/30 border-orange-500/50 text-orange-100 backdrop-blur-sm";
      default:
        return "bg-gradient-to-r from-gray-500/30 to-slate-500/30 border-gray-500/50 text-gray-100 backdrop-blur-sm";
    }
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Próximos Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 hover:from-white/10 hover:to-white/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-white">{event.candidate}</h4>
                    <Badge className={getStatusColor(event.status)} variant="outline">
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/80 mb-2 font-medium">{event.position}</p>
                  <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                    <span className="font-medium">{event.date} - {event.time}</span>
                    <Badge className={getTypeColor(event.type)} variant="outline">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/60">Recrutador: {event.recruiter}</p>
                </div>
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default SchedulingOverview;