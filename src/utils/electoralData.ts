export interface Opportunity {
  id: number;
  rank: number;
  title: string;
  description: string;
  citations: number;
  city: string;
  category: string;
  impactScore: number;
  urgency: 'alto' | 'medio' | 'baixo';
  type?: 'emerging' | 'strategic';
  analysis: {
    trendData: { date: string; mentions: number }[];
    engagementByCity: { city: string; engagement: number }[];
    popularComments: string[];
  };
}

export const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    rank: 1,
    title: "Construção de hospital em Cascavel",
    description: "Demanda crescente por um novo hospital regional para atender a população de Cascavel e cidades vizinhas.",
    citations: 432,
    city: "Cascavel",
    category: "Saúde",
    impactScore: 95,
    urgency: 'alto',
    type: 'strategic',
    analysis: {
      trendData: [{ date: 'Sem 1', mentions: 50 }, { date: 'Sem 2', mentions: 120 }, { date: 'Sem 3', mentions: 250 }, { date: 'Sem 4', mentions: 432 }],
      engagementByCity: [{ city: 'Cascavel', engagement: 80 }, { city: 'Toledo', engagement: 15 }, { city: 'Foz do Iguaçu', engagement: 5 }],
      popularComments: ["'Nossa cidade precisa de mais leitos, a situação está crítica.'", "'Um hospital novo seria a maior obra dos últimos 20 anos.'"]
    }
  },
  {
    id: 2,
    rank: 2,
    title: "Duplicação da rodovia entre Londrina e Maringá",
    description: "Melhoria da infraestrutura viária para aumentar a segurança e escoamento da produção.",
    citations: 378,
    city: "Londrina/Maringá",
    category: "Infraestrutura",
    impactScore: 92,
    urgency: 'alto',
    type: 'emerging',
    analysis: {
      trendData: [{ date: 'Sem 1', mentions: 80 }, { date: 'Sem 2', mentions: 150 }, { date: 'Sem 3', mentions: 290 }, { date: 'Sem 4', mentions: 378 }],
      engagementByCity: [{ city: 'Londrina', engagement: 55 }, { city: 'Maringá', engagement: 40 }, { city: 'Apucarana', engagement: 5 }],
      popularComments: ["'Essa estrada é um perigo, já passou da hora de duplicar.'", "'A economia da região vai crescer muito com essa obra.'"]
    }
  },
  {
    id: 3,
    rank: 3,
    title: "Programa de qualificação para jovens em Curitiba",
    description: "Criação de cursos técnicos e profissionalizantes para jovens em busca do primeiro emprego.",
    citations: 295,
    city: "Curitiba",
    category: "Educação",
    impactScore: 88,
    urgency: 'medio',
    analysis: {
      trendData: [{ date: 'Sem 1', mentions: 100 }, { date: 'Sem 2', mentions: 180 }, { date: 'Sem 3', mentions: 250 }, { date: 'Sem 4', mentions: 295 }],
      engagementByCity: [{ city: 'Curitiba', engagement: 90 }, { city: 'São José dos Pinhais', engagement: 10 }],
      popularComments: ["'Nossos jovens precisam de oportunidade para entrar no mercado de trabalho.'", "'Falta mão de obra qualificada na cidade.'"]
    }
  },
  {
    id: 4,
    rank: 4,
    title: "Aumento do policiamento em Foz do Iguaçu",
    description: "Reforço na segurança pública na região de fronteira para combater o crime.",
    citations: 251,
    city: "Foz do Iguaçu",
    category: "Segurança",
    impactScore: 85,
    urgency: 'alto',
    type: 'strategic',
    analysis: {
      trendData: [{ date: 'Sem 1', mentions: 60 }, { date: 'Sem 2', mentions: 110 }, { date: 'Sem 3', mentions: 190 }, { date: 'Sem 4', mentions: 251 }],
      engagementByCity: [{ city: 'Foz do Iguaçu', engagement: 100 }],
      popularComments: ["'A sensação de insegurança aqui na fronteira é muito grande.'", "'Precisamos de mais policiais nas ruas.'"]
    }
  },
  {
    id: 5,
    rank: 5,
    title: "Incentivo ao turismo na Costa Oeste",
    description: "Criação de um plano de desenvolvimento turístico para as cidades do Lago de Itaipu.",
    citations: 189,
    city: "Costa Oeste",
    category: "Turismo",
    impactScore: 78,
    urgency: 'baixo',
    type: 'emerging',
    analysis: {
      trendData: [{ date: 'Sem 1', mentions: 30 }, { date: 'Sem 2', mentions: 70 }, { date: 'Sem 3', mentions: 120 }, { date: 'Sem 4', mentions: 189 }],
      engagementByCity: [{ city: 'Santa Helena', engagement: 40 }, { city: 'Marechal Cândido Rondon', engagement: 35 }, { city: 'Guaíra', engagement: 25 }],
      popularComments: ["'Temos um potencial turístico enorme que não é aproveitado.'", "'Isso geraria muito emprego para a nossa região.'"]
    }
  }
];