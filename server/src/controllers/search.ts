import { RequestHandler } from "express";

import { dataNotFound, fetchSearchTransactions } from "../api";
import { executeAuthorized } from "./helpers";
import { sendError } from "./helpers/sendError";

export const search: RequestHandler = async (req, res) => {
  const { searchQuery } = req.body;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const [transactionData, error] = await fetchSearchTransactions(searchQuery, token);

    if (error) {
      return sendError(res, error);
    }
    if (transactionData) {
      return res.json(transactionData);
    }

    return sendError(res, dataNotFound);
  });
};
