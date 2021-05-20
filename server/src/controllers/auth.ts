import { RequestHandler } from "express";
import fetch from "node-fetch";
import qs from "qs";

import { Auth } from "../models";
import { clientSecret, tinkBaseUrl } from "../static";
import {
  encodedCT,
  getClientId,
  handleResponse,
  ResponseTokenFailure,
  ResponseTokenSuccess,
  v1,
} from "./helpers";
import { genericError, noClientIdError } from "./helpers/api";
import { executeAuthorized } from "./helpers/executeAuthorized";
import { checkIfNotExpired } from "./helpers/tokenLifespan";

export const authorize: RequestHandler = async (req, res) => {
  const { code } = req.body;
  const clientId = getClientId(req.headers.authorization);

  if (!clientId) {
    return res.status(401).json(noClientIdError);
  }
  const response = await fetch(`${tinkBaseUrl}${v1}/oauth/token`, {
    method: "POST",
    body: qs.stringify({
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
    console.error("authorize", error);
    return res.status(403).json(error);
  }
  if (token) {
    console.info("authorize", "saving token");
    const timestamp = new Date();
    const auth = new Auth({ clientId, token, timestamp });

    await auth.save();
    console.info("authorize", "new token saved", timestamp.toLocaleDateString());
    return res.status(200);
  }

  return res.status(500).json(genericError);
};

export const autoAuth: RequestHandler = (req, res) => {
  const clientId = getClientId(req.headers.authorization);

  if (!clientId) {
    return res.status(401).json(noClientIdError);
  }
  executeAuthorized(res, req.headers.authorization, async token => {
    const ok = await checkIfNotExpired(token, clientId);

    if (ok) {
      res.status(200).json({ hasAccess: true });
    }
    res.status(403).json({ hasAccess: false });
  });
};
