import { clientId, clientSecret } from "../../const/credentials";
import { AccountData } from "../../model";
import { handleRequest } from "../handleRequest";

export const getAccountList = async () => {
  const [data, error] = await handleRequest<AccountData>(
    `/account/list?clientId=${clientId}&clientSecret=${clientSecret}`,
  );

  if (error) return null;
  return data;
};
