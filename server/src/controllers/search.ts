import { RequestHandler } from "express";

import { tinkBaseUrl } from "../static";
import { handleResponse } from "../utils/handleResponse";
import { SearchData } from "./../models";
import { makeEncodedBody } from "./../utils/makeEncodedBody";
import { v1 } from "./helpers/api";
import { executeAuthorized } from "./helpers/executeAuthorized";

export const search: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, searchQuery } = req.body;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const response = await fetch(`${tinkBaseUrl}${v1}/search`, {
      method: "POST",
      body: makeEncodedBody(searchQuery),
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const [transactions, error] = await handleResponse<SearchData>(response);

    if (error) {
      return res.json(error);
    }
    if (transactions) {
      return res.json({ transactions });
    }

    return res.status(500).json({ message: "unexpected error" });
  });
};
