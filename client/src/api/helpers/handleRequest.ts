import { clientId, serverAddress } from "../../const/static";

export async function handleRequest(endpoint: string, options: RequestInit = {}) {
  return await fetch(serverAddress + endpoint, {
    ...options,
    headers: { Authorization: `Bearer ${clientId}`, ...(options?.headers ?? {}) },
  });
}
