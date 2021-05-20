import qs from "qs";

import { handleRequest } from "../handleRequest";
import { PaginationQuery } from "./../types";

export const getAccounts = async (queryParams: PaginationQuery) => {
  const [data, error] = await handleRequest<V2.Accounts.Response>(
    `/accounts${qs.stringify(queryParams, { skipNulls: true, addQueryPrefix: true })}`,
  );

  if (error) return null;
  return data;
};
