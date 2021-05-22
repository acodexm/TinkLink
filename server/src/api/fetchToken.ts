import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import { clientSecret, tinkBaseUrl } from "../static";
import { encodedCT, v1 } from "./consts";
import { ResponseTokenFailure, ResponseTokenSuccess } from "./types";

export const fetchToken = async (clientId: string, code: string) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/oauth/token`, {
    method: "POST",
    body: qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    }),
    headers: {
      "Content-Type": encodedCT,
    },
  });
  const [token, error] = await handleResponse<ResponseTokenSuccess, ResponseTokenFailure>(response);

  if (error || !token) {
    console.error("authorize", error);
    return;
  }

  return token;
};
