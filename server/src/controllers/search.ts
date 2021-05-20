import { RequestHandler } from "express";
import fetch from "node-fetch";

import { tinkBaseUrl } from "../static";
import { executeAuthorized, handleResponse, v1 } from "./helpers";

type SearchResponseSuccess = V1.Search.Response;

export const search: RequestHandler = async (req, res) => {
  const { searchQuery } = req.body;

  executeAuthorized(res, req.headers.authorization, async token => {
    const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const [searchData, error] = await handleResponse<SearchResponseSuccess>(response);

    if (error) {
      return res.status(400).json(error);
    }
    if (searchData) {
      return res.json(searchData);
    }

    return res.status(500).json({ message: "unexpected error" });
  });
};
