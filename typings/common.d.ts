type Money = number;
type CurrencyCode = "EUR" | "GBP" | "USD";

interface MerchantInformation {
  merchantCategoryCode?: string;
  merchantName: string;
  imgSrc?: string;
}

interface Currency {
  currencyCode: CurrencyCode;
  scale: number;
  unscaledValue: Money;
}