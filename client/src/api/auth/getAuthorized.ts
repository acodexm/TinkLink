import { clientId, clientSecret } from "../../const/credentials";
import { handleRequest } from "../handleRequest";

export const getAuthorized = (code: string | null) => {
  return handleRequest("/authorize", {
    method: "POST",
    body: JSON.stringify({ clientId, clientSecret, code }),
    headers: { "Content-Type": "application/json" },
  });
};
