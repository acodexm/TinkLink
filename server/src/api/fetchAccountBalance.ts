import fetch from "node-fetch";

import { handleResponse } from "../controllers/helpers";
import { tinkBaseUrl } from "../static";
import { v1 } from "./consts";

export const fetchAccountBalance = async (accountId: string, token: V1.Auth.Response) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/accounts/${accountId}/balances`, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  return await handleResponse<V1.Ballance.Response>(response);
};
