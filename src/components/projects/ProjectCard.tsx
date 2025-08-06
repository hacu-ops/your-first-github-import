import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Eye, Image, Video, Link as LinkIcon } from "lucide-react";

export interface Project {
  id: number;
  name: string;
  description: string;
  progress: {
    completed: number;
    total: number;
  };
  deliveryDate: string;
  tags: string[];
  status: 'concluido' | 'em_andamento' | 'atrasado' | 'nao_iniciado';
  resources: {
    photos: number;
    videos: number;
    links: number;
  };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const progressPercentage = (project.progress.completed / project.progress.total) * 100;

  const getStatusBadge = () => {
    switch (project.status) {
      case 'concluido':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Concluído</Badge>;
      case 'em_andamento':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em Andamento</Badge>;
      case 'atrasado':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Atrasado</Badge>;
      case 'nao_iniciado':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Não Iniciado</Badge>;
    }
  };

  return (
    <div className="glass-card-hover p-6 flex flex-col justify-between h-full animate-fade-in-up">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white">{project.name}</h3>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-white/70 mb-4 h-10">{project.description}</p>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between items-center text-xs text-white/80 mb-1">
              <span>Progresso</span>
              <span>{project.progress.completed}/{project.progress.total} etapas</span>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-400 [&>div]:to-purple-500" />
          </div>
          
          <div className="flex items-center text-sm text-white/80">
            <Calendar className="h-4 w-4 mr-2 text-orange-400" />
            <span>Entrega: {project.deliveryDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <Badge key={tag} variant="outline" className="border-white/20 text-white/80">{tag}</Badge>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3">Recursos do Projeto</h4>
          <div className="flex items-center justify-around text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-blue-400" />
              <span>{project.resources.photos} Fotos</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-purple-400" />
              <span>{project.resources.videos} Vídeos</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-emerald-400" />
              <span>{project.resources.links} Links</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/10">
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
          <Eye className="h-4 w-4 mr-2" />
          Abrir
        </Button>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;