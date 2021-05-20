import { Response } from "express";

import { Auth, AuthData } from "../../models";
import { genericError, noClientIdError } from "./api";
import { getClientId } from "./getClientId";
import { checkIfNotExpired } from "./tokenLifespan";

export const executeAuthorized = (
  res: Response,
  authHeader: string | undefined,
  execute: (token: AuthData) => void,
) => {
  const clientId = getClientId(authHeader);

  if (!clientId) {
    return res.status(401).json(noClientIdError);
  }

  return Auth.findOne({ clientId })
    .sort({ timestamp: -1 })
    .then(async authData => {
      if (authData)
        try {
          if (checkIfNotExpired(authData, clientId)) await execute(authData.token);
        } catch (error) {
          console.error("executeAuthorized", error);
          res.status(500).json(genericError);
        }
      else {
        res.status(401).json({
          errorCode: "database.no.result",
          errorMessage: "Unauthorized",
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
