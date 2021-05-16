export async function handleRequest<T = unknown, V = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<[T | undefined, V | undefined]> {
  const response = await fetch(process.env.REACT_APP_SERVER_ORIGIN + endpoint, options);

  try {
    if (response.status !== 200) {
      console.error(response.statusText);
      return [undefined, (await response.json()) as V];
    }

    return [(await response.json()) as T, undefined];
  } catch (error: unknown) {
    console.error(error);
  }

  return [undefined, { message: "Unexpected error" } as unknown as V];
}
