import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ClipboardList,
  Send,
  Lightbulb,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import profileImage from "@/assets/profile-gestor-rh.jpg";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Visão Macro", href: "/visao-macro", icon: MapPin },
  { name: "Oportunidades", href: "/electoral-opportunities", icon: Target },
  { name: "Projetos", href: "/government-projects", icon: ClipboardList },
  { name: "Campanhas", href: "/mass-campaign", icon: Send },
  { name: "Demandas Populares", href: "/popular-demands", icon: Lightbulb },
  { name: "Relatórios", href: "/reports", icon: FileText },
  { name: "Candidatos", href: "/candidates", icon: Users },
  { name: "Agendamentos", href: "/scheduling", icon: Calendar },
  { name: "Mensagens", href: "/messages", icon: MessageSquare },
  { name: "Configurações", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 glass-card m-4 shadow-2xl transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with Toggle */}
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <span className="text-xl font-bold text-sidebar-primary-foreground">
            APX Ltda.
          </span>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={cn(
                      "group flex items-center text-sm font-bold rounded-xl transition-all duration-200 relative",
                      isCollapsed ? "px-2 py-2 justify-center" : "px-4 py-3",
                      isActive
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon
                    className={cn(
                      "transition-colors",
                      isCollapsed ? "h-8 w-8 mr-0" : "h-5 w-5 mr-3",
                      isActive
                        ? "text-white"
                        : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                    )}
                  />
                  {!isCollapsed && item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <img 
              src={profileImage} 
              alt="Gestor RH" 
              className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-sidebar-accent/30">
            <img 
              src={profileImage} 
              alt="Gestor RH" 
              className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Gestor RH
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                @empresa.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;