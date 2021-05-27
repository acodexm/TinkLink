import { RequestHandler } from "express";

import { dataNotFound, fetchAccountBalance, fetchTransactions } from "../api";
import { executeAuthorized } from "./helpers";
import { sendError } from "./helpers/sendError";

export const getAccount: RequestHandler = async (req, res) => {
  const accountId = req.query.accountId as string;
  const pageSize = req.query.pageSize as string;
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const [accountBalance, error1] = await fetchAccountBalance(accountId, token);
    const [transactions, error2] = await fetchTransactions(accountId, pageSize, pageToken, token);

    if (error1) {
      return sendError(res, error1);
    }

    if (error2) {
      return sendError(res, error2);
    }
    if (accountBalance && transactions) {
      return res.json({ account: accountBalance, transactions });
    }

    return sendError(res, dataNotFound);
  });
};
