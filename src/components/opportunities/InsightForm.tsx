import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InsightForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Insight Enviado!",
      description: "Sua observação foi registrada com sucesso.",
      variant: "glass",
    });
    // Here you would typically reset the form
  };

  return (
    <Card className="glass-card border-white/10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Cidade / Região" className="bg-white/10 border-white/20 text-white" />
          <Input placeholder="Título do Insight" className="bg-white/10 border-white/20 text-white" />
          <Textarea placeholder="Descrição detalhada..." className="bg-white/10 border-white/20 text-white" />
          <Select>
            <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Categoria" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="seguranca">Segurança</SelectItem>
              <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Grau de Impacto" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="alto">Alto</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="baixo">Baixo</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Quem reportou (ex: Assessor João)" className="bg-white/10 border-white/20 text-white" />
          <Button type="submit" className="w-full bg-gradient-primary">
            <Send className="h-4 w-4 mr-2" />
            Adicionar Insight
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InsightForm;