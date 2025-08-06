import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Search, Filter, Plus, CheckCircle, XCircle, RotateCcw, MessageSquare } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebarState } from "@/hooks/useSidebarState";
import SchedulingOverview from "@/components/scheduling/SchedulingOverview";
import SchedulingCalendar from "@/components/scheduling/SchedulingCalendar";
import SchedulingList from "@/components/scheduling/SchedulingList";
import SchedulingFilters from "@/components/scheduling/SchedulingFilters";

const Scheduling = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ${isCollapsed ? 'ml-28' : 'ml-72'}`}>
        <div className="p-6">
        <div className="max-w-screen-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Agendamentos
              </h1>
              <p className="text-white/70">
                Gerencie entrevistas e reuniões com candidatos
              </p>
            </div>
            <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Buscar por candidato, vaga ou recrutador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <SchedulingFilters />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-white/20">
                Calendário
              </TabsTrigger>
              <TabsTrigger value="list" className="text-white data-[state=active]:bg-white/20">
                Lista
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <SchedulingOverview />
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <SchedulingCalendar />
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <SchedulingList searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;