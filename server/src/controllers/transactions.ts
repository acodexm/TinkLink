import { RequestHandler } from "express";
import fetch from "node-fetch";
import qs from "qs";

import MerchantMapper from "../services/MerchantMapper";
import { tinkBaseUrl } from "../static";
import { executeAuthorized, genericError, handleResponse, v2 } from "./helpers";

type TransactionListResponseSuccess = V2.Transactions.Response;

export const getTransactions: RequestHandler = async (req, res) => {
  const { accountId, pageSize = 30, pageToken } = req.query;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
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

    if (error || !transactions) {
      return res.status(400).json(error);
    }
    const mapper = MerchantMapper.getInstance();
    const transactionData: V2.Transactions.Response = {
      nextPageToken: transactions.nextPageToken,
      transactions: [],
    };

    for (const item of transactions.transactions) {
      const newItem = await mapper.mapTransactionV2(item);

      transactionData.transactions.push(newItem);
    }
    if (transactionData) {
      return res.json(transactionData);
    }

    return res.status(500).json(genericError);
  });
};
