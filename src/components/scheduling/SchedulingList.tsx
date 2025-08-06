import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, RotateCcw, MessageSquare, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SchedulingListProps {
  searchTerm: string;
}

const SchedulingList = ({ searchTerm }: SchedulingListProps) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      candidate: {
        name: "Ana Silva",
        email: "ana.silva@email.com",
        phone: "(11) 99999-0001",
        avatar: "/src/assets/candidate-1.jpg"
      },
      position: "Desenvolvedora Frontend",
      date: "2024-08-05",
      time: "14:00",
      duration: 60,
      type: "Entrevista Técnica",
      status: "confirmado",
      recruiter: "João Santos",
      location: "Sala 1",
      notes: "Candidata com experiência sólida em React. Revisar portfólio.",
      createdAt: "2024-07-30"
    },
    {
      id: 2,
      candidate: {
        name: "Carlos Lima",
        email: "carlos.lima@email.com",
        phone: "(11) 99999-0002",
        avatar: "/src/assets/candidate-2.jpg"
      },
      position: "UX Designer",
      date: "2024-08-05",
      time: "16:30",
      duration: 30,
      type: "Entrevista RH",
      status: "pendente",
      recruiter: "Maria Costa",
      location: "Online",
      notes: "Primeira entrevista do processo. Avaliar fit cultural.",
      createdAt: "2024-08-01"
    },
    {
      id: 3,
      candidate: {
        name: "Paula Mendes",
        email: "paula.mendes@email.com",
        phone: "(11) 99999-0003",
        avatar: "/src/assets/candidate-3.jpg"
      },
      position: "Product Manager",
      date: "2024-08-06",
      time: "09:00",
      duration: 90,
      type: "Apresentação",
      status: "confirmado",
      recruiter: "Ana Paula",
      location: "Auditório",
      notes: "Apresentação do case de produto. Preparar perguntas específicas.",
      createdAt: "2024-07-28"
    },
    {
      id: 4,
      candidate: {
        name: "Roberto Santos",
        email: "roberto.santos@email.com",
        phone: "(11) 99999-0004",
        avatar: "/src/assets/candidate-4.jpg"
      },
      position: "Desenvolvedor Backend",
      date: "2024-08-07",
      time: "11:00",
      duration: 60,
      type: "Entrevista Final",
      status: "reagendado",
      recruiter: "João Santos",
      location: "Sala 2",
      notes: "Reagendado a pedido do candidato. Última etapa do processo.",
      createdAt: "2024-07-25"
    },
    {
      id: 5,
      candidate: {
        name: "Fernanda Costa",
        email: "fernanda.costa@email.com",
        phone: "(11) 99999-0005",
        avatar: "/src/assets/candidate-5.jpg"
      },
      position: "Data Scientist",
      date: "2024-08-03",
      time: "15:00",
      duration: 45,
      type: "Entrevista Técnica",
      status: "cancelado",
      recruiter: "Carlos Silva",
      location: "Online",
      notes: "Cancelado - candidata aceitou outra proposta.",
      createdAt: "2024-07-20"
    }
  ];

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
        return "bg-purple-500/20 text-purple-400";
      case "Entrevista RH":
        return "bg-blue-500/20 text-blue-400";
      case "Apresentação":
        return "bg-emerald-500/20 text-emerald-400";
      case "Entrevista Final":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.recruiter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lista de Agendamentos ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={appointment.candidate.avatar} alt={appointment.candidate.name} />
                    <AvatarFallback className="bg-white/10 text-white">
                      {appointment.candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{appointment.candidate.name}</h4>
                      <Badge className={getStatusColor(appointment.status)} variant="outline">
                        {appointment.status}
                      </Badge>
                      <Badge className={getTypeColor(appointment.type)} variant="secondary">
                        {appointment.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-white/70 mb-2">{appointment.position}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-white/60 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.time} ({appointment.duration}min)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{appointment.recruiter}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-xs text-white/50 italic">{appointment.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white hover:bg-white/10"
                        onClick={() => setSelectedEvent(appointment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/20 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-white">Detalhes do Agendamento</DialogTitle>
                      </DialogHeader>
                      {selectedEvent && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={selectedEvent.candidate.avatar} alt={selectedEvent.candidate.name} />
                              <AvatarFallback className="bg-white/10 text-white">
                                {selectedEvent.candidate.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-white">{selectedEvent.candidate.name}</h3>
                              <p className="text-sm text-white/70">{selectedEvent.position}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge className={getStatusColor(selectedEvent.status)} variant="outline">
                                  {selectedEvent.status}
                                </Badge>
                                <Badge className={getTypeColor(selectedEvent.type)} variant="secondary">
                                  {selectedEvent.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-white/60" />
                              <span className="text-sm">{formatDate(selectedEvent.date)} às {selectedEvent.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-white/60" />
                              <span className="text-sm">{selectedEvent.duration} minutos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-white/60" />
                              <span className="text-sm">{selectedEvent.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-white/60" />
                              <span className="text-sm">{selectedEvent.recruiter}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-white">Contato</h4>
                            <p className="text-sm text-white/70">{selectedEvent.candidate.email}</p>
                            <p className="text-sm text-white/70">{selectedEvent.candidate.phone}</p>
                          </div>
                          
                          {selectedEvent.notes && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-white">Observações</h4>
                              <p className="text-sm text-white/70">{selectedEvent.notes}</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2 pt-4">
                            <Button size="sm" className="flex-1" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmar
                            </Button>
                            <Button size="sm" className="flex-1" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Reagendar
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  {appointment.status === "pendente" && (
                    <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-500/10">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {appointment.status !== "cancelado" && (
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">Nenhum agendamento encontrado</p>
              <p className="text-white/40 text-sm">Tente ajustar os filtros ou criar um novo agendamento</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulingList;