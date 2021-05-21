import { RequestHandler } from "express";
import { omit } from "lodash";
import fetch from "node-fetch";

import MerchantMapper from "../services/MerchantMapper";
import { tinkBaseUrl } from "../static";
import { executeAuthorized, handleResponse, v1 } from "./helpers";
import { genericError } from "./helpers/api";

type SearchResponseSuccess = V1.Search.Response;

export const search: RequestHandler = async (req, res) => {
  const { searchQuery } = req.body;

  executeAuthorized(res, req.headers.authorization, async ({ token }) => {
    const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const [searchData, error] = await handleResponse<SearchResponseSuccess>(response);

    if (error || !searchData) {
      return res.status(400).json(error || genericError);
    }

    const mapper = MerchantMapper.getInstance();
    const transactionData: V1.Search.Response = { ...omit(searchData, "results"), results: [] };

    for (const item of searchData.results) {
      const newItem = await mapper.mapTransactionV1(item);

      transactionData.results.push(newItem);
    }
    if (searchData) {
      return res.json(searchData);
    }

    return res.status(500).json({ message: "unexpected error" });
  });
};
