import { scaleValueV1, scaleValueV2 } from "./scaleValue";

describe("scaleValue", () => {
  it("should scale value correctly V1", () => {
    expect(scaleValueV1({ scale: 2, unscaledValue: -4050, currencyCode: "EUR" })).toBe(-40.5);
  });
  it("should scale value correctly V2", () => {
    expect(
      scaleValueV2({ value: { scale: "2", unscaledValue: "-4050" }, currencyCode: "EUR" }),
    ).toBe(-40.5);
  });
});
