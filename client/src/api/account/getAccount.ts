import qs from "qs";

import { handleRequest } from "../handleRequest";

type AccountResponseSuccess = {
  account: V1.Ballance.Response;
  transactions: V1.Search.TransactionData[];
};

export const getAccount = async (accountId: string) => {
  const [data, error] = await handleRequest<AccountResponseSuccess>(
    `/account/${qs.stringify({ accountId }, { skipNulls: true, addQueryPrefix: true })}`,
  );

  if (error) return null;
  return data;
};
