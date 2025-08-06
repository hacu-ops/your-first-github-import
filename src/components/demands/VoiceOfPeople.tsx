
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, MapPin, Tag } from "lucide-react";

const VoiceOfPeople = () => {
  const testimonials = [
    {
      quote: "Precisamos de mais médicos na UBS do Bairro Industrial. A fila está sempre enorme.",
      city: "Maringá",
      category: "Saúde"
    },
    {
      quote: "A creche do nosso bairro não atende nem metade das crianças. Mães trabalhadoras precisam de apoio.",
      city: "Londrina",
      category: "Educação"
    },
    {
      quote: "À noite é muito perigoso andar por aqui. Precisamos de mais iluminação nas ruas.",
      city: "Curitiba",
      category: "Segurança"
    },
    {
      quote: "O parque da nossa região está abandonado. Nossas crianças merecem um lugar seguro para brincar.",
      city: "Ponta Grossa",
      category: "Lazer"
    },
    {
      quote: "As ruas estão cheias de buracos. Já perdemos vários pneus por causa disso.",
      city: "Cascavel",
      category: "Infraestrutura"
    }
  ];

  return (
    <Card className="glass-card border-white/10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Quote className="h-5 w-5 text-blue-400" />
          Voz do Povo
        </CardTitle>
        <p className="text-sm text-white/70">Depoimentos reais da população</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <blockquote className="text-white/90 italic text-sm mb-3 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{testimonial.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{testimonial.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VoiceOfPeople;
