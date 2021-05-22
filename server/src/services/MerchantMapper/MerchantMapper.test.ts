import mockFetch from "node-fetch";

import { expectedResultV1, expectedResultV2, mockDataV1, mockDataV2 } from "./data.test";
import MerchantMapper from "./MerchantMapper";

jest.mock("node-fetch", () => jest.fn());
jest.mock("../../controllers/helpers", () => ({
  handleResponse: jest.fn(() => [[{ logo: "http://test" }]]),
}));
let mapper: MerchantMapper;

describe("MerchantMapper service", () => {
  beforeAll(() => {
    mapper = MerchantMapper.getInstance();
  });
  beforeEach(jest.clearAllMocks);
  it("should map given transactions from v1 api", async () => {
    const result = await mapper.mapTransactionsV1(mockDataV1);

    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(expect.stringMatching(/testDescription/));
    expect(result).toEqual(expectedResultV1);
    expect(result.results.length).toBe(mockDataV1.results.length);
  });
  it("should map given transactions from v2 api", async () => {
    const result = await mapper.mapTransactionsV2(mockDataV2);

    expect(mockFetch).toBeCalledTimes(0); //testDescription is already fetched
    expect(result).toEqual(expectedResultV2);
    expect(result.transactions.length).toBe(mockDataV2.transactions.length);
  });
});
