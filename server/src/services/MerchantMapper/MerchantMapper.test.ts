import { expectedResultV1, expectedResultV2, mockDataV1, mockDataV2 } from "./data.test";
import MerchantMapper from "./MerchantMapper";

jest.mock("node-fetch");
jest.mock("../../controllers/helpers", () => ({
  handleResponse: jest.fn(() => [[{ logo: "http://test" }]]),
}));
const mapper = MerchantMapper.getInstance();

describe("MerchantMapper service", () => {
  it("should map given transactions from v1 api", async () => {
    const result = await mapper.mapTransactionsV1(mockDataV1);

    expect(result).toEqual(expectedResultV1);
  });
  it("should map given transactions from v2 api", async () => {
    const result = await mapper.mapTransactionsV2(mockDataV2);

    expect(result).toEqual(expectedResultV2);
  });
});
