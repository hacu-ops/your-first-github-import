import { Calendar, Clock, User, TrendingUp } from "lucide-react";

interface CandidateDatesProps {
  registrationDate: string;
  lastUpdate: string;
}

const CandidateDates = ({ registrationDate, lastUpdate }: CandidateDatesProps) => {
  return (
    <div className="glass-card p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-lg h-full">
      <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-blue-300" />
        Datas
      </h3>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <User className="w-3 h-3 text-blue-300" />
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-medium">Cadastro</p>
              <p className="text-gray-400 text-xs">Primeiro contato</p>
            </div>
          </div>
          <div className="ml-6">
            <span className="text-blue-200 text-xs font-medium bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
              {registrationDate}
            </span>
          </div>
        </div>

        <div className="space-y-1 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Clock className="w-3 h-3 text-emerald-300" />
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-medium">Atualizado</p>
              <p className="text-gray-400 text-xs">Última ação</p>
            </div>
          </div>
          <div className="ml-6">
            <span className="text-emerald-200 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              {lastUpdate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDates;