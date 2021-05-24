import qs from "qs";

import { handleRequest } from "../handleRequest";

type AccountResponseSuccess = {
  account: V1.Ballance.Response;
  transactions: V2.Transactions.Response;
};

export const getAccount = async (accountId: string, pageSize: number, pageToken?: string) => {
  const [data, error] = await handleRequest<AccountResponseSuccess>(
    `/account${qs.stringify(
      { accountId, pageSize, pageToken },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
  );

  if (error) return null;
  return data;
};
