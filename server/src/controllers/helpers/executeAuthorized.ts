import { Response } from "express";

import { Auth, AuthData } from "../../models";
import { checkIfNotExpired } from "./tokenLifespan";
import { Credentials } from "./types";

export const executeAuthorized = <T = unknown>(
  res: Response,
  credentials: Credentials,
  execute: (token: AuthData) => Promise<T>,
) => {
  Auth.find({ clientId: credentials.clientId }, async (err, authData) => {
    if (err) return res.status(500).json(err);
    if (!authData || authData.length === 0) {
      return res.status(401).json({
        key: "no.result",
        message: "Unauthorized",
      });
    }
    try {
      if (checkIfNotExpired(authData[0], credentials)) return await execute(authData[0].token);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "unexpected error" });
    }
  });
};
