import fetch from "node-fetch";

import { handleResponse } from "../controllers/helpers";
import { tinkBaseUrl } from "../static";
import { v1 } from "./consts";

export const fetchSearch = async (searchQuery: V1.Search.Query, token: V1.Auth.Response) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
    method: "POST",
    body: JSON.stringify(searchQuery),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });

  return await handleResponse<V1.Search.Response>(response);
};
