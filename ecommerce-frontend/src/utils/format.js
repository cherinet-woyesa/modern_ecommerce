export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date, format = 'medium') => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format
  }).format(new Date(date));
};

export const formatRating = (rating) => {
  const rounded = Math.round(rating * 2) / 2;
  return rounded > 0 ? rounded : 0;
};

export const formatStockStatus = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  return 'In Stock';
};

export const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};
