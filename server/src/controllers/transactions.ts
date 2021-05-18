import { RequestHandler } from "express";
import fetch from "node-fetch";
import qs from "qs";

import { tinkBaseUrl } from "../static";
import { executeAuthorized, genericError, handleResponse, v2 } from "./helpers";

type TransactionListResponseSuccess = V2.Transactions.Response;

export const getTransactions: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, accountId, pageSize = 30, pageToken } = req.params;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const response = await fetch(
      `${tinkBaseUrl}${v2}/transactions${qs.stringify(
        { pageSize, pageToken, accountIdIn: [accountId] },
        { skipNulls: true, addQueryPrefix: true },
      )}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      },
    );
    const [transactions, error] = await handleResponse<TransactionListResponseSuccess>(response);

    if (error) {
      return res.status(400).json(error);
    }
    if (transactions) {
      return res.json(transactions);
    }

    return res.status(500).json(genericError);
  });
};
