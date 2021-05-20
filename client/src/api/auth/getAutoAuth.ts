import { handleRequest } from "../handleRequest";

type AutoAuthResponse = { hasAccess: boolean };

export const getAutoAuth = async (): Promise<boolean | undefined> => {
  const [data] = await handleRequest<AutoAuthResponse, AutoAuthResponse>("/autoAuth", {
    headers: { "Content-Type": "application/json" },
  });

  return data?.hasAccess;
};
