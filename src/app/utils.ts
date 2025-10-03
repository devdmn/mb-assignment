export const formatCurrency = (value: number) => {
  const formatted = Math.abs(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return value < 0 ? `-₹${formatted}` : `₹${formatted}`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
