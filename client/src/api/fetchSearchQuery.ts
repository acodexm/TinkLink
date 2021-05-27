import { handleError } from "./helpers/handleError";
import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";

export const searchQuery = async (search: V1.Search.Query) => {
  const response = await handleRequest("/search", {
    method: "POST",
    body: JSON.stringify({ searchQuery: search }),
    headers: { "Content-Type": "application/json" },
  });

  return await handleResponse<V1.Search.Response>(response).then(handleError);
};
