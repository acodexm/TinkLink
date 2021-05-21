declare namespace V2 {
  namespace Transactions {
    interface Value {
      scale: string;
      unscaledValue: Money;
    }

    interface Amount {
      currencyCode: string;
      value: Value;
    }

    interface Pfm {
      id: string;
      name: string;
    }

    interface Categories {
      pfm: Pfm;
    }

    interface Dates {
      booked: string;
      value: string;
    }

    interface Descriptions {
      display: string;
      original: string;
    }

    interface Identifiers {
      providerTransactionId: string;
    }

    interface Types {
      financialInstitutionTypeCode: string;
      type: string;
    }

    interface Transaction {
      accountId: string;
      amount: Amount;
      categories: Categories;
      dates: Dates;
      descriptions: Descriptions;
      id: string;
      identifiers: Identifiers;
      merchantInformation: MerchantInformation;
      providerMutability: string;
      reference: string;
      status: string;
      types: Types;
    }

    interface Response {
      nextPageToken: string;
      transactions: Transaction[];
    }
  }

  namespace Accounts {
    interface Value {
      scale: string;
      unscaledValue: string;
    }

    interface Amount {
      currencyCode: string;
      value: Value;
    }

    interface Booked {
      amount: Amount;
    }

    interface Balances {
      booked: Booked;
    }

    interface Dates {
      lastRefreshed: Date;
    }

    interface Iban {
      iban: string;
    }

    interface Identifiers {
      iban: Iban;
    }

    interface Account {
      balances: Balances;
      customerSegment: string;
      dates: Dates;
      financialInstitutionId: string;
      id: string;
      identifiers: Identifiers;
      name: string;
      type: string;
    }

    interface Response {
      accounts: Account[];
      nextPageToken: string;
    }
  }
}
