export const formatCurrency = (amount: string) => {
  const numeric = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numeric);
};

export const parseCurrency = (amount: string) => {
  return parseInt(amount.replace(/\D/g, ""), 10) || 0;
};
