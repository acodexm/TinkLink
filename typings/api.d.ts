declare namespace TinkLinkApi {
  type CATEGORIES = Record<string, number>;

  interface Metrics {
    AVG: Money;
    CATEGORIES: CATEGORIES;
    COUNT: number;
    NET: Money;
    SUM: Money;
  }

  interface PeriodAmount {
    key: string;
    value: Money;
  }

  interface Query {
    accounts?: string[];
    categories?: string[];
    endDate?: number;
    externalIds?: string[];
    includeUpcoming?: boolean;
    limit?: number;
    maxAmount?: Money;
    minAmount?: Money;
    offset?: number;
    order?: "DESC" | "ASC";
    queryString?: string;
    sort?: "DATE" | "SCORE" | "DATE" | "ACCOUNT" | "DESCRIPTION" | "AMOUNT" | "CATEGORY";
    startDate?: number;
  }

  interface CurrencyDenominatedAmount {
    currencyCode: CurrencyCode;
    scale: number;
    unscaledValue: Money;
  }

  interface CurrencyDenominatedOriginalAmount {
    currencyCode: CurrencyCode;
    scale: number;
    unscaledValue: Money;
  }

  interface Identifiers {
    providerExternalId: string;
  }

  interface PartnerPayload {}

  interface Part {
    amount: Money;
    categoryId: string;
    counterpartDescription: string;
    counterpartId: string;
    counterpartTransactionAmount: Money;
    counterpartTransactionId: string;
    date: number;
    id: string;
    lastModified: number;
  }

  interface Payload {}

  interface Transaction {
    accountId: string;
    amount: Money;
    categoryId: string;
    categoryType: string;
    currencyDenominatedAmount: CurrencyDenominatedAmount;
    currencyDenominatedOriginalAmount: CurrencyDenominatedOriginalAmount;
    date: number;
    description: string;
    dispensableAmount: Money;
    id: string;
    identifiers: Identifiers;
    lastModified: number;
    notes: string;
    originalAmount: Money;
    originalDate: number;
    originalDescription: string;
    partnerPayload: PartnerPayload;
    parts: Part[];
    payload: Payload;
    pending: boolean;
    timestamp: number;
    type: string;
    upcoming: boolean;
    userId: string;
    userModified: boolean;
  }

  interface TransactionData {
    transaction: Transaction;
    type: string;
  }

  interface Search {
    count: number;
    metrics: Metrics;
    net: Money;
    periodAmounts: PeriodAmount[];
    query: Query;
    results: Result[];
  }

  interface CurrencyDenominatedBalance {
    currencyCode: CurrencyCode;
    scale: number;
    unscaledValue: Money;
  }

  interface Details {
    interest: number;
    nextDayOfTermsChange: string;
    numMonthsBound: number;
    type: string;
  }

  interface TransferDestination {
    balance: number;
    displayAccountNumber: string;
    displayBankName?: unknown;
    matchesMultiple: boolean;
    name: string;
    type: string;
    uri: string;
  }

  interface Account {
    accountExclusion: string;
    accountNumber: string;
    balance: Money;
    closed: boolean;
    credentialsId: string;
    currencyDenominatedBalance: CurrencyDenominatedBalance;
    details: Details;
    excluded: boolean;
    favored: boolean;
    financialInstitutionId: string;
    firstSeen: number;
    flags: string;
    holderName: string;
    id: string;
    identifiers: string;
    name: string;
    ownership: number;
    refreshed: number;
    transferDestinations: TransferDestination[];
    type: string;
  }

  interface Accounts {
    accounts: Account[];
  }
  interface Auth {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    scope: string;
    id_hint: string;
  }
}
