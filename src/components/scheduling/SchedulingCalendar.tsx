import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, MapPin } from "lucide-react";
import EventDetailsModal from "./EventDetailsModal";

const SchedulingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 5)); // Agosto 2024
  const [view, setView] = useState<"month" | "week">("week");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data for events - Expanded with more fictional meetings
  const events = [
    // Semana 1
    {
      id: 1,
      title: "Entrevista - Ana Silva",
      date: "2024-08-05",
      time: "14:00",
      duration: 60,
      type: "Entrevista Técnica",
      status: "confirmado",
      candidate: "Ana Silva",
      position: "Desenvolvedora Frontend",
      recruiter: "João Santos",
      location: "Sala 1"
    },
    {
      id: 2,
      title: "Reunião - Carlos Lima",
      date: "2024-08-05",
      time: "16:30",
      duration: 30,
      type: "Entrevista RH",
      status: "pendente",
      candidate: "Carlos Lima",
      position: "UX Designer",
      recruiter: "Maria Costa",
      location: "Online"
    },
    {
      id: 3,
      title: "Apresentação - Paula Mendes",
      date: "2024-08-06",
      time: "09:00",
      duration: 90,
      type: "Apresentação",
      status: "confirmado",
      candidate: "Paula Mendes",
      position: "Product Manager",
      recruiter: "Ana Paula",
      location: "Auditório"
    },
    {
      id: 4,
      title: "Entrevista Final - Roberto Santos",
      date: "2024-08-07",
      time: "11:00",
      duration: 60,
      type: "Entrevista Final",
      status: "reagendado",
      candidate: "Roberto Santos",
      position: "Desenvolvedor Backend",
      recruiter: "João Santos",
      location: "Sala 2"
    },
    {
      id: 5,
      title: "Entrevista - Fernanda Costa",
      date: "2024-08-08",
      time: "15:00",
      duration: 45,
      type: "Entrevista Técnica",
      status: "confirmado",
      candidate: "Fernanda Costa",
      position: "Data Scientist",
      recruiter: "Carlos Silva",
      location: "Online"
    },
    {
      id: 6,
      title: "Reunião - Lucas Oliveira",
      date: "2024-08-09",
      time: "10:30",
      duration: 30,
      type: "Entrevista RH",
      status: "pendente",
      candidate: "Lucas Oliveira",
      position: "DevOps Engineer",
      recruiter: "Maria Costa",
      location: "Sala 3"
    },
    // Semana 2
    {
      id: 7,
      title: "Entrevista - Mariana Silva",
      date: "2024-08-12",
      time: "09:30",
      duration: 60,
      type: "Entrevista Técnica",
      status: "confirmado",
      candidate: "Mariana Silva",
      position: "Full Stack Developer",
      recruiter: "Pedro Alves",
      location: "Sala 1"
    },
    {
      id: 8,
      title: "Dinâmica de Grupo",
      date: "2024-08-12",
      time: "14:00",
      duration: 120,
      type: "Dinâmica de Grupo",
      status: "confirmado",
      candidate: "Grupo A",
      position: "Vários",
      recruiter: "Equipe RH",
      location: "Auditório"
    },
    {
      id: 9,
      title: "Entrevista - Gabriel Santos",
      date: "2024-08-13",
      time: "10:00",
      duration: 45,
      type: "Entrevista RH",
      status: "pendente",
      candidate: "Gabriel Santos",
      position: "Analista de Sistemas",
      recruiter: "Juliana Souza",
      location: "Online"
    },
    {
      id: 10,
      title: "Apresentação - Camila Rodrigues",
      date: "2024-08-13",
      time: "16:00",
      duration: 60,
      type: "Apresentação",
      status: "confirmado",
      candidate: "Camila Rodrigues",
      position: "UI/UX Designer",
      recruiter: "Ana Paula",
      location: "Sala 2"
    },
    {
      id: 11,
      title: "Entrevista Final - Sophia Salles",
      date: "2024-08-14",
      time: "11:30",
      duration: 90,
      type: "Entrevista Final",
      status: "confirmado",
      candidate: "Sophia Salles",
      position: "Gestor de Ativos",
      recruiter: "João Santos",
      location: "Sala da Diretoria"
    },
    {
      id: 12,
      title: "Entrevista - Bernardo Almeida",
      date: "2024-08-15",
      time: "13:00",
      duration: 60,
      type: "Entrevista Comportamental",
      status: "pendente",
      candidate: "Bernardo Almeida",
      position: "Gestor de Portfólio",
      recruiter: "Maria Costa",
      location: "Sala 3"
    },
    {
      id: 13,
      title: "Entrevista - Rafael Mendes",
      date: "2024-08-16",
      time: "09:00",
      duration: 45,
      type: "Entrevista Técnica",
      status: "confirmado",
      candidate: "Rafael Mendes",
      position: "Mobile Developer",
      recruiter: "Carlos Silva",
      location: "Online"
    },
    // Semana 3
    {
      id: 14,
      title: "Reunião de Alinhamento",
      date: "2024-08-19",
      time: "08:30",
      duration: 30,
      type: "Reunião Interna",
      status: "confirmado",
      candidate: "Equipe RH",
      position: "N/A",
      recruiter: "Todos",
      location: "Sala de Reunião"
    },
    {
      id: 15,
      title: "Entrevista - Sofia Martins",
      date: "2024-08-19",
      time: "14:30",
      duration: 60,
      type: "Entrevista RH",
      status: "confirmado",
      candidate: "Sofia Martins",
      position: "Business Analyst",
      recruiter: "Juliana Souza",
      location: "Sala 1"
    },
    {
      id: 16,
      title: "Entrevista - Diego Silva",
      date: "2024-08-20",
      time: "10:15",
      duration: 45,
      type: "Entrevista Técnica",
      status: "reagendado",
      candidate: "Diego Silva",
      position: "DevOps Engineer",
      recruiter: "Pedro Alves",
      location: "Online"
    },
    {
      id: 17,
      title: "Apresentação - Larissa Santos",
      date: "2024-08-21",
      time: "15:30",
      duration: 75,
      type: "Apresentação",
      status: "confirmado",
      candidate: "Larissa Santos",
      position: "Product Owner",
      recruiter: "Ana Paula",
      location: "Auditório"
    },
    {
      id: 18,
      title: "Entrevista - Victor Hugo",
      date: "2024-08-22",
      time: "11:00",
      duration: 60,
      type: "Entrevista Final",
      status: "pendente",
      candidate: "Victor Hugo",
      position: "Arquiteto de Software",
      recruiter: "João Santos",
      location: "Sala 2"
    },
    {
      id: 19,
      title: "Entrevista - Isabela Almeida",
      date: "2024-08-23",
      time: "13:45",
      duration: 45,
      type: "Entrevista Comportamental",
      status: "confirmado",
      candidate: "Isabela Almeida",
      position: "QA Analyst",
      recruiter: "Maria Costa",
      location: "Sala 3"
    },
    // Semana 4
    {
      id: 20,
      title: "Entrevista - Gustavo Lima",
      date: "2024-08-26",
      time: "09:30",
      duration: 60,
      type: "Entrevista Técnica",
      status: "confirmado",
      candidate: "Gustavo Lima",
      position: "Backend Developer",
      recruiter: "Carlos Silva",
      location: "Online"
    },
    {
      id: 21,
      title: "Workshop - Candidatos Selecionados",
      date: "2024-08-27",
      time: "14:00",
      duration: 180,
      type: "Workshop",
      status: "confirmado",
      candidate: "Grupo B",
      position: "Vários",
      recruiter: "Equipe Completa",
      location: "Auditório Principal"
    },
    {
      id: 22,
      title: "Entrevista - Amanda Rodrigues",
      date: "2024-08-28",
      time: "10:30",
      duration: 45,
      type: "Entrevista RH",
      status: "pendente",
      candidate: "Amanda Rodrigues",
      position: "Frontend Developer",
      recruiter: "Juliana Souza",
      location: "Sala 1"
    },
    {
      id: 23,
      title: "Entrevista Final - João Pedro",
      date: "2024-08-29",
      time: "16:00",
      duration: 90,
      type: "Entrevista Final",
      status: "confirmado",
      candidate: "João Pedro",
      position: "Senior Developer",
      recruiter: "João Santos",
      location: "Sala da Diretoria"
    },
    {
      id: 24,
      title: "Feedback Session",
      date: "2024-08-30",
      time: "15:00",
      duration: 60,
      type: "Feedback",
      status: "confirmado",
      candidate: "Carla Fernandes",
      position: "UX Researcher",
      recruiter: "Ana Paula",
      location: "Sala 2"
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
      case "cancelado":
        return "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-500/50 text-red-100 backdrop-blur-sm";
      default:
        return "bg-gradient-to-r from-gray-500/30 to-slate-500/30 border-gray-500/50 text-gray-100 backdrop-blur-sm";
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "Entrevista Técnica":
        return "from-purple-500/20 to-violet-500/20";
      case "Entrevista RH":
        return "from-blue-500/20 to-cyan-500/20";
      case "Apresentação":
        return "from-emerald-500/20 to-green-500/20";
      case "Entrevista Final":
        return "from-orange-500/20 to-red-500/20";
      case "Dinâmica de Grupo":
        return "from-pink-500/20 to-rose-500/20";
      case "Workshop":
        return "from-indigo-500/20 to-blue-500/20";
      default:
        return "from-gray-500/20 to-slate-500/20";
    }
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Ajustar para mostrar semana completa
    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const formatWeekRange = (date: Date) => {
    const weekDays = getWeekDays(date);
    const start = weekDays[0];
    const end = weekDays[6];
    
    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h às 19h

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const renderMonthView = () => {
    return (
      <div className="space-y-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="text-center p-2 text-sm font-medium text-white/70">
              {day}
            </div>
          ))}
        </div>
        
        {/* Month grid */}
        <div className="grid grid-cols-7 gap-2">
          {monthDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonthDay = isCurrentMonth(day);
            const isTodayDay = isToday(day);
            
            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-white/10 rounded-lg transition-colors ${
                  !isCurrentMonthDay ? 'opacity-30' : 'hover:bg-white/5'
                } ${isTodayDay ? 'bg-white/10 border-white/30' : ''}`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isTodayDay ? 'text-white' : isCurrentMonthDay ? 'text-white/80' : 'text-white/40'
                }`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ${getStatusColor(event.status)} shadow-lg hover:shadow-xl`}
                      title={`${event.time} - ${event.candidate} - ${event.type}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-semibold truncate">{event.time}</div>
                      <div className="truncate opacity-90">{event.candidate}</div>
                      <div className="text-[10px] opacity-70 truncate mt-1">{event.type}</div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-white/60 text-center p-1 rounded bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                      +{dayEvents.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="space-y-4">
        {/* Days Header */}
        <div className="grid grid-cols-8 gap-2">
          <div className="text-sm font-medium text-white/70 p-2">Horário</div>
          {weekDays.map((day, index) => (
            <div key={index} className={`text-center p-2 rounded-lg ${
              isToday(day) ? 'bg-white/10 border border-white/30' : ''
            }`}>
              <div className="text-sm font-medium text-white">
                {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-bold ${
                isToday(day) ? 'text-white' : 'text-white/80'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-8 gap-2">
          {/* Time slots */}
          {hours.map((hour) => (
            <div key={hour} className="contents">
              {/* Hour label */}
              <div className="text-sm text-white/60 p-2 text-right">
                {hour}:00
              </div>
              
              {/* Day columns */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDate(day);
                const hourEvents = dayEvents.filter(event => {
                  const eventHour = parseInt(event.time.split(':')[0]);
                  return eventHour === hour;
                });
                
                return (
                  <div
                    key={dayIndex}
                    className="min-h-[60px] p-1 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-2 rounded-lg text-xs cursor-pointer hover:scale-105 transition-all duration-200 ${getStatusColor(event.status)} mb-1 shadow-lg hover:shadow-xl border`}
                        title={`${event.time} - ${event.candidate} - ${event.position}`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="font-semibold truncate">{event.time}</div>
                        <div className="truncate opacity-90">{event.candidate}</div>
                        <div className="truncate text-[10px] opacity-70 mt-1">{event.type}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {view === "week" 
                ? `Calendário Semanal - ${formatWeekRange(currentDate)}`
                : `Calendário Mensal - ${formatMonthYear(currentDate)}`
              }
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex border border-white/20 rounded-lg overflow-hidden">
                <Button
                  variant={view === "month" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("month")}
                  className="text-white hover:bg-white/10"
                >
                  Mês
                </Button>
                <Button
                  variant={view === "week" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("week")}
                  className="text-white hover:bg-white/10"
                >
                  Semana
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => view === "week" ? navigateWeek("prev") : navigateMonth("prev")}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => view === "week" ? navigateWeek("next") : navigateMonth("next")}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "week" ? renderWeekView() : renderMonthView()}
        </CardContent>
      </Card>

      {/* Events Summary */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {view === "week" ? "Resumo da Semana" : "Próximos Eventos"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {view === "week" ? (
              // Week summary
              weekDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                if (dayEvents.length === 0) return null;
                
                return (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">
                      {day.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })}
                    </h4>
                    <div className="space-y-2">
                      {dayEvents.map((event) => (
                        <div key={event.id} className="text-sm">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(event.status)} variant="outline">
                              {event.time}
                            </Badge>
                            <span className="text-white/80">{event.candidate}</span>
                          </div>
                          <p className="text-white/60 text-xs mt-1">{event.type} - {event.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              // Month summary - show next few events
              events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 6)
                .map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(event.status)} variant="outline">
                        {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </Badge>
                      <span className="text-white/80 text-sm">{event.time}</span>
                    </div>
                    <h4 className="font-medium text-white text-sm">{event.candidate}</h4>
                    <p className="text-white/60 text-xs">{event.type} - {event.location}</p>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="glass-card border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <h4 className="text-white font-medium">Legenda:</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-sm text-white/70">Confirmado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span className="text-sm text-white/70">Pendente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-sm text-white/70">Reagendado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span className="text-sm text-white/70">Cancelado</span>
              </div>
            </div>
          </div>
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

export default SchedulingCalendar;