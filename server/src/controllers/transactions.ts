import { RequestHandler } from "express";

import { dataNotFound, fetchTransactions } from "../api";
import { executeAuthorized } from "./helpers";
import { sendError } from "./helpers/sendError";

export const getTransactions: RequestHandler = async (req, res) => {
  const accountId = req.query.accountId as string;
  const pageSize = req.query.pageSize as string;
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const [transactionData, error] = await fetchTransactions(accountId, pageSize, pageToken, token);

    if (error) {
      return sendError(res, error);
    }
    if (transactionData) {
      return res.json(transactionData);
    }

    return sendError(res, dataNotFound);
  });
};
