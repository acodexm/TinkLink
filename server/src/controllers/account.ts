import { RequestHandler } from "express";
import fetch from "node-fetch";
import qs from "qs";

import { tinkBaseUrl } from "../static";
import { genericError, v1, v2 } from "./helpers/api";
import { executeAuthorized } from "./helpers/executeAuthorized";
import { handleResponse } from "./helpers/handleResponse";

type AccountListResponseSuccess = V2.Accounts.Response;
type AccountBalanceResponseSuccess = V1.Ballance.Response;
type AccountTransactionsResponseSuccess = V1.Search.Response;

export const getAccountList: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, pageSize = 5, pageToken } = req.params;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const response = await fetch(
      `${tinkBaseUrl}${v2}/accounts${qs.stringify(
        { pageSize, pageToken },
        { skipNulls: true, addQueryPrefix: true },
      )}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      },
    );
    const [accounts, error] = await handleResponse<AccountListResponseSuccess>(response);

    if (error) {
      return res.status(400).json(error);
    }
    if (accounts) {
      return res.json({ accounts });
    }

    return res.status(500).json(genericError);
  });
};

export const getAccount: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, accountId } = req.params;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const res1 = await fetch(`${tinkBaseUrl}${v1}/accounts/${accountId}/balances`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const [data1, error1] = await handleResponse<AccountBalanceResponseSuccess>(res1);

    if (error1) {
      return res.status(400).json(error1);
    }
    const searchQuery: V1.Search.Query = {
      accounts: [accountId],
    };
    const res2 = await fetch(`${tinkBaseUrl}${v1}/search`, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const [data2, error2] = await handleResponse<AccountTransactionsResponseSuccess>(res2);

    if (error2) {
      return res.status(400).json(error2);
    }
    if (data1 && data2) {
      return res.json({ account: data1, transactions: data2.results });
    }

    return res.status(500).json(genericError);
  });
};
