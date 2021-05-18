export const formatNumber = (value: string | number) => {
  if (typeof value === "number") return value.toFixed(2);
  return parseFloat(value).toFixed(2);
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;

  return `${date.getFullYear()}-${month
    .toString()
    .padStart(2, "0")}-${date.getDate()}`;
};
