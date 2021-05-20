import qs from "qs";

import { handleRequest } from "../handleRequest";

type TransactionRequest = {
  accountId?: string;
  pageSize: number;
  pageToken?: string;
};

export const getTransactions = async (queryParams: TransactionRequest) => {
  const [data, error] = await handleRequest<V2.Transactions.Response>(
    `/transactions${qs.stringify(queryParams, { skipNulls: true, addQueryPrefix: true })}`,
  );

  if (error) return null;
  return data;
};
