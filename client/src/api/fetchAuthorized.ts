import { handleRequest } from "./helpers/handleRequest";

export const getAuthorized = (code: string | null) => {
  return handleRequest("/authorize", {
    method: "POST",
    body: JSON.stringify({ code }),
    headers: { "Content-Type": "application/json" },
  });
};
