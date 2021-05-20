import qs from "qs";

import { handleRequest } from "../handleRequest";
import { Pagination } from "./../types";

export const getAccounts = async (queryParams: Pagination) => {
  const [data, error] = await handleRequest<V2.Accounts.Response>(
    `/accounts${qs.stringify(queryParams, { skipNulls: true, addQueryPrefix: true })}`,
  );

  if (error) return null;
  return data;
};
