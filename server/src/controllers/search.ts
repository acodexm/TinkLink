import { RequestHandler } from "express";

import { dataNotFound, fetchSearchTransactions } from "../api";
import { executeAuthorized } from "./helpers";

export const search: RequestHandler = async (req, res) => {
  const { searchQuery } = req.body;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const transactionData = await fetchSearchTransactions(searchQuery, token);

    if (transactionData) {
      return res.json(transactionData);
    }

    return res.status(404).json(dataNotFound);
  });
};
