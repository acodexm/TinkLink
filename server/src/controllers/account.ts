import { RequestHandler } from "express";

import {
  dataNotFound,
  fetchAccountBalance,
  fetchAccounts,
  fetchSearchTransactions,
  fetchTransactions,
} from "../api";
import { executeAuthorized } from "./helpers";

export const getAccountList: RequestHandler = async (req, res) => {
  const pageSize = (req.query.pageSize as string) || "5";
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const accounts = await fetchAccounts(pageSize, pageToken, token);

    if (accounts) {
      return res.json(accounts);
    }

    return res.status(404).json(dataNotFound);
  });
};

export const getAccount: RequestHandler = async (req, res) => {
  const accountId = req.query.accountId as string;
  const pageSize = req.query.pageSize as string;
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const accountBalance = await fetchAccountBalance(accountId, token);
    const transactions = await fetchTransactions(accountId, pageSize, pageToken, token);

    if (accountBalance && transactions) {
      return res.json({ account: accountBalance, transactions });
    }

    return res.status(404).json(dataNotFound);
  });
};
