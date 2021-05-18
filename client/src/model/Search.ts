import { CurrencyCode, Money } from "./types";

export type TransactionData = {
  accountId: string;
  amount: Money;
  categoryId: string;
  categoryType: string;
  credentialsId: string | null;
  date: number;
  description: string;
  formattedDescription: string;
  id: string;
  inserted: number;
  internalPayload: unknown;
  lastModified: number;
  merchantId: string | null;
  notes: string;
  originalAmount: Money;
  originalDate: number;
  originalDescription: string;
  payload: {
    DETAILS: string;
  };
  pending: boolean;
  timestamp: number;
  type: string;
  userId: string;
  upcoming: boolean;
  userModifiedAmount: boolean;
  userModifiedCategory: boolean;
  userModifiedDate: boolean;
  userModifiedDescription: boolean;
  userModifiedLocation: boolean;
  currencyDenominatedAmount: {
    unscaledValue: Money;
    scale: number;
    currencyCode: CurrencyCode;
  };
  currencyDenominatedOriginalAmount: {
    unscaledValue: Money;
    scale: number;
    currencyCode: CurrencyCode;
  };
  parts: unknown;
  dispensableAmount: Money;
  partnerPayload: unknown;
  userModified: boolean;
};
type PeriodAmount = {
  key: string;
  value: Money;
};
type Category = string; //"expenses:food.restaurants"

export type SearchQuery = {
  accounts?: string[];
  categories?: Category[];
  externalIds?: string[];
  minAmount?: Money;
  maxAmount?: Money;
  endDate?: number;
  limit?: number;
  offset?: number;
  order?: "DESC" | "ASC";
  queryString?: string;
  sort?:
    | "DATE"
    | "SCORE"
    | "DATE"
    | "ACCOUNT"
    | "DESCRIPTION"
    | "AMOUNT"
    | "CATEGORY";
  startDate?: string;
  transactionId?: string;
  includeUpcoming?: boolean;
  lastTransactionId?: string;
};

export type SearchData = {
  count: number;
  metrics: {
    COUNT: number;
    NET: Money;
    SUM: Money;
    AVG: Money;
    CATEGORIES: Record<string, number>;
  };
  periodAmounts: PeriodAmount[];
  query: SearchQuery;
  results: TransactionData[];
  net: Money;
};
