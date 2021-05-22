import { RequestHandler } from "express";
import { isString } from "lodash";

import { dataNotFound, fetchSearchTransactions } from "../api";
import MerchantAggregation from "../services/MerchantAggregation/MerchantAggregation";
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

export const getAggregatedTransactions: RequestHandler = async (req, res) => {
  const { category } = req.query;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const aggregator = MerchantAggregation.getInstance();

    if (aggregator.isEmptyData()) {
      const transactionData = await fetchSearchTransactions(
        {
          startDate: 1577833200000,
          limit: 10000,
        },
        token,
      );

      if (transactionData) {
        await aggregator.aggregateTransactionsV1(transactionData);
      }
    }
    const result = aggregator.getFavoriteMerchants();

    if (isString(category) && result[category]) {
      res.json([result[category]]);
    }

    return res.json(Object.values(result));
  });
};
