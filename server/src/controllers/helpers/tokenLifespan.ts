import { Auth, AuthModel } from "../../models";
import { tinkBaseUrl } from "../../static";
import { makeEncodedBody } from "../../utils";
import { handleResponse } from "../../utils/handleResponse";
import { encodedCT, v1 } from "./api";
import { Credentials, ResponseTokenFailure, ResponseTokenSuccess } from "./types";

export const checkIfNotExpired = (
  { token: { expires_in, refresh_token }, timestamp }: AuthModel,
  credentials: Credentials,
) => {
  timestamp.setSeconds(timestamp.getSeconds() + expires_in);

  if (new Date() > timestamp) {
    return refreshToken(credentials, refresh_token);
  }

  return true;
};

export const refreshToken = async (
  { clientId, clientSecret }: Credentials,
  refreshToken: string,
) => {
  const response = await fetch(`${tinkBaseUrl}${v1}/oauth/token`, {
    method: "POST",
    body: makeEncodedBody({
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
    console.error(error);
    return false;
  }
  if (token) {
    new Auth({ clientId, token, timestamp: new Date() }).save();
    return true;
  }

  return false;
};
