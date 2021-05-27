import { ResponseError } from "./types";

const expectedErrorCodes = [400, 401, 403, 404, 500];
const isExpectedErrorCode = (code: number) => expectedErrorCodes.some(errCode => errCode === code);

export async function handleResponse<T = unknown>(
  response: Response,
): Promise<[T | undefined, ResponseError | undefined]> {
  try {
    console.info(response.status);
    if (isExpectedErrorCode(response.status)) {
      console.error("handleResponse", response.statusText);
      return [undefined, await response.json()];
    }

    return [(await response.json()) as T, undefined];
  } catch (error: unknown) {
    console.error("handleResponse", error);
    return [undefined, normalizeError(response)];
  }
}

const normalizeError = (res: Response): ResponseError => {
  return { errorCode: res.status, errorMessage: res.statusText || "unknown" };
};
