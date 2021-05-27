import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";

type AutoAuthResponse = { hasAccess: boolean };

export const getAutoAuth = async () => {
  const response = await handleRequest("/autoAuth", {
    headers: { "Content-Type": "application/json" },
  });

  return await handleResponse<AutoAuthResponse>(response);
};
