// Mock data for political dashboard
export interface PoliticalMetrics {
  interactions: {
    total: number;
    whatsapp: number;
    facebook: number;
    instagram: number;
    others: number;
    trend: number;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    score: number;
  };
  approval: {
    general: number;
    regional: {
      parana: number;
      curitiba: number;
      londrina: number;
      maringa: number;
    };
    trend: number;
  };
  engagement: {
    total: number;
    byRegion: Array<{
      city: string;
      value: number;
      population: number;
    }>;
  };
  demands: Array<{
    category: string;
    count: number;
    trend: number;
  }>;
  campaigns: Array<{
    name: string;
    reach: number;
    impact: number;
    date: string;
  }>;
  alerts: Array<{
    type: 'warning' | 'critical' | 'info';
    message: string;
    value: number;
    trend: number;
  }>;
  proposals: Array<{
    title: string;
    support: number;
    category: string;
  }>;
  governorActions: Array<{
    title: string;
    date: string;
    status: 'completed' | 'in-progress' | 'planned';
    category: string;
  }>;
}

export const generatePoliticalData = (period: string, region: string = "all"): PoliticalMetrics => {
  const getMultiplier = (p: string) => {
    switch(p) {
      case '1d': return 0.1;
      case '7d': return 1;
      case '30d': return 4;
      case 'all_time': return 20; // Multiplicador maior para o período total
      case 'custom': return 4; // Simula 30 dias por padrão para customizado
      default: return 1;
    }
  };
  const baseMultiplier = getMultiplier(period);
  
  let regionMultiplier = 1.0;
  const cityPopulations: { [key: string]: number } = {
    "Curitiba": 1963726, "Londrina": 575377, "Maringá": 430157,
    "Ponta Grossa": 355336, "Cascavel": 332333, "Foz do Iguaçu": 258248,
  };
  const totalParanaPopulation = 11500000;

  if (region !== "all") {
    const regionPopulation = cityPopulations[region] || 100000; // Default for smaller cities
    const populationFraction = regionPopulation / totalParanaPopulation;
    regionMultiplier = Math.pow(populationFraction, 0.5) * 5; // Non-linear scaling
  }

  const interactionsTotal = Math.round(15420 * baseMultiplier * regionMultiplier * (0.8 + Math.random() * 0.4));

  return {
    interactions: {
      total: interactionsTotal,
      whatsapp: Math.round(interactionsTotal * 0.7),
      facebook: Math.round(interactionsTotal * 0.15),
      instagram: Math.round(interactionsTotal * 0.1),
      others: Math.round(interactionsTotal * 0.05),
      trend: Math.random() > 0.3 ? Math.round(12 + Math.random() * 15) : -Math.round(3 + Math.random() * 8),
    },
    sentiment: {
      positive: 58 + Math.round(Math.random() * 15) + (region === "Curitiba" ? 5 : 0),
      neutral: 28 + Math.round(Math.random() * 10),
      negative: 14 + Math.round(Math.random() * 8) - (region === "Curitiba" ? 5 : 0),
      score: 7.2 + Math.random() * 1.6,
    },
    approval: {
      general: 64 + Math.round(Math.random() * 20),
      regional: {
        parana: 68 + Math.round(Math.random() * 15),
        curitiba: 71 + Math.round(Math.random() * 12),
        londrina: 62 + Math.round(Math.random() * 18),
        maringa: 66 + Math.round(Math.random() * 16),
      },
      trend: Math.random() > 0.4 ? Math.round(2 + Math.random() * 6) : -Math.round(1 + Math.random() * 4),
    },
    engagement: {
      total: Math.round(89340 * baseMultiplier * regionMultiplier * (0.7 + Math.random() * 0.6)),
      byRegion: [
        // Data remains the same, filtering happens at component level if needed
      ].map(city => ({
        ...city,
        value: Math.round(city.value * (0.7 + Math.random() * 0.6))
      })),
    },
    demands: [
      { category: 'Saúde', count: 3420, trend: 18 },
      { category: 'Educação', count: 2890, trend: 12 },
      { category: 'Segurança', count: 2540, trend: -5 },
      { category: 'Economia', count: 2100, trend: 25 },
      { category: 'Infraestrutura', count: 1850, trend: 8 },
      { category: 'Meio Ambiente', count: 1320, trend: 32 },
    ].map(d => ({ ...d, count: Math.round(d.count * baseMultiplier * regionMultiplier) })),
    campaigns: [
      // ...
    ],
    alerts: [
      { type: 'critical', message: `Queda na aprovação em ${region === 'all' ? 'Londrina' : region}`, value: -8, trend: -12 },
      { type: 'warning', message: 'Aumento de reclamações sobre saúde', value: 28, trend: 15 },
      { type: 'info', message: 'Crescimento no engajamento jovem', value: 34, trend: 22 },
    ].filter(() => region === 'all' || Math.random() > 0.3), // Simulate fewer alerts for specific regions
    proposals: [
      { title: `Hospital Regional de ${region === 'all' ? 'Londrina' : region}`, support: 82, category: 'Saúde' },
      { title: 'Programa Universidade Gratuita', support: 74, category: 'Educação' },
      { title: 'Expansão do Metrô de Curitiba', support: 79, category: 'Transporte' },
    ],
    governorActions: [
      // ...
    ],
  };
};

export const getTopicTrends = (period: string, region: string = "all") => {
  const trends = [
    { topic: 'Reforma da Saúde', mentions: 2340, sentiment: 'positive', change: 18 },
    { topic: 'Segurança Pública', mentions: 1890, sentiment: 'neutral', change: -5 },
    { topic: 'Educação Técnica', mentions: 1650, sentiment: 'positive', change: 25 },
    { topic: 'Economia Regional', mentions: 1420, sentiment: 'negative', change: 12 },
    { topic: 'Meio Ambiente', mentions: 1200, sentiment: 'positive', change: 35 },
    { topic: 'Transporte Público', mentions: 980, sentiment: 'negative', change: -12 },
  ];

  const multiplier = period === '1d' ? 0.1 : period === '7d' ? 0.7 : 1;
  let regionMultiplier = 1.0;
  if (region !== "all") {
    regionMultiplier = 0.3; // Simplified multiplier for topics
  }

  return trends.map(trend => ({
    ...trend,
    mentions: Math.round(trend.mentions * multiplier * regionMultiplier),
    topic: region !== "all" ? `${trend.topic} em ${region}` : trend.topic
  }));
};