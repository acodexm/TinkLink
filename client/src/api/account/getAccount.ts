import { clientId, clientSecret } from "../../const/credentials";
import { AccountBalanceData } from "../../model";
import { handleRequest } from "../handleRequest";

export const getAccountList = async (accountId: string) => {
  const [data, error] = await handleRequest<AccountBalanceData>(
    `/account/list?clientId=${clientId}&clientSecret=${clientSecret}&accountId=${accountId}`,
  );

  if (error) return null;
  return data;
};
