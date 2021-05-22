import { Response } from "express";

import { clientUnauthorized, genericError, noClientIdError } from "../../api";
import { Auth, AuthModel } from "../../models";
import { getClientId } from "./getClientId";
import { checkIfTokenExpired } from "./tokenLifespan";

export const executeAuthorized = (
  res: Response,
  authHeader: string | undefined,
  execute: (token: AuthModel) => void,
) => {
  console.info("execute authorized");
  const clientId = getClientId(authHeader);

  if (!clientId) {
    return res.status(401).json(noClientIdError);
  }

  return Auth.findOne({ clientId })
    .sort({ timestamp: -1 })
    .then(async authData => {
      if (authData)
        try {
          const isTokenValid = await checkIfTokenExpired(authData, clientId);

          if (isTokenValid) {
            return await execute(authData);
          }

          return res.status(401).json(clientUnauthorized);
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
      return res.status(500).json(error);
    });
};
