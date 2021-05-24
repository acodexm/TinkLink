import { get } from "lodash";

import { scaleValueV1 } from "../../utils/scaleValue";
import { FavoriteMerchants, QueryString } from "./types";

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

    if (category === "not_found") throw new Error("aggregateTransactionsV1 invalid queryKey");
    const currentData = this.merchantMap[category];

    if (currentData) {
      if (
        currentData.total.currencyCode === data.transaction.currencyDenominatedAmount.currencyCode
      ) {
        currentData.total.scaledValue += scaleValueV1(data.transaction.currencyDenominatedAmount);
      } else {
        throw new Error(
          `aggregateTransactionsV1 currencyCode does not match for category: ${category}`,
        );
      }
    } else {
      const newData: FavoriteMerchant = {
        category,
        total: {
          currencyCode: data.transaction.currencyDenominatedAmount.currencyCode,
          scaledValue: scaleValueV1(data.transaction.currencyDenominatedAmount),
        },
        customMerchantInfo: data.transaction.customMerchantInfo,
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

export default MerchantAggregation;
