import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
  delay?: number;
}

const ChartSkeleton = ({ delay = 0 }: ChartSkeletonProps) => {
  return (
    <Card 
      className="glass-card border-white/10 animate-fade-in animate-scale-in"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 bg-gradient-to-r from-white/5 via-white/20 to-white/5 animate-pulse-glow" />
          <Skeleton className="h-4 w-4 bg-gradient-to-r from-white/5 via-white/15 to-white/5 rounded animate-pulse-glow" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-48 flex items-end justify-between space-x-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-1 space-y-2">
              <Skeleton 
                className="w-full bg-gradient-to-t from-white/5 via-white/15 to-white/5 rounded-sm animate-pulse-glow" 
                style={{ 
                  height: `${Math.random() * 60 + 40}%`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton 
              key={i} 
              className="h-2 w-8 bg-gradient-to-r from-white/2 via-white/10 to-white/2 animate-pulse-glow" 
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSkeleton;