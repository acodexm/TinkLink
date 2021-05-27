import { Response } from "node-fetch";

import { ResponseError, ValidResponsePromise } from "../../api/types";

export async function handleResponse<T = unknown>(response: Response): ValidResponsePromise<T> {
  try {
    if (response.status > 300) {
      console.error("handleResponse", response.statusText);
      return [undefined, normalizeError(response)];
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
