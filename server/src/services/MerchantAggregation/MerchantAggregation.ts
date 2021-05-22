import { get } from "lodash";

type QueryString = string;
type SimpleTransaction = {
  id: string;
  accountId: string;
  category: string;
  type: string;
  date: number;
  merchantInfo?: MerchantInformation;
};
type MerchantAggregatedData = {
  category: string;
  total: Currency;
  transactions: SimpleTransaction[];
};
type FavoriteMerchants = Record<QueryString, MerchantAggregatedData>;
class MerchantAggregation {
  private static instance: MerchantAggregation;
  merchantMap: FavoriteMerchants;
  constructor() {
    this.merchantMap = {}; //get from database
  }
  static getInstance() {
    if (!this.instance) this.instance = new MerchantAggregation();
    return this.instance;
  }

  private async createOrUpdateData(data: V1.Search.TransactionData, queryKey: QueryString) {
    const id = get(data, queryKey, null);

    if (!id) throw new Error("aggregateTransactionsV1 invalid queryKey");
    const currentData = this.merchantMap[id];

    if (currentData) {
      if (
        currentData.total.currencyCode === data.transaction.currencyDenominatedAmount.currencyCode
      ) {
        currentData.total.unscaledValue += data.transaction.currencyDenominatedAmount.unscaledValue;
      } else {
        throw new Error(`aggregateTransactionsV1 currencyCode does not match for id: ${id}`);
      }
      currentData.transactions.push({
        id: data.transaction.id,
        accountId: data.transaction.accountId,
        category: data.transaction.categoryType,
        type: data.transaction.type,
        date: data.transaction.date,
        merchantInfo: data.merchantInformation,
      });
    } else {
      const newData: MerchantAggregatedData = {
        category: id,
        transactions: [
          {
            id: data.transaction.id,
            accountId: data.transaction.accountId,
            category: data.transaction.categoryType,
            type: data.transaction.type,
            date: data.transaction.date,
            merchantInfo: data.merchantInformation,
          },
        ],
        total: data.transaction.currencyDenominatedAmount,
      };

      this.merchantMap[id] = newData;
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
