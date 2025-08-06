import { CheckCircle, X, Star, MapPin, Globe, Clock, MessageCircle, Mail, Phone, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Candidate, getCandidateImage } from "./CandidateCard";
import CandidateScoreAndInsights from "./CandidateScoreAndInsights";
import CandidateTimeline from "./CandidateTimeline";
import CandidateActions from "./CandidateActions";
import CandidateDates from "./CandidateDates";
import CandidateSummary from "./CandidateSummary";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CandidateModal = ({ candidate, isOpen, onClose }: CandidateModalProps) => {
  const { toast } = useToast();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  if (!candidate) return null;

  const timeline = [
    { date: "15/01/2024", time: "14:30", text: "Phone Screening agendado", type: "phone_screening" as const },
    { date: "12/01/2024", time: "16:45", text: "Candidato contatado via WhatsApp", type: "contatado" as const },
    { date: "10/01/2024", time: "09:15", text: "Análise realizada pela IA", type: "analise_ia" as const },
    { date: "08/01/2024", time: "11:22", text: "CV recebido e processado", type: "cv_recebido" as const },
    { date: "08/01/2024", time: "10:30", text: "Candidato cadastrado no sistema", type: "cadastro" as const }
  ];

  const scoreData = [
    { name: "Hard Skills", value: 45, color: "#3B82F6" },
    { name: "Soft Skills", value: 35, color: "#EC4899" },
    { name: "Cultura", value: 12, color: "#10B981" },
    { name: "Inglês", value: 8, color: "#8B5CF6" }
  ];

  // Mock data - in real app this would come from candidate object
  const mockData = {
    registrationDate: "08/01/2024",
    lastUpdate: "15/01/2024",
    whatsapp: "+55 11 99999-9999",
    email: "candidato@email.com",
    summary: "Profissional experiente em gestão de ativos com sólida formação em economia e finanças.",
    experiences: [
      "5 anos em gestão de portfólio em asset management",
      "Experiência em análise de risco e compliance",
      "Gestão de equipes multidisciplinares"
    ],
    professionalHistory: "Atuou em grandes instituições financeiras, com destaque para gestão de fundos de investimento e relacionamento com investidores qualificados.",
    candidateInterest: "Busca crescimento profissional em empresa inovadora do setor financeiro, com interesse em aplicar conhecimentos em tecnologia aplicada a investimentos.",
    scoreJustification: `Score ${candidate.score}/100 devido à sólida experiência prévia em gestão de ativos, domínio de ferramentas de análise financeira e histórico consistente em empresas do setor.`,
    choiceExplanation: "Perfil considerado altamente compatível devido à combinação de experiência técnica, competências comportamentais e alinhamento cultural com os valores da empresa."
  };

  const handleWhatsApp = () => {
    const whatsapp = mockData.whatsapp;
    if (whatsapp) {
      const message = encodeURIComponent(`Olá ${candidate.name}, tudo bem? Vim através da nossa plataforma de recrutamento...`);
      window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleEmail = () => {
    const email = mockData.email;
    if (email) {
      const subject = encodeURIComponent(`Oportunidade profissional - ${candidate.name}`);
      const body = encodeURIComponent(`Olá ${candidate.name},\n\nEntramos em contato através de nossa plataforma de recrutamento...\n\nAtenciosamente,\nEquipe de Recrutamento`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    }
  };

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
      toast({
        title: "Copiado!",
        description: `${type === 'phone' ? 'Número' : 'E-mail'} copiado para a área de transferência`,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar para a área de transferência",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] max-w-[1400px] h-[90vh] sm:h-[85vh] lg:h-[80vh] xl:h-[85vh] p-0 border-none bg-transparent shadow-none">
        <div className="relative w-full h-full bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-500 animate-scale-in rounded-3xl overflow-hidden">
          {/* Header with breadcrumb */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/40 to-transparent">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Candidatos</span>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{candidate.name}</span>
            </div>
          </div>

          {/* Main Layout - Improved proportions */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Hero Section with Photo - Optimized to highlight the photo */}
            <div className="relative lg:w-[35%] xl:w-[32%] h-64 lg:h-full">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={getCandidateImage(candidate.id)}
                alt={`Foto de ${candidate.name}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              
              {/* Candidate Info - Minimized to highlight photo */}
              <div className="absolute inset-x-0 bottom-0 p-4 space-y-4">
                {/* Name and Status - Compact layout */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-foreground text-xl lg:text-2xl font-bold tracking-tight leading-tight">
                      {candidate.name}
                    </h1>
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium shrink-0 ${
                        candidate.score >= 70 
                          ? 'bg-success/20 border-success/40 text-success-foreground' 
                          : candidate.score >= 50
                          ? 'bg-warning/20 border-warning/40 text-warning-foreground'
                          : 'bg-destructive/20 border-destructive/40 text-destructive-foreground'
                      }`}
                    >
                      {candidate.score >= 70 ? 'Qualificado' : candidate.score >= 50 ? 'Em Análise' : 'Rejeitado'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{candidate.position}</p>
                </div>
                
                {/* Compact Contact Cards */}
                <div className="space-y-2">
                  {mockData.whatsapp && (
                    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-xl p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <MessageCircle className="w-3 h-3 text-success shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-foreground text-xs font-medium block">WhatsApp</span>
                            <span className="text-success text-xs font-mono truncate block">{mockData.whatsapp}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            onClick={() => copyToClipboard(mockData.whatsapp, 'phone')}
                            className="p-1 h-6 w-6 bg-success/10 hover:bg-success/20 border-success/30 text-success hover:text-success-foreground transition-all duration-200"
                            variant="outline"
                            size="sm"
                            aria-label="Copiar WhatsApp"
                          >
                            {copiedPhone ? <Check className="w-2 h-2" /> : <Copy className="w-2 h-2" />}
                          </Button>
                          <Button
                            onClick={handleWhatsApp}
                            className="p-1 h-6 w-6 bg-success/20 hover:bg-success/30 border-success/40 text-success hover:text-success-foreground transition-all duration-200"
                            variant="outline"
                            size="sm"
                            aria-label="Abrir WhatsApp"
                          >
                            <MessageCircle className="w-2 h-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockData.email && (
                    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-xl p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Mail className="w-3 h-3 text-primary shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-foreground text-xs font-medium block">E-mail</span>
                            <span className="text-primary text-xs truncate block">{mockData.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            onClick={() => copyToClipboard(mockData.email, 'email')}
                            className="p-1 h-6 w-6 bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary hover:text-primary-foreground transition-all duration-200"
                            variant="outline"
                            size="sm"
                            aria-label="Copiar e-mail"
                          >
                            {copiedEmail ? <Check className="w-2 h-2" /> : <Copy className="w-2 h-2" />}
                          </Button>
                          <Button
                            onClick={handleEmail}
                            className="p-1 h-6 w-6 bg-primary/20 hover:bg-primary/30 border-primary/40 text-primary hover:text-primary-foreground transition-all duration-200"
                            variant="outline"
                            size="sm"
                            aria-label="Enviar e-mail"
                          >
                            <Mail className="w-2 h-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Panel - Enhanced spacing and consistency */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20 hover:scrollbar-thumb-border/40">
              <div className="p-6 lg:p-8 space-y-6">
                {/* 1. Resume Summary - Consistent glass styling */}
                <div className="animate-fade-in-up">
                  <CandidateSummary 
                    summary={mockData.summary}
                    experiences={mockData.experiences}
                    professionalHistory={mockData.professionalHistory}
                    candidateInterest={mockData.candidateInterest}
                  />
                </div>

                {/* 2. Status and Actions Grid - Improved spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Process Status Card */}
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-2xl p-6 glass-card-hover h-full">
                      <h3 className="text-foreground text-lg font-semibold mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Status do Processo
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Qualificação</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-3 bg-muted/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-success to-success/80 rounded-full transition-all duration-1000 animate-scale-in"
                                style={{ width: `${candidate.score}%`, animationDelay: '0.5s' }}
                              />
                            </div>
                            <span className="text-sm text-success font-semibold min-w-[3rem] text-right">{candidate.score}%</span>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border/20">
                          <span className="text-sm text-muted-foreground">Próxima Etapa</span>
                          <p className="text-lg text-foreground font-semibold">Phone Screening</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Card */}
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <CandidateActions 
                      candidateName={candidate.name} 
                      isQualified={candidate.score >= 70} 
                      isContacted={false} 
                    />
                  </div>
                </div>

                {/* 3. Score and Insights - Enhanced with consistent styling */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <CandidateScoreAndInsights 
                    data={scoreData} 
                    total={candidate.score}
                    scoreJustification={mockData.scoreJustification}
                    choiceExplanation={mockData.choiceExplanation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;