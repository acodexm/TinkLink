import { CurrencyCode, Money } from "./types";

export type AccountData = {
  accountNumber: string;
  availableCredit: Money;
  balance: Money;
  bankId: string;
  certainDate: number;
  credentialsId: string;
  excluded: boolean;
  favored: boolean;
  id: string;
  name: string;
  ownership: number;
  payload: string;
  type: string;
  userId: string;
  userModifiedExcluded: false;
  userModifiedName: false;
  userModifiedType: false;
  identifiers: string;
  transferDestinations: string | null;
  details: string | null;
  images: {
    icon: string;
    banner: string | null;
  };
  holderName: string | null;
  closed: boolean;
  flags: string;
  accountExclusion: string;
  currencyCode: string;
  currencyDenominatedBalance: {
    unscaledValue: Money;
    scale: number;
    currencyCode: CurrencyCode;
  };
  refreshed: number;
  financialInstitutionId: string;
  firstSeen: number;
  iban: string | null;
};
