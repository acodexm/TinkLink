import cardOperation from "../../assets/credit-card.svg";
import transfer from "../../assets/currency-exchange.svg";
import defaultOperation from "../../assets/flying-money.svg";
import payment from "../../assets/money.svg";
import fee from "../../assets/tax.svg";
import withdraw from "../../assets/withdrawal.svg";

export const KNOWN_TYPES: Record<string, string> = {
  transfer,
  "card operation": cardOperation,
  fee,
  payment,
  withdraw,
  default: defaultOperation,
};
