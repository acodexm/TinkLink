import { fetchRefreshToken, fetchSearch } from "../../api";
import { Auth, AuthModel } from "../../models";

export const checkIfTokenExpired = async ({ token, timestamp }: AuthModel, clientId: string) => {
  const { expires_in, refresh_token } = token;

  timestamp.setSeconds(timestamp.getSeconds() + expires_in);

  if (new Date() > timestamp) {
    return await refreshToken(clientId, refresh_token);
  }
  const [, error] = await fetchSearch({ transactionId: "ping" }, token);

  //ping server to check if current token is indeed valid
  console.info("ping server status:", error?.errorCode);
  return error?.errorCode !== 401;
};

const refreshToken = async (clientId: string, refreshToken: string) => {
  const [token, error] = await fetchRefreshToken(clientId, refreshToken);

  if (token && !error) {
    try {
      const auth = new Auth({ clientId, token, timestamp: new Date() });

      await auth.save();
      return true;
    } catch (dbError) {
      console.error("[refreshToken] Unable to update database", dbError);
    }
  }

  return false;
};
