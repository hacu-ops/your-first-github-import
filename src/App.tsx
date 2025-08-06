import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Scheduling from "./pages/Scheduling";
import TopicReports from "./pages/TopicReports";
import VisaoMacro from "./pages/VisaoMacro";
import MapaVisaoMacro from "./pages/MapaVisaoMacro";
import GovernmentProjects from "./pages/GovernmentProjects";
import MassCampaign from "./pages/MassCampaign";
import PopularDemands from "./pages/PopularDemands";
import ElectoralOpportunities from "./pages/ElectoralOpportunities";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { preloadParanaGeoJson } from "./data/mapData";

const queryClient = new QueryClient();

const App = () => {
  // Inicia o pré-carregamento dos dados do mapa em segundo plano
  useEffect(() => {
    preloadParanaGeoJson();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/topic-reports" element={<TopicReports />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/visao-macro" element={<VisaoMacro />} />
            <Route path="/visao-macro/mapa" element={<MapaVisaoMacro />} />
            <Route path="/government-projects" element={<GovernmentProjects />} />
            <Route path="/mass-campaign" element={<MassCampaign />} />
            <Route path="/popular-demands" element={<PopularDemands />} />
            <Route path="/electoral-opportunities" element={<ElectoralOpportunities />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;