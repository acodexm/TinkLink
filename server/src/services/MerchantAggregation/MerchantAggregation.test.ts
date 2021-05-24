import { expectedResult, mockData } from "./data.test";
import MerchantAggregation from "./MerchantAggregation";

const aggregator = MerchantAggregation.getInstance();

describe("MerchantAggregation service", () => {
  it("should has empty data", () => {
    expect(aggregator.isEmptyData()).toBe(true);
  });
  it("should aggregate data", async () => {
    await aggregator.aggregateTransactionsV1(mockData);
    const result = aggregator.getFavoriteMerchants();

    expect(aggregator.isEmptyData()).toBe(false);
    expect(result).toEqual(expectedResult);
  });
});
