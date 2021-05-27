import { RequestHandler } from "express";

import { clientUnauthorized, fetchToken, noClientIdError } from "../api";
import { Auth } from "../models";
import { checkIfTokenExpired, executeAuthorized, getClientId } from "./helpers";
import { sendError } from "./helpers/sendError";

export const authorize: RequestHandler = async (req, res) => {
  const { code } = req.body;
  const clientId = getClientId(req.headers.authorization);

  if (!clientId) {
    return sendError(res, noClientIdError);
  }
  const [token, error] = await fetchToken(clientId, code);

  if (error) {
    return sendError(res, error);
  }

  if (token) {
    console.info("authorize", "saving token");
    const timestamp = new Date();
    const auth = new Auth({ clientId, token, timestamp });

    await auth.save();
    console.info("authorize", "new token saved", timestamp.toLocaleDateString());
    return res.sendStatus(200);
  }

  return sendError(res, clientUnauthorized);
};

export const autoAuth: RequestHandler = async (req, res) => {
  const clientId = getClientId(req.headers.authorization);

  if (!clientId) {
    return sendError(res, noClientIdError);
  }
  executeAuthorized(res, req.headers.authorization, async token => {
    const ok = await checkIfTokenExpired(token, clientId);

    if (ok) {
      return res.status(200).json({ hasAccess: true });
    }

    return res.status(403).json({ hasAccess: false });
  });
};
