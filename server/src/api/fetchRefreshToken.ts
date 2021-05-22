import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import { clientSecret, tinkBaseUrl } from "../static";
import { encodedCT, v1 } from ".";
import { ResponseTokenFailure, ResponseTokenSuccess } from "./types";

export const fetchRefreshToken = async (clientId: string, refreshToken: string) => {
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

  if (error || !token) {
    console.error("refreshToken", error);
    return;
  }

  return token;
};
