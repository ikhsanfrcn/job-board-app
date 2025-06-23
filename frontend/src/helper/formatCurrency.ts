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

export const formatRupiah = (
  value: string | number | null | undefined
): string => {
  if (!value || isNaN(Number(value))) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
};
