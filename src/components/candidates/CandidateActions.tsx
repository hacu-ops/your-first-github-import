import { FileText, Linkedin, ExternalLink, MessageSquare, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CandidateActionsProps {
  candidateName: string;
  isQualified?: boolean;
  isContacted?: boolean;
}

const CandidateActions = ({ 
  candidateName, 
  isQualified = true, 
  isContacted = false 
}: CandidateActionsProps) => {
  const { toast } = useToast();

  const handleViewApplication = () => {
    toast({
      title: "Visualizar Aplicação",
      description: `Abrindo aplicação de ${candidateName}`,
    });
  };

  const handleViewCV = () => {
    toast({
      title: "Visualizar CV",
      description: `Abrindo currículo de ${candidateName}`,
    });
  };

  const handleViewLinkedIn = () => {
    toast({
      title: "Visualizar LinkedIn",
      description: `Abrindo perfil do LinkedIn de ${candidateName}`,
    });
  };

  const handleStartContactFlow = () => {
    toast({
      title: "Iniciar Fluxo de Contato",
      description: `Iniciando processo de contato com ${candidateName}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-2xl p-6 glass-card-hover h-full">
      <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-blue-300" />
        Ações
      </h3>
      
      <div className="space-y-2">
        <Button
          onClick={handleViewApplication}
          variant="outline"
          size="sm"
          className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs h-8 justify-start"
        >
          <FileText className="w-3 h-3 mr-2" />
          Ver Aplicação
          <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
        </Button>

        <Button
          onClick={handleViewCV}
          variant="outline"
          size="sm"
          className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs h-8 justify-start"
        >
          <FileText className="w-3 h-3 mr-2" />
          Ver CV
          <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
        </Button>

        <Button
          onClick={handleViewLinkedIn}
          variant="outline"
          size="sm"
          className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs h-8 justify-start"
        >
          <Linkedin className="w-3 h-3 mr-2" />
          Ver LinkedIn
          <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
        </Button>

        <div className="pt-2 border-t border-white/10">
          {(isQualified && isContacted) ? (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-xs text-orange-200">Candidato já contatado</span>
            </div>
          ) : (
            <Button
              onClick={handleStartContactFlow}
              variant="outline"
              size="sm"
              className="w-full bg-green-500/10 border-green-500/30 text-green-200 hover:bg-green-500/20 text-xs h-8 justify-start"
            >
              <MessageSquare className="w-3 h-3 mr-2" />
              Iniciar Fluxo de Contato
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateActions;