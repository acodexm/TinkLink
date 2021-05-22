import { fetchRefreshToken } from "../../api";
import { Auth, AuthModel } from "../../models";

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

const refreshToken = async (clientId: string, refreshToken: string) => {
  const token = fetchRefreshToken(clientId, refreshToken);

  if (token) {
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
