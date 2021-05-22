import { RequestHandler } from "express";

import { dataNotFound, fetchTransactions } from "../api";
import { executeAuthorized } from "./helpers";

export const getTransactions: RequestHandler = async (req, res) => {
  const accountId = req.query.accountId as string;
  const pageSize = req.query.pageSize as string;
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const transactionData = await fetchTransactions(accountId, pageSize, pageToken, token);

    if (transactionData) {
      return res.json(transactionData);
    }

    return res.status(404).json(dataNotFound);
  });
};
