import qs from "qs";

import { handleError } from "./helpers/handleError";
import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";
import { PaginationQuery } from "./helpers/types";

export const getAccounts = async (queryParams: PaginationQuery) => {
  const response = await handleRequest(
    `/accounts${qs.stringify(queryParams, { skipNulls: true, addQueryPrefix: true })}`,
  );

  return await handleResponse<V2.Accounts.Response>(response).then(handleError);
};
