import { RequestHandler } from "express";

import { Account, AccountData, Authorize } from "../models";
import { tinkBaseUrl } from "../static";
import { handleResponse } from "../utils/handleResponse";
import { v1 } from "./api";

type AccountResponseSuccess = AccountData;

export const getAccount: RequestHandler = async (req, res) => {
  const { clientId } = req.params;

  Authorize.find({ clientId }, async (err, authData) => {
    if (err) return res.status(500).json(err);
    if (!authData || authData.length === 0)
      return res.status(401).json({
        key: "no.result",
        message: "Unauthorized",
      });
    const response = await fetch(`${tinkBaseUrl}${v1}/accounts/list`, {
      headers: { Authorization: `Bearer ${authData[0].token.access_token}` },
    });
    const [accounts, error] = await handleResponse<AccountResponseSuccess>(response);

    if (error) {
      return res.json(error);
    }
    if (accounts) {
      new Account(accounts).save();
      return res.json({ accounts });
    }

    return res.status(500).json({ message: "unexpected error" });
  });

  res.json({ text: "todo" });
};
