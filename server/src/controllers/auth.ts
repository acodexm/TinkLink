import { RequestHandler } from "express";

import { Auth } from "../models";
import { tinkBaseUrl } from "../static";
import { makeEncodedBody } from "../utils";
import { handleResponse } from "../utils/handleResponse";
import { encodedCT, v1 } from "./helpers/api";
import { ResponseTokenFailure, ResponseTokenSuccess } from "./helpers/types";

export const authorize: RequestHandler = async (req, res) => {
  const { clientId, clientSecret, code } = req.body;
  const response = await fetch(`${tinkBaseUrl}${v1}/oauth/token`, {
    method: "POST",
    body: makeEncodedBody({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": encodedCT,
    },
  });
  const [token, error] = await handleResponse<ResponseTokenSuccess, ResponseTokenFailure>(response);

  if (error) {
    return res.json(error);
  }
  if (token) {
    new Auth({ clientId, token, timestamp: new Date() }).save();
    return res.status(200);
  }

  return res.status(500).json({ message: "unexpected error" });
};
