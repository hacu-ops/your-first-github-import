
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SuggestProjectForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ 
    city: "", 
    neighborhood: "", 
    title: "", 
    category: "", 
    description: "", 
    name: "" 
  });

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sugestão Enviada!",
      description: "Obrigado por contribuir! Sua sugestão será analisada pela equipe e poderá aparecer no ranking em breve.",
      variant: "glass",
      duration: 5000,
    });
    setFormState({ city: "", neighborhood: "", title: "", category: "", description: "", name: "" });
  };

  return (
    <Card className="glass-card border-white/10 sticky top-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          Sugira um Projeto
        </CardTitle>
        <p className="text-sm text-white/70">Sua voz importa! Compartilhe suas ideias com a comunidade.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={formState.city} onValueChange={(v) => handleInputChange('city', v)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecione sua cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curitiba">Curitiba</SelectItem>
              <SelectItem value="londrina">Londrina</SelectItem>
              <SelectItem value="maringa">Maringá</SelectItem>
              <SelectItem value="cascavel">Cascavel</SelectItem>
              <SelectItem value="ponta-grossa">Ponta Grossa</SelectItem>
              <SelectItem value="foz-do-iguacu">Foz do Iguaçu</SelectItem>
            </SelectContent>
          </Select>
          
          <Input 
            placeholder="Bairro ou região" 
            value={formState.neighborhood} 
            onChange={(e) => handleInputChange('neighborhood', e.target.value)} 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          
          <Input 
            placeholder="Título da sugestão" 
            value={formState.title} 
            onChange={(e) => handleInputChange('title', e.target.value)} 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          
          <Select value={formState.category} onValueChange={(v) => handleInputChange('category', v)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saude">🏥 Saúde</SelectItem>
              <SelectItem value="educacao">📚 Educação</SelectItem>
              <SelectItem value="seguranca">🛡️ Segurança</SelectItem>
              <SelectItem value="infraestrutura">🏗️ Infraestrutura</SelectItem>
              <SelectItem value="lazer">🎯 Lazer</SelectItem>
              <SelectItem value="esporte">⚽ Esporte</SelectItem>
              <SelectItem value="meio-ambiente">🌱 Meio Ambiente</SelectItem>
              <SelectItem value="transporte">🚌 Transporte</SelectItem>
            </SelectContent>
          </Select>
          
          <Textarea 
            placeholder="Descreva sua sugestão em detalhes. Explique por que é importante e como beneficiaria a comunidade..." 
            value={formState.description} 
            onChange={(e) => handleInputChange('description', e.target.value)} 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
          />
          
          <Input 
            placeholder="Seu nome (opcional)" 
            value={formState.name} 
            onChange={(e) => handleInputChange('name', e.target.value)} 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Sugestão
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SuggestProjectForm;
