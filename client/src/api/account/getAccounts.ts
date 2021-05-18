import qs from "qs";

import { clientId, clientSecret } from "../../const/credentials";
import { handleRequest } from "../handleRequest";
import { Pagination } from "./../types";

export const getAccounts = async (request: Pagination) => {
  const [data, error] = await handleRequest<V2.Accounts.Response>(
    `/accounts${qs.stringify(
      { clientId, clientSecret, ...request },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
  );

  if (error) return null;
  return data;
};
