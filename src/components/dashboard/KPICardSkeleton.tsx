import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface KPICardSkeletonProps {
  delay?: number;
}

const KPICardSkeleton = ({ delay = 0 }: KPICardSkeletonProps) => {
  return (
    <Card 
      className="glass-card border-white/10 overflow-hidden animate-fade-in animate-scale-in" 
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-gradient-to-r from-white/5 via-white/20 to-white/5 animate-pulse-glow" />
            <Skeleton className="h-6 w-16 bg-gradient-to-r from-white/10 via-white/30 to-white/10 animate-pulse-glow" />
          </div>
          <Skeleton className="h-4 w-4 bg-gradient-to-r from-white/5 via-white/15 to-white/5 rounded animate-pulse-glow" />
        </div>
        
        <div className="space-y-1">
          <Skeleton className="h-3 w-20 bg-gradient-to-r from-white/5 via-white/15 to-white/5 animate-pulse-glow" />
          <Skeleton className="h-2 w-16 bg-gradient-to-r from-white/2 via-white/10 to-white/2 animate-pulse-glow" />
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICardSkeleton;