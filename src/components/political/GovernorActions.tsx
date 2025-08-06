import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, CheckCircle, Clock, Calendar } from "lucide-react";
import { PoliticalMetrics } from "@/utils/politicalData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface GovernorActionsProps {
  actions: PoliticalMetrics['governorActions'];
}

const GovernorActions = ({ actions }: GovernorActionsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'planned': return <Calendar className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
      case 'in-progress': 
        return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300';
      case 'planned': 
        return 'bg-blue-500/20 border-blue-500/40 text-blue-300';
      default: 
        return 'bg-gray-500/20 border-gray-500/40 text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'planned': return 'Planejado';
      default: return 'Pendente';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Saúde': '🏥',
      'Educação': '📚',
      'Segurança': '🛡️',
      'Economia': '💼',
      'Infraestrutura': '🏗️',
      'Meio Ambiente': '🌱',
      'Transporte': '🚌',
      'Habitação': '🏠',
      'Cultura': '🎭',
      'Esporte': '⚽'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  return (
    <Card className="glass-card border-white/10 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
          <Crown className="h-5 w-5 text-purple-400" />
          Ações do Governador
        </CardTitle>
        <p className="text-sm text-white/70">
          Principais respostas e projetos em destaque
        </p>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div 
              key={action.title}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="text-lg mt-0.5">
                  {getCategoryIcon(action.category)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white group-hover:text-white/90 transition-colors leading-tight pr-2">
                      {action.title}
                    </h4>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${getStatusStyle(action.status)}`}>
                      {getStatusIcon(action.status)}
                      <span>{getStatusText(action.status)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(action.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                    </div>
                    <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
                      {action.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-300 font-semibold">CONCLUÍDO</p>
            <p className="text-lg font-bold text-emerald-300">
              {actions.filter(a => a.status === 'completed').length}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-300 font-semibold">EM ANDAMENTO</p>
            <p className="text-lg font-bold text-yellow-300">
              {actions.filter(a => a.status === 'in-progress').length}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-300 font-semibold">PLANEJADO</p>
            <p className="text-lg font-bold text-blue-300">
              {actions.filter(a => a.status === 'planned').length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernorActions;