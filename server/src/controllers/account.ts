import { RequestHandler } from "express";
import fetch from "node-fetch";

import { AccountData } from "../models";
import { tinkBaseUrl } from "../static";
import { v1 } from "./helpers/api";
import { executeAuthorized } from "./helpers/executeAuthorized";
import { handleResponse } from "./helpers/handleResponse";

type AccountResponseSuccess = AccountData;

export const getAccount: RequestHandler = async (req, res) => {
  const { clientId, clientSecret } = req.params;

  executeAuthorized(res, { clientId, clientSecret }, async token => {
    const response = await fetch(`${tinkBaseUrl}${v1}/accounts/list`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const [accounts, error] = await handleResponse<AccountResponseSuccess>(response);

    if (error) {
      return res.json(error);
    }
    if (accounts) {
      return res.json({ accounts });
    }

    return res.status(500).json({ message: "unexpected error" });
  });
};
