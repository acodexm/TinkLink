import { Response } from "node-fetch";

export async function handleResponse<T = unknown, V = unknown>(
  response: Response,
): Promise<[T | undefined, V | undefined]> {
  try {
    if (response.status !== 200) {
      console.error("handleResponse", response.statusText);
      throw await response.json();
    }

    return [(await response.json()) as T, undefined];
  } catch (error: unknown) {
    console.error("handleResponse", error);
    return [undefined, error as V];
  }
}
