import qs from "qs";

import { handleError } from "./helpers/handleError";
import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";

type AccountResponseSuccess = {
  account: V1.Ballance.Response;
  transactions: V2.Transactions.Response;
};

export const getAccount = async (accountId: string, pageSize: number, pageToken?: string) => {
  const response = await handleRequest(
    `/account${qs.stringify(
      { accountId, pageSize, pageToken },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
  );

  return await handleResponse<AccountResponseSuccess>(response).then(handleError);
};
