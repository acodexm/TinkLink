import { fetchRefreshToken, fetchSearch } from "../../api";
import { AuthModel } from "../../models";
import { checkIfTokenExpired } from "./tokenLifespan";

let mockFetchSearch = [undefined, { errorCode: 200 }];
let mockFetchRefreshToken = [{}, undefined];
const mockSave = jest.fn();
const mockErrorLog = jest.fn();

jest.mock("../../api", () => ({
  fetchSearch: jest.fn(() => mockFetchSearch),
  fetchRefreshToken: jest.fn(() => mockFetchRefreshToken),
}));
jest.mock("../../models", () => ({
  Auth: jest.fn(() => ({ save: mockSave })),
}));
console.error = mockErrorLog;
const mockToken = (expireIn: number, createdAt: Date) =>
  ({
    token: {
      expires_in: expireIn,
      refresh_token: "test-token",
    },
    timestamp: createdAt,
  } as AuthModel);

describe("tokenLifespan helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchSearch = [undefined, { errorCode: 200 }];
    mockFetchRefreshToken = [{}, undefined];
  });
  it("should determine expiration", () => {
    const timestamp = new Date("02-02-2020");
    const now = new Date("02-03-2020");
    const expires_in = 24 * 60 * 60 + 10; //one day +10s

    expect(now > timestamp).toBe(true);

    timestamp.setSeconds(timestamp.getSeconds() + expires_in);
    expect(now > timestamp).toBe(false);
  });
  it("should call fetchRefreshToken if timeout", async () => {
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 20); //let it expire
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetchRefreshToken).toBeCalledTimes(1);
    expect(isTokenValid).toBe(true);
    expect(fetchSearch).not.toBeCalled();
  });
  it("should return false if token cannot be refreshed", async () => {
    mockFetchSearch = [undefined, { errorCode: 401 }];
    mockFetchRefreshToken = [undefined, undefined];
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 20); //let it expire
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetchRefreshToken).toBeCalledTimes(1);
    expect(mockErrorLog).toBeCalledTimes(0);
    expect(isTokenValid).toBe(false);
    expect(fetchSearch).not.toBeCalled();
  });
  it("should return false if token cannot be saved", async () => {
    mockFetchSearch = [undefined, { errorCode: 401 }];
    mockFetchRefreshToken = [{}, undefined];
    const error = new Error("database error");

    mockSave.mockImplementationOnce(() => {
      throw error;
    });
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 20); //let it expire
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetchRefreshToken).toBeCalledTimes(1);
    expect(mockErrorLog).toBeCalledTimes(1);
    expect(mockErrorLog).toBeCalledWith("[refreshToken] Unable to update database", error);
    expect(isTokenValid).toBe(false);
    expect(fetchSearch).not.toBeCalled();
  });
  it("should NOT call fetchRefreshToken if timeout", async () => {
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 5); //still valid
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetchSearch).toBeCalledTimes(1);
    expect(isTokenValid).toBe(true);
  });
});
