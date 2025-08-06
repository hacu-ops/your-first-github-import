import { useState } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import ProjectCard, { type Project } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Duplicação da PR-445",
    description: "Obra de infraestrutura para melhorar o tráfego regional.",
    progress: { completed: 1, total: 3 },
    deliveryDate: "30/09/2025",
    tags: ["Londrina", "Infraestrutura"],
    status: "em_andamento",
    resources: { photos: 12, videos: 3, links: 5 },
  },
  {
    id: 2,
    name: "Programa Mãe Paranaense",
    description: "Apoio integral à saúde da gestante e do bebê.",
    progress: { completed: 2, total: 2 },
    deliveryDate: "15/12/2025",
    tags: ["Estadual", "Saúde"],
    status: "concluido",
    resources: { photos: 8, videos: 1, links: 10 },
  },
  {
    id: 3,
    name: "Construção da Escola de Tempo Integral",
    description: "Nova escola moderna em Foz do Iguaçu.",
    progress: { completed: 0, total: 4 },
    deliveryDate: "01/02/2026",
    tags: ["Foz do Iguaçu", "Educação"],
    status: "nao_iniciado",
    resources: { photos: 5, videos: 0, links: 3 },
  },
  {
    id: 4,
    name: "Internet nas Escolas Rurais",
    description: "Levar conectividade a regiões isoladas.",
    progress: { completed: 3, total: 5 },
    deliveryDate: "10/10/2025",
    tags: ["Interior", "Tecnologia"],
    status: "em_andamento",
    resources: { photos: 25, videos: 5, links: 15 },
  },
  {
    id: 5,
    name: "Hospital Regional de Guarapuava",
    description: "Ampliação do atendimento de saúde na região central.",
    progress: { completed: 2, total: 6 },
    deliveryDate: "20/05/2026",
    tags: ["Guarapuava", "Saúde"],
    status: "em_andamento",
    resources: { photos: 18, videos: 4, links: 9 },
  },
  {
    id: 6,
    name: "Modernização do Porto de Paranaguá",
    description: "Aumento da capacidade de exportação e importação.",
    progress: { completed: 4, total: 4 },
    deliveryDate: "01/03/2025",
    tags: ["Paranaguá", "Logística"],
    status: "concluido",
    resources: { photos: 32, videos: 8, links: 22 },
  },
];

const GovernmentProjects = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("data");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'todos' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-white">Projetos do Governo</h1>
              <p className="text-white/70 mt-1">Gerencie todas as ações, entregas e promessas do governo por projeto.</p>
            </div>
            <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Buscar por projeto ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
                <SelectItem value="nao_iniciado">Não Iniciado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data">Ordenar por Data</SelectItem>
                <SelectItem value="cidade">Ordenar por Cidade</SelectItem>
                <SelectItem value="prioridade">Ordenar por Prioridade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} style={{animationDelay: `${index * 0.05 + 0.2}s`}}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentProjects;