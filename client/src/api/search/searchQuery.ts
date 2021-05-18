import { handleRequest } from "../handleRequest";
import { SearchData, SearchQuery } from "./../../model/Search";

const clientId = process.env.REACT_APP_TINK_CLIENT_ID;
const clientSecret = process.env.REACT_APP_TINK_CLIENT_SECRET;

export const searchQuery = async (search: SearchQuery) => {
  const [data, error] = await handleRequest<SearchData>("/search", {
    method: "POST",
    body: JSON.stringify({ clientId, clientSecret, searchQuery: search }),
    headers: { "Content-Type": "application/json" },
  });

  if (error) return null;
  return data;
};
