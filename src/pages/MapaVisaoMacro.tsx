import { useSidebarState } from "@/hooks/useSidebarState";
import Sidebar from "@/components/Sidebar";
import ParanaHeatMap from "@/components/political/ParanaHeatMap";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MapaVisaoMacro = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className="relative flex-1 min-w-0"
      >
        <div className="absolute inset-0 h-full w-full">
          <ParanaHeatMap />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/visao-macro")}
          className="absolute top-8 right-8 z-[1001] text-white/70 hover:text-white hover:bg-black/20 backdrop-blur-sm h-10 w-10 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default MapaVisaoMacro;