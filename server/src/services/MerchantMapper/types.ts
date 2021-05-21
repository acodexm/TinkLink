export type MerchantMap = Record<string, MerchantInformation>;
type AutocompleteItem = {
  name: string;
  domain: string;
  logo: string;
};

export type AutocompleteResponse = AutocompleteItem[];
export type AutocompleteFailure = {
  message: string;
};
