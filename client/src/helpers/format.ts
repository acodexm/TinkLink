import formatter from "money-formatter";

export const formatNumber = (value: string | number) => {
  if (typeof value === "number") return value.toFixed(2);
  return parseFloat(value).toFixed(2);
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;

  return `${date.getFullYear()}-${month.toString().padStart(2, "0")}-${date.getDate()}`;
};
type SupportedValues = Currency | V2.Transactions.Amount | ScaledCurrency;
const isV1 = (value: SupportedValues): value is Currency => value.hasOwnProperty("unscaledValue");
const isV2 = (value: SupportedValues): value is V2.Transactions.Amount =>
  value.hasOwnProperty("value");

export const formatMoney = (value: SupportedValues) => {
  if (isV2(value)) {
    const scaledValue = scaleValueV2(value);

    return formatter.format(value.currencyCode, scaledValue);
  }
  if (isV1(value)) {
    const scaledValue = scaleValueV1(value);

    return formatter.format(value.currencyCode, scaledValue);
  }

  return formatter.format(value.currencyCode, value.scaledValue);
};

export const scaleValueV1 = (value: Currency) => {
  const num = value.unscaledValue.toString();
  const start = num.slice(0, -value.scale);
  const end = num.slice(-value.scale);

  return parseFloat(`${start}.${end}`);
};
export const scaleValueV2 = (amount: V2.Transactions.Amount) => {
  const num = amount.value.unscaledValue.toString();
  const start = num.slice(0, -amount.value.scale);
  const end = num.slice(-amount.value.scale);

  return parseFloat(`${start}.${end}`);
};
