export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(value);

export const formatPct = (value: number, digits = 1) => `${value > 0 ? '+' : ''}${value.toFixed(digits)}%`;
