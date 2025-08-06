import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="glass-card w-full max-w-2xl animate-fade-in">
          <CardHeader className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-4xl text-gradient">
              Qualificação & Agendamento
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground max-w-md mx-auto">
              Plataforma inteligente de RH para automatizar a qualificação de candidatos e agendamento de entrevistas
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-4 text-center space-y-3">
                <Users className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Qualificação IA</h3>
                <p className="text-sm text-muted-foreground">
                  Score automático de 1-100 para cada candidato
                </p>
              </div>
              
              <div className="glass-card p-4 text-center space-y-3">
                <Calendar className="h-8 w-8 text-accent mx-auto" />
                <h3 className="font-semibold text-foreground">Agendamento</h3>
                <p className="text-sm text-muted-foreground">
                  Integração direta com Calendly para entrevistas
                </p>
              </div>
              
              <div className="glass-card p-4 text-center space-y-3">
                <BarChart3 className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Dashboard completa com KPIs e métricas
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={() => navigate("/dashboard")}
                className="btn-gradient px-8 py-3 text-lg"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Acessar Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
