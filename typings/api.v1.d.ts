declare namespace V1 {
  interface Currency {
    currencyCode: CurrencyCode;
    scale: number;
    unscaledValue: Money;
  }
  namespace Search {
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

    type CurrencyDenominatedAmount = Currency;

    type CurrencyDenominatedOriginalAmount = Currency;

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

    interface Response {
      count: number;
      metrics: Metrics;
      net: Money;
      periodAmounts: PeriodAmount[];
      query: Query;
      results: TransactionData[];
    }
  }
  namespace Accounts {
    type CurrencyDenominatedBalance = Currency;

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

    interface Response {
      accounts: Account[];
    }
  }
  namespace Auth {
    interface Response {
      token_type: string;
      expires_in: number;
      access_token: string;
      refresh_token: string;
      scope: string;
      id_hint: string;
    }
  }
  namespace Ballance {
    type Available = Currency;

    type Booked = Currency;
    type CreditLimit = Currency;

    interface Balances {
      available: Available;
      booked: Booked;
      creditLimit: CreditLimit;
    }

    interface Response {
      accountId: string;
      balances: Balances;
      refreshed: number;
    }
  }
}
