import { formatMoney } from "./format";

describe("format utils", () => {
  it("formats money", () => {
    expect(formatMoney({ currencyCode: "USD", value: { scale: "1", unscaledValue: "45" } })).toBe(
      "$4.50",
    );
  });
  //todo other
});
