import fetch from "node-fetch";
import qs from "qs";

import { Auth, AuthModel } from "../../models";
import { clientSecret, tinkBaseUrl } from "../../static";
import { encodedCT, v1 } from "./api";
import { handleResponse } from "./handleResponse";
import { ResponseTokenFailure, ResponseTokenSuccess } from "./types";

export const checkIfNotExpired = (
  { token: { expires_in, refresh_token }, timestamp }: AuthModel,
  clientId: string,
) => {
  timestamp.setSeconds(timestamp.getSeconds() + expires_in);

  if (new Date() > timestamp) {
    return refreshToken(clientId, refresh_token);
  }

  return true;
};

export const refreshToken = async (clientId: string, refreshToken: string) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/oauth/token`, {
    method: "POST",
    body: qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    headers: {
      "Content-Type": encodedCT,
    },
  });
  const [token, error] = await handleResponse<ResponseTokenSuccess, ResponseTokenFailure>(response);

  if (error) {
    console.error("refreshToken", error);
    return false;
  }
  if (token) {
    new Auth({ clientId, token, timestamp: new Date() }).save();
    return true;
  }

  return false;
};
