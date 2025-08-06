export const getPeriodComparisonText = (period: string, trend: number, customDateRange?: {from: Date | undefined, to: Date | undefined}): string => {
  const sign = trend >= 0 ? '+' : '';
  const value = `${sign}${trend}%`;
  
  switch (period) {
    case '1d':
      return `${value} vs ontem`;
    
    case '7d':
      return `${value} vs semana anterior`;
    
    case '30d':
      return `${value} vs mês anterior`;
    
    case 'all_time':
      return `${value} desde o início`;

    case 'custom':
      if (customDateRange?.from && customDateRange?.to) {
        const days = Math.ceil((customDateRange.to.getTime() - customDateRange.from.getTime()) / (1000 * 60 * 60 * 24));
        if (days === 1) {
          return `${value} vs dia anterior`;
        } else if (days <= 7) {
          return `${value} vs período anterior (${days} dias)`;
        } else if (days <= 31) {
          return `${value} vs período anterior (${Math.ceil(days / 7)} semanas)`;
        } else {
          return `${value} vs período anterior (${Math.ceil(days / 30)} meses)`;
        }
      }
      return `${value} vs período anterior`;
    
    default:
      return `${value} vs período anterior`;
  }
};

export const getPeriodDisplayName = (period: string): string => {
  switch (period) {
    case '1d':
      return 'Hoje';
    case '7d':
      return 'Últimos 7 dias';
    case '30d':
      return 'Últimos 30 dias';
    case 'custom':
      return 'Período personalizado';
    default:
      return 'Período selecionado';
  }
};