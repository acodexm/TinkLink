import { RequestHandler } from "express";
import { isString } from "lodash";

import { dataNotFound, fetchSearchTransactions } from "../api";
import MerchantAggregation from "../services/MerchantAggregation";
import { executeAuthorized } from "./helpers";
import { sendError } from "./helpers/sendError";

export const getAggregatedTransactions: RequestHandler = async (req, res) => {
  const { category } = req.query;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const aggregator = MerchantAggregation.getInstance();

    if (aggregator.isEmptyData()) {
      const [transactionData, error] = await fetchSearchTransactions(
        {
          startDate: 1577833200000,
          limit: 10000,
        },
        token,
      );

      if (error) {
        return sendError(res, error);
      }
      if (!transactionData) {
        return sendError(res, dataNotFound);
      }
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
