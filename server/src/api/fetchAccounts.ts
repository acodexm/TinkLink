import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import { tinkBaseUrl } from "../static";
import { v2 } from "./consts";

export const fetchAccounts = async (
  pageSize: string,
  pageToken: string,
  token: V1.Auth.Response,
) => {
  const response = await fetch(
    `${tinkBaseUrl}${v2}/accounts${qs.stringify(
      { pageSize, pageToken },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/json",
      },
    },
  );

  return await handleResponse<V2.Accounts.Response>(response);
};
