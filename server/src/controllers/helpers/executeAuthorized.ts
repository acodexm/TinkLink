import { Response } from "express";

import { clientUnauthorized, genericError, noClientIdError } from "../../api";
import { Auth, AuthModel } from "../../models";
import { getClientId } from "./getClientId";
import { sendError } from "./sendError";
import { checkIfTokenExpired } from "./tokenLifespan";

export const executeAuthorized = (
  res: Response,
  authHeader: string | undefined,
  execute: (token: AuthModel) => void,
) => {
  const clientId = getClientId(authHeader);

  if (clientId) {
    Auth.findOne({ clientId })
      .sort({ timestamp: -1 })
      .then(async authData => {
        if (authData)
          try {
            const isTokenValid = await checkIfTokenExpired(authData, clientId);

            if (isTokenValid) {
              execute(authData);
            } else {
              sendError(res, clientUnauthorized);
            }
          } catch (error) {
            console.error("executeAuthorized", error);
            sendError(res, genericError);
          }
        else {
          sendError(res, {
            errorCode: 404,
            errorKey: "database.no.result",
            errorMessage: "Unauthorized",
          });
        }
      })
      .catch(error => {
        sendError(res, error);
      });
  } else {
    sendError(res, noClientIdError);
  }
};
