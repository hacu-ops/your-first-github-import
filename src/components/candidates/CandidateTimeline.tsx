import { Clock, CheckCircle, AlertCircle, XCircle, FileText, Brain, Phone, Calendar, Users } from "lucide-react";

interface TimelineItem {
  date: string;
  time?: string;
  text: string;
  type?: "cadastro" | "cv_recebido" | "analise_ia" | "contatado" | "phone_screening" | "success" | "warning" | "error" | "default";
}

interface CandidateTimelineProps {
  timeline: TimelineItem[];
}

const CandidateTimeline = ({ timeline }: CandidateTimelineProps) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case "cadastro":
        return <Users className="w-4 h-4 text-blue-400" />;
      case "cv_recebido":
        return <FileText className="w-4 h-4 text-green-400" />;
      case "analise_ia":
        return <Brain className="w-4 h-4 text-purple-400" />;
      case "contatado":
        return <Phone className="w-4 h-4 text-amber-400" />;
      case "phone_screening":
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const getIconBg = (type?: string) => {
    switch (type) {
      case "cadastro":
        return "bg-blue-500/20 border-blue-500/30";
      case "cv_recebido":
        return "bg-green-500/20 border-green-500/30";
      case "analise_ia":
        return "bg-purple-500/20 border-purple-500/30";
      case "contatado":
        return "bg-amber-500/20 border-amber-500/30";
      case "phone_screening":
        return "bg-emerald-500/20 border-emerald-500/30";
      case "success":
        return "bg-emerald-500/20 border-emerald-500/30";
      case "warning":
        return "bg-amber-500/20 border-amber-500/30";
      case "error":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-blue-500/20 border-blue-500/30";
    }
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-white text-base font-semibold mb-4">Histórico Visual</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="relative flex items-start gap-4 animate-fade-in-up hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`flex-shrink-0 p-2 rounded-full border backdrop-blur-sm ${getIconBg(item.type)}`}
            >
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">{item.date}</span>
                {item.time && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
            </div>
            {index < timeline.length - 1 && (
              <div className="absolute left-6 top-12 w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateTimeline;