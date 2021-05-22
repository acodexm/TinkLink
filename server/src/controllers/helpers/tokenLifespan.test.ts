import fetch from "node-fetch";

import { AuthModel } from "../../models";
import { checkIfTokenExpired } from "./tokenLifespan";

let mockTokenResponse = true;

jest.mock("node-fetch", () => jest.fn());
jest.mock("./handleResponse", () => ({
  handleResponse: jest.fn(() => [mockTokenResponse]),
}));
jest.mock("../../models", () => ({
  Auth: jest.fn(() => ({ save: jest.fn() })),
}));
const mockErrorLog = jest.fn();

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
  beforeEach(jest.clearAllMocks);
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

    expect(fetch).toBeCalledTimes(1);
    expect(isTokenValid).toBe(true);
  });
  it("should return false if token cannot be refreshed", async () => {
    mockTokenResponse = false;
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 20); //let it expire
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetch).toBeCalledTimes(1);
    expect(isTokenValid).toBe(false);
    expect(mockErrorLog).toBeCalledTimes(1);
  });
  it("should NOT call fetchRefreshToken if timeout", async () => {
    const createdAt = new Date();
    const expiresIn = 10; //seconds

    createdAt.setSeconds(createdAt.getSeconds() - 5); //still valid
    const isTokenValid = await checkIfTokenExpired(mockToken(expiresIn, createdAt), "testClientId");

    expect(fetch).not.toBeCalled();
    expect(isTokenValid).toBe(true);
  });
});
