import qs from "qs";

import { handleError } from "./helpers/handleError";
import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";

type TransactionRequest = {
  accountId?: string;
  pageSize: number;
  pageToken?: string;
};

export const getTransactions = async (queryParams: TransactionRequest) => {
  const response = await handleRequest(
    `/transactions${qs.stringify(queryParams, { skipNulls: true, addQueryPrefix: true })}`,
  );

  return await handleResponse<V2.Transactions.Response>(response).then(handleError);
};
