import { handleRequest } from "../handleRequest";

export const searchQuery = async (search: V1.Search.Query) => {
  const [data, error] = await handleRequest<V1.Search.Response>("/search", {
    method: "POST",
    body: JSON.stringify({ searchQuery: search }),
    headers: { "Content-Type": "application/json" },
  });

  if (error) return null;
  return data;
};
