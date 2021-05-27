import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../controllers/helpers";
import { AutocompleteResponse } from "../services/MerchantMapper/types";

export const fetchImageSrc = async (merchant: string) => {
  const response = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest${qs.stringify(
      { query: merchant },
      { addQueryPrefix: true },
    )}`,
  );
  const [data, error] = await handleResponse<AutocompleteResponse>(response);

  if (error || !data || data.length === 0) {
    return undefined;
  }

  return data[0]?.logo;
};
