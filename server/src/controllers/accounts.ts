import { RequestHandler } from "express";

import { dataNotFound, fetchAccounts } from "../api";
import { executeAuthorized } from "./helpers";
import { sendError } from "./helpers/sendError";

export const getAccountList: RequestHandler = async (req, res) => {
  const pageSize = (req.query.pageSize as string) || "5";
  const pageToken = req.query.pageToken as string;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const [accounts, error] = await fetchAccounts(pageSize, pageToken, token);

    if (error) {
      return sendError(res, error);
    }
    if (accounts) {
      return res.json(accounts);
    }

    return sendError(res, dataNotFound);
  });
};
