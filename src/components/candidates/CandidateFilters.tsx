import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CandidateFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  scoreRange: number[];
  setScoreRange: (value: number[]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (value: string[]) => void;
  onApplyFilters: () => void;
}

const CandidateFilters = ({
  isOpen,
  onClose,
  searchTerm,
  setSearchTerm,
  scoreRange,
  setScoreRange,
  selectedStatuses,
  setSelectedStatuses,
  onApplyFilters
}: CandidateFiltersProps) => {
  
  const statusOptions = [
    { value: "pending", label: "Pendente" },
    { value: "contacted", label: "Contatado" }
  ];

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status) 
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[420px] sm:w-[520px] bg-black/20 backdrop-blur-3xl border-white/10 overflow-y-auto transition-all duration-500 ease-out shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)"
        }}
      >
        <SheetHeader className="pb-8 border-b border-white/10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-t-lg"></div>
          <SheetTitle className="text-white text-xl font-semibold relative z-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-white to-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
            Filtros de Candidatos
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8 py-8 px-1">
          {/* Busca por Nome ou Cargo */}
          <div className="space-y-4">
            <Label className="text-white font-medium text-sm tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-white/60 rounded-full"></div>
              BUSCAR POR NOME OU CARGO
            </Label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50 group-focus-within:text-white/80 transition-colors" />
              <Input
                placeholder="Digite o nome ou cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 glass-card border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
              />
            </div>
          </div>

          {/* Score Range */}
          <div className="space-y-5">
            <Label className="text-white font-medium text-sm tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-white/60 rounded-full"></div>
              SCORE: {scoreRange[0]} - {scoreRange[1]}
            </Label>
            <div className="px-5 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <Slider
                value={scoreRange}
                onValueChange={setScoreRange}
                max={100}
                min={0}
                step={1}
                className="w-full 
                  [&>span:first-child]:bg-white/20
                  [&>span:first-child]:h-2 
                  [&>span:first-child]:rounded-full
                  [&>span:last-child]:bg-white
                  [&>span:last-child]:h-2
                  [&>span:last-child]:rounded-full
                  [&>span:last-child]:shadow-[0_0_25px_rgba(255,255,255,0.7)]
                  [&>span:last-child]:border-0
                  [&_[role=slider]]:bg-white 
                  [&_[role=slider]]:border-0
                  [&_[role=slider]]:shadow-[0_0_20px_rgba(255,255,255,0.8)] 
                  [&_[role=slider]]:w-5 
                  [&_[role=slider]]:h-5
                  [&_[role=slider]]:hover:shadow-[0_0_30px_rgba(255,255,255,1)]
                  [&_[role=slider]]:focus:shadow-[0_0_35px_rgba(255,255,255,1)]
                  [&_[role=slider]]:transition-all
                  [&_[role=slider]]:duration-200"
              />
              <div className="flex justify-between text-xs text-white/70 mt-4 font-medium px-1">
                <span className="bg-white/10 px-2 py-1 rounded-md">1</span>
                <span className="bg-white/10 px-2 py-1 rounded-md">100</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-5">
            <Label className="text-white font-medium text-sm tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-white/60 rounded-full"></div>
              STATUS
            </Label>
            <div className="space-y-3">
               {statusOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => toggleStatus(option.value)}
                  variant={selectedStatuses.includes(option.value) ? "default" : "outline"}
                  className={selectedStatuses.includes(option.value) 
                    ? "w-full h-12 bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:bg-white/95 hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] transition-all duration-300 border-0 transform hover:scale-[1.02]" 
                    : "w-full h-12 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 font-medium"
                  }
                >
                  {option.label.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 backdrop-blur-3xl bg-gradient-to-t from-black/80 to-black/40">
          <div className="space-y-4">
            <Button
              onClick={handleApplyFilters}
              className="w-full h-13 bg-gradient-to-r from-white to-white/90 text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:from-white/90 hover:to-white/80 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              Aplicar Filtros
            </Button>
            
            {(searchTerm || scoreRange[0] !== 0 || scoreRange[1] !== 100 || selectedStatuses.length > 0) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setScoreRange([0, 100]);
                  setSelectedStatuses([]);
                }}
                className="w-full h-11 glass-card border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 text-white text-sm font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateFilters;