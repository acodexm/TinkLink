import { RequestHandler } from "express";

import { clientUnauthorized, fetchToken, noClientIdError } from "../api";
import { Auth } from "../models";
import { getClientId } from "./helpers";
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
