import qs from "qs";

import { handleError } from "./helpers/handleError";
import { handleRequest } from "./helpers/handleRequest";
import { handleResponse } from "./helpers/handleResponse";

type FavoriteMerchants = FavoriteMerchant[];

export const getAggregatedMerchants = async (category?: string) => {
  const response = await handleRequest(
    `/aggregate${qs.stringify(category, { addQueryPrefix: true, skipNulls: true })}`,
  );

  return await handleResponse<FavoriteMerchants>(response).then(handleError);
};
