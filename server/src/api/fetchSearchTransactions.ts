import MerchantMapper from "../services/MerchantMapper";
import { dataNotFound } from "./consts";
import { fetchSearch } from "./fetchSearch";
import { ValidResponsePromise } from "./types";

export const fetchSearchTransactions = async (
  searchQuery: V1.Search.Query,
  token: V1.Auth.Response,
): ValidResponsePromise<V1.Search.Response> => {
  const [searchData, error] = await fetchSearch(searchQuery, token);

  if (error) return [undefined, error];
  if (!searchData) return [undefined, dataNotFound];

  const mapper = MerchantMapper.getInstance();

  return [await mapper.mapTransactionsV1(searchData), undefined];
};
