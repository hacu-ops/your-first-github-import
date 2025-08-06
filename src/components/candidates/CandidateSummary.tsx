interface CandidateSummaryProps {
  summary: string;
  experiences: string[];
  professionalHistory: string;
  candidateInterest: string;
}

const CandidateSummary = ({ 
  summary, 
  experiences, 
  professionalHistory, 
  candidateInterest 
}: CandidateSummaryProps) => {
  return (
    <div className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-2xl border border-white/10 hover:border-white/15 transition-all duration-300 rounded-2xl p-6 glass-card-hover h-full">
      <h3 className="text-white text-base font-semibold mb-3">Resumo do Currículo</h3>
      
      <div className="space-y-3">
        {/* Summary */}
        <div>
          <h4 className="text-white text-sm font-medium mb-1.5">Perfil Profissional</h4>
          <p className="text-gray-200 text-sm leading-relaxed">{summary}</p>
        </div>

        {/* Previous Experiences */}
        <div>
          <h4 className="text-white text-sm font-medium mb-1.5">Experiências Prévias</h4>
          <div className="space-y-1.5">
            {experiences.map((exp, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <p className="text-gray-200 text-sm">{exp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional History */}
        <div>
          <h4 className="text-white text-sm font-medium mb-1.5">Histórico Profissional Relevante</h4>
          <p className="text-gray-200 text-sm leading-relaxed">{professionalHistory}</p>
        </div>

        {/* Candidate Interest */}
        <div>
          <h4 className="text-white text-sm font-medium mb-1.5">Interesse pela Vaga</h4>
          <p className="text-gray-200 text-sm leading-relaxed">{candidateInterest}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateSummary;