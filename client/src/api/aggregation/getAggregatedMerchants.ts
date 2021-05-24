import qs from "qs";

import { handleRequest } from "../handleRequest";

type FavoriteMerchants = FavoriteMerchant[];

export const getAggregatedMerchants = async (category?: string) => {
  const [data, error] = await handleRequest<FavoriteMerchants>(
    `/aggregate${qs.stringify(category, { addQueryPrefix: true, skipNulls: true })}`,
  );

  if (error || !data) {
    console.error("getAggregatedMerchants failed");
    return;
  }

  return data;
};
