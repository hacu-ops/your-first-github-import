import { Check, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Import candidate images
import candidate1 from "@/assets/candidate-1.jpg";
import candidate2 from "@/assets/candidate-2.jpg";
import candidate3 from "@/assets/candidate-3.jpg";
import candidate4 from "@/assets/candidate-4.jpg";
import candidate5 from "@/assets/candidate-5.jpg";
import candidate6 from "@/assets/candidate-6.jpg";
import candidate7 from "@/assets/candidate-7.jpg";
import candidate8 from "@/assets/candidate-8.jpg";
import candidate9 from "@/assets/candidate-9.jpg";
import candidate10 from "@/assets/candidate-10.jpg";

export interface Candidate {
  id: number;
  name: string;
  position: string;
  score: number;
  status: "pending" | "contacted" | "scheduled" | "rejected";
  hasLinkedin: boolean;
  tags: string[];
  photo?: string | null;
  linkedin?: string | null;
  insights?: string;
  cv?: string;
  history?: Array<{
    date: string;
    action: string;
    details: string;
  }>;
}

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
  isQualified?: boolean;
}

export const candidateImages = [candidate1, candidate2, candidate3, candidate4, candidate5, candidate6, candidate7, candidate8, candidate9, candidate10];

// Fixed pattern ensuring no repetition in same row or column
const createImageGrid = () => {
  // Carefully calculated pattern to avoid specific repetitions in columns
  // Each number represents which image from candidateImages array to use
  const pattern = [
    // Row 1: 0,1,2,3 (Gabriela=0, Fernanda=1, Agatha=2, Rafael=3)
    0, 1, 2, 3,
    // Row 2: 4,5,6,7 (Paulo=4, Fernanda Christine=5, Marcos Paulo=6, Lucas Cazzin=7)
    4, 5, 6, 7,
    // Row 3: 8,9,1,4 (Marina=8, Ricardo=9, Amanda=1, Gabriela=4)
    8, 9, 1, 4,
    // Row 4: 2,3,0,5 (Juliana=2, Bernardo=3, Sophia=0, André=5) - Changed Felipe from 6 to avoid column repeat with Ricardo
    2, 3, 0, 5,
    // Row 5: 7,8,4,6 (Felipe=7, Amanda=8, Sophia=4, Ricardo=6) - Felipe now 7, different from Ricardo's 9
    7, 8, 4, 6,
    // Row 6: 1,0,3,2 - Avoiding column conflicts
    1, 0, 3, 2,
    // Row 7: 5,6,8,9 - Different pattern for rejected candidates
    5, 6, 8, 9,
    // Row 8: 9,2,4,1 - Rafael Antunes=9, different positions
    9, 2, 4, 1,
    // Row 9: 3,7,6,0 - Vitor Almeida=7, different from Rafael's 9
    3, 7, 6, 0,
    // Row 10: 8,1,5,4
    8, 1, 5, 4
  ];
  
  return pattern;
};

// Generate the image distribution grid
const imageGrid = createImageGrid();

// Utility function to get candidate image
export const getCandidateImage = (candidateId: number) => {
  const index = (candidateId - 1) % imageGrid.length;
  return candidateImages[imageGrid[index]];
};

const CandidateCard = ({ candidate, onClick, isQualified = false }: CandidateCardProps) => {
  const { toast } = useToast();
  const candidateImage = getCandidateImage(candidate.id);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    toast({
      title: "Contacto iniciado",
      description: `Enviando convite para ${candidate.name}...`,
      variant: "glass",
      duration: 3000,
    });
  };

  return (
    <Card 
      className="group relative overflow-hidden border border-white/10 bg-card/90 backdrop-blur-md hover:bg-card hover:border-white/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full mx-auto h-[360px]"
      onClick={onClick}
    >
      <CardContent className="p-0 h-full">
        {/* Large Photo - Takes most of the space */}
        <div className="relative h-[240px] w-full overflow-hidden">
          <img 
            src={candidateImage} 
            alt={candidate.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Score Badge - Premium Glassmorphism Design */}
          <div className="absolute top-4 right-4 px-4 py-2 backdrop-blur-md border border-white/20 bg-white/10 rounded-lg shadow-lg hover:bg-white/15 transition-all duration-300">
            <span className="text-white font-semibold text-sm tracking-wide">{candidate.score}</span>
          </div>

          {/* Smaller gradient overlay for better transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-card/90 via-card/60 to-transparent" />
        </div>

        {/* Content at bottom with standardized spacing */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-card/90 via-card/70 to-transparent">
          <div className="flex flex-col justify-between h-[120px]">
            {/* Name section with fixed height */}
            <div className="flex items-start gap-2 min-h-[28px]">
              <h3 className="font-semibold text-lg text-white line-clamp-1 leading-7 flex-1">
                {candidate.name}
              </h3>
            </div>

            {/* Position section with fixed height */}
            <div className="min-h-[40px] flex items-start">
              <p className="text-sm text-white/90 line-clamp-2 leading-5">
                {candidate.position}
              </p>
            </div>

            {/* Actions row with fixed height */}
            <div className="flex items-center justify-between gap-3 min-h-[36px]">
              {/* View more icon */}
              <div className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer flex-shrink-0">
                <Eye className="h-4 w-4 text-white" />
              </div>

              {/* Contact Button - Responsive */}
              <Button 
                onClick={handleFollow}
                size="sm"
                className={`${
                  isQualified 
                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-100 border border-green-500/40 hover:border-green-500/60' 
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50'
                } transition-all duration-300 font-medium text-xs px-4 py-2 rounded-lg backdrop-blur-sm flex-1 ml-3 min-w-0 h-9`}
                variant="ghost"
                disabled={isQualified}
              >
                <div className="flex items-center gap-2 justify-center truncate">
                  {isQualified ? (
                    <>
                      <Check className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">Contatado</span>
                    </>
                  ) : (
                    <span className="truncate">Contatar</span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;