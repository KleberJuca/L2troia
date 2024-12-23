export const formatCurrency = (amount: number, currency: string): string => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(amount);
  };