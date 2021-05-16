import { Response } from "node-fetch";

export async function handleResponse<T = unknown, V = unknown>(
  response: Response,
): Promise<[T | undefined, V | undefined]> {
  try {
    if (response.status !== 200) {
      console.error(response.statusText);
      return [, (await response.json()) as V];
    }

    return [(await response.json()) as T, undefined];
  } catch (error: unknown) {
    console.error(error);
  }

  return [undefined, { message: "Unexpected error" } as unknown as V];
}
