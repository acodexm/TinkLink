import { get } from "lodash";

import { FavoriteMerchants, MerchantAggregatedData, QueryString } from "./types";

class MerchantAggregation {
  private static instance: MerchantAggregation;
  private merchantMap: FavoriteMerchants;
  constructor() {
    this.merchantMap = {}; //get from database
  }
  static getInstance() {
    if (!this.instance) this.instance = new MerchantAggregation();
    return this.instance;
  }

  private async createOrUpdateData(data: V1.Search.TransactionData, queryKey: QueryString) {
    const category = get(data, queryKey, "not_found").toLowerCase();

    if (!category) throw new Error("aggregateTransactionsV1 invalid queryKey");
    const currentData = this.merchantMap[category];

    if (currentData) {
      if (
        currentData.total.currencyCode === data.transaction.currencyDenominatedAmount.currencyCode
      ) {
        currentData.total.scaledValue += scaleValue(data.transaction.currencyDenominatedAmount);
      } else {
        throw new Error(
          `aggregateTransactionsV1 currencyCode does not match for category: ${category}`,
        );
      }
      currentData.transactions.push({
        id: data.transaction.id,
        amount: data.transaction.currencyDenominatedAmount,
        accountId: data.transaction.accountId,
        category: data.transaction.categoryType,
        type: data.transaction.type,
        date: data.transaction.date,
        merchantInfo: data.merchantInformation,
      });
    } else {
      const newData: MerchantAggregatedData = {
        category,
        total: {
          currencyCode: data.transaction.currencyDenominatedAmount.currencyCode,
          scaledValue: scaleValue(data.transaction.currencyDenominatedAmount),
        },
        transactions: [
          {
            id: data.transaction.id,
            amount: data.transaction.currencyDenominatedAmount,
            accountId: data.transaction.accountId,
            category: data.transaction.categoryType,
            type: data.transaction.type,
            date: data.transaction.date,
            merchantInfo: data.merchantInformation,
          },
        ],
      };

      this.merchantMap[category] = newData;
    }
  }
  async aggregateTransactionsV1(data: V1.Search.Response) {
    for (const transaction of data.results) {
      await this.createOrUpdateData(transaction, "transaction.type");
      await this.createOrUpdateData(transaction, "transaction.description");
    }
  }
  isEmptyData() {
    return Object.keys(this.merchantMap).length === 0;
  }
  getFavoriteMerchants() {
    return this.merchantMap;
  }
}
const scaleValue = (value: Currency) => {
  const num = value.unscaledValue.toString();
  const start = num.slice(0, -value.scale);
  const end = num.slice(-value.scale);

  return parseFloat(`${start}.${end}`);
};

export default MerchantAggregation;
