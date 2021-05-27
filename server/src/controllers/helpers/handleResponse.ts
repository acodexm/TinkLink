import { Response } from "node-fetch";

import { ResponseError } from "../../api/types";

export async function handleResponse<T = unknown>(
  response: Response,
): Promise<[T | undefined, ResponseError | undefined]> {
  try {
    if (response.status > 300) {
      console.error("handleResponse", response.statusText);
      return [undefined, handleError(response)];
    }

    return [(await response.json()) as T, undefined];
  } catch (error: unknown) {
    console.error("handleResponse", error);
    return [undefined, handleError(response)];
  }
}

const handleError = (res: Response): ResponseError => {
  return { errorCode: res.status, errorMessage: res.statusText || "unknown" };
};
