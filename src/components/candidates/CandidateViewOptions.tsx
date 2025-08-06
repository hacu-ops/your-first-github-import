import { FileText, Linkedin, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CandidateViewOptionsProps {
  candidateName: string;
}

const CandidateViewOptions = ({ candidateName }: CandidateViewOptionsProps) => {
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

  return (
    <div className="glass-card p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-lg h-full">
      <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-300" />
        Visualizar
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
      </div>
    </div>
  );
};

export default CandidateViewOptions;