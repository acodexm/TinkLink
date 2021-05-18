import { handleRequest } from "../handleRequest";

const clientId = process.env.REACT_APP_TINK_CLIENT_ID;
const clientSecret = process.env.REACT_APP_TINK_CLIENT_SECRET;

export const getAuthorized = (code: string | null) => {
  return handleRequest("/authorize", {
    method: "POST",
    body: JSON.stringify({ clientId, clientSecret, code }),
    headers: { "Content-Type": "application/json" },
  });
};
