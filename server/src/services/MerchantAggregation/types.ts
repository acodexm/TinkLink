export type QueryString = string;
export type SimpleTransaction = {
  id: string;
  accountId: string;
  category: string;
  type: string;
  date: number;
  amount: Currency;
  merchantInfo?: MerchantInformation;
};
export type MerchantAggregatedData = {
  category: string;
  total: {
    currencyCode: CurrencyCode;
    scaledValue: number;
  };
  transactions: SimpleTransaction[];
};
export type FavoriteMerchants = Record<QueryString, MerchantAggregatedData>;
