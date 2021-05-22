import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import MerchantMapper from "../services/MerchantMapper";
import { tinkBaseUrl } from "../static";
import { v2 } from "./consts";

export const fetchTransactions = async (
  accountId: string,
  pageSize: string,
  pageToken: string,
  token: V1.Auth.Response,
) => {
  const response = await fetch(
    `${tinkBaseUrl}${v2}/transactions${qs.stringify(
      { pageSize, pageToken, accountIdIn: [accountId] },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    },
  );
  const [transactions, error] = await handleResponse<V2.Transactions.Response>(response);

  if (error || !transactions) {
    return;
  }

  const mapper = MerchantMapper.getInstance();

  return await mapper.mapTransactionsV2(transactions);
};
