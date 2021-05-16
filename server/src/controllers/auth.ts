import { RequestHandler } from "express";

import { Authorize } from "../models";
import { tinkBaseUrl } from "../static";
import { makeEncodedBody } from "../utils";
import { handleResponse } from "../utils/handleResponse";
import { encodedCT, v1 } from "./api";

type ResponseTokenSuccess = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  scope: string;
  id_hint: string;
};
type ResponseTokenFailure = {
  errorDetails?: string;
  errorMessage: string;
  errorCode: string;
};

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
    new Authorize({ clientId, token }).save();
    return res.status(200);
  }

  return res.status(500).json({ message: "unexpected error" });
};
