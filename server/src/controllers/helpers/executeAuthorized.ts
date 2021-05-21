import { Response } from "express";

import { Auth, AuthModel } from "../../models";
import { genericError, noClientIdError } from "./api";
import { getClientId } from "./getClientId";
import { checkIfNotExpired } from "./tokenLifespan";

export const executeAuthorized = (
  res: Response,
  authHeader: string | undefined,
  execute: (token: AuthModel) => void,
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
          if (checkIfNotExpired(authData, clientId)) return await execute(authData);
        } catch (error) {
          console.error("executeAuthorized", error);
          return res.status(500).json(genericError);
        }
      else {
        return res.status(401).json({
          errorCode: "database.no.result",
          errorMessage: "Unauthorized",
        });
      }
    })
    .catch(error => {
      console.info("FUCK YOU", error);
      return res.status(500).json(error);
    });
};
