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
