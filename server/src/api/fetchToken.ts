import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import { clientSecret, tinkBaseUrl } from "../static";
import { encodedCT, v1 } from "./consts";

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

  return await handleResponse<V1.Auth.Response>(response);
};
