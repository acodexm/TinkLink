import { RequestHandler } from "express";

import { clientUnauthorized, noClientIdError } from "../api";
import { checkIfTokenExpired, executeAuthorized, getClientId } from "./helpers";
import { sendError } from "./helpers/sendError";

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

    return sendError(res, clientUnauthorized);
  });
};
