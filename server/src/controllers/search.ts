import { RequestHandler } from "express";
import fetch from "node-fetch";

import { tinkBaseUrl } from "../static";
import { executeAuthorized, handleResponse, v1 } from "./helpers";

type SearchResponseSuccess = V1.Search.Response;

export const search: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, searchQuery } = req.body;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const [transactions, error] = await handleResponse<SearchResponseSuccess>(response);

    if (error) {
      return res.status(400).json(error);
    }
    if (transactions) {
      return res.json(transactions);
    }

    return res.status(500).json({ message: "unexpected error" });
  });
};
