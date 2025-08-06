import { MessageCircle, Mail, Phone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CandidateContactProps {
  whatsapp?: string;
  email?: string;
  name: string;
}

const CandidateContact = ({ whatsapp, email, name }: CandidateContactProps) => {
  const { toast } = useToast();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleWhatsApp = () => {
    if (whatsapp) {
      const message = encodeURIComponent(`Olá ${name}, tudo bem? Vim através da nossa plataforma de recrutamento...`);
      window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleEmail = () => {
    if (email) {
      const subject = encodeURIComponent(`Oportunidade profissional - ${name}`);
      const body = encodeURIComponent(`Olá ${name},\n\nEntramos em contato através de nossa plataforma de recrutamento...\n\nAtenciosamente,\nEquipe de Recrutamento`);
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
    <div className="glass-card p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-lg h-full">
      <h3 className="text-white text-base font-semibold mb-3 flex items-center gap-2">
        <Phone className="w-4 h-4 text-green-300" />
        Contato
      </h3>
      
      <div className="space-y-3">
        {whatsapp && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <MessageCircle className="w-3 h-3 text-green-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium">WhatsApp</p>
                <p className="text-green-200 text-xs font-mono truncate">{whatsapp}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(whatsapp, 'phone')}
                className="p-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-200 hover:text-white"
                variant="outline"
                size="sm"
              >
                {copiedPhone ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
            
            <Button 
              onClick={handleWhatsApp}
              size="sm"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none text-xs h-7"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Enviar Mensagem
            </Button>
          </div>
        )}

        {email && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Mail className="w-3 h-3 text-blue-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium">E-mail</p>
                <p className="text-blue-200 text-xs truncate">{email}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(email, 'email')}
                className="p-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-200 hover:text-white"
                variant="outline"
                size="sm"
              >
                {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
            
            <Button 
              onClick={handleEmail}
              size="sm"
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 text-xs h-7"
            >
              <Mail className="w-3 h-3 mr-1" />
              Enviar E-mail
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateContact;