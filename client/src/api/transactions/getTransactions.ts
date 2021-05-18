import qs from "qs";

import { clientId, clientSecret } from "../../const/credentials";
import { handleRequest } from "../handleRequest";

type TransactionRequest = {
  accountId?: string;
  pageSize: number;
  pageToken?: string;
};

export const getTransactions = async (request: TransactionRequest) => {
  const [data, error] = await handleRequest<V2.Transactions.Response>(
    `/transactions${qs.stringify(
      { clientId, clientSecret, ...request },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
  );

  if (error) return null;
  return data;
};
