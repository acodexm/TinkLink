import { RequestHandler } from "express";
import { isString } from "lodash";

import { fetchSearchTransactions } from "../api";
import MerchantAggregation from "../services/MerchantAggregation/MerchantAggregation";
import { executeAuthorized } from "./helpers";

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
      return res.json([result[category.toLowerCase()]]);
    }

    return res.json(Object.values(result));
  });
};
