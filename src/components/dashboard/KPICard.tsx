import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
}

const KPICard = ({ title, value, subtitle, change, changeType, icon: Icon, description }: KPICardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Anima quando os dados mudam
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [value, change]);

  const changeColors = {
    positive: "text-success",
    negative: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  const changeBgColors = {
    positive: "bg-success/20",
    negative: "bg-destructive/20", 
    neutral: "bg-muted/20"
  };

  return (
    <div className="group glass-card relative overflow-hidden p-3 hover:scale-105 transition-all duration-300">
      {/* Compact Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative z-10">
        {/* Header - inline with icon and description */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
              <Icon className="h-3 w-3 text-white transition-colors" />
            </div>
            <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-white/50 font-medium">
              {description}
            </p>
          )}
        </div>

        {/* Main content - horizontal layout */}
        <div className="flex items-center justify-between">
          {/* Value */}
          <div className="flex-1">
            <p className={`text-lg font-black text-white tracking-tight transition-all duration-300 ${
              isAnimating ? 'animate-scale-in' : ''
            }`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-white/60 font-medium">{subtitle}</p>
            )}
          </div>

          {/* Change indicator */}
          <div className={`inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 ${
            isAnimating ? 'animate-fade-in' : ''
          }`}>
            <span className={`text-xs font-semibold ${changeColors[changeType]}`}>
              {change.split(' ')[0]} {/* Show only the percentage/value part */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;