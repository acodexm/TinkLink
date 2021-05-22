import fetch from "node-fetch";

import { handleResponse } from "../controllers/helpers";
import MerchantMapper from "../services/MerchantMapper";
import { tinkBaseUrl } from "../static";
import { v1 } from "./consts";

export const fetchSearchTransactions = async (
  searchQuery: V1.Search.Query,
  token: V1.Auth.Response,
) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
    method: "POST",
    body: JSON.stringify(searchQuery),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });
  const [searchData, error] = await handleResponse<V1.Search.Response>(response);

  if (error || !searchData) {
    return;
  }

  const mapper = MerchantMapper.getInstance();

  return await mapper.mapTransactionsV1(searchData);
};
