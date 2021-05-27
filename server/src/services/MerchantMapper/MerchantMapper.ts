import { omit } from "lodash";

import { fetchImageSrc } from "../../api/fetchImageSrc";
import { MerchantMap } from "./types";

class MerchantMapper {
  private static instance: MerchantMapper;
  private merchantMap: MerchantMap;
  constructor() {
    this.merchantMap = {}; //get from database
  }
  static getInstance() {
    if (!this.instance) this.instance = new MerchantMapper();
    return this.instance;
  }
  async mapTransactionsV1(searchData: V1.Search.Response) {
    const transactionData: V1.Search.Response = { ...omit(searchData, "results"), results: [] };

    for (const item of searchData.results) {
      const newItem = await this.mapTransactionV1(item);

      transactionData.results.push(newItem);
    }

    return transactionData;
  }
  async mapTransactionsV2(transactions: V2.Transactions.Response) {
    const transactionData: V2.Transactions.Response = {
      nextPageToken: transactions.nextPageToken,
      transactions: [],
    };

    for (const item of transactions.transactions) {
      const newItem = await this.mapTransactionV2(item);

      transactionData.transactions.push(newItem);
    }

    return transactionData;
  }
  private async mapTransactionV1({
    transaction,
    type,
  }: V1.Search.TransactionData): Promise<V1.Search.TransactionData> {
    const merchant = transaction.description;
    const customMerchantInfo: MerchantInformation = { merchantName: merchant };

    customMerchantInfo.imgSrc = await this.getMerchantImg(merchant, this.merchantMap);

    return { transaction: { ...transaction, customMerchantInfo }, type };
  }
  private async mapTransactionV2(
    transaction: V2.Transactions.Transaction,
  ): Promise<V2.Transactions.Transaction> {
    const merchant = transaction.descriptions.original;
    const customMerchantInfo: MerchantInformation = { merchantName: merchant };

    customMerchantInfo.imgSrc = await this.getMerchantImg(merchant, this.merchantMap);

    return { ...transaction, customMerchantInfo };
  }
  private async getMerchantImg(merchant: string, merchantMap: MerchantMap) {
    let imgSrc = merchantMap[merchant]?.imgSrc;

    if (imgSrc) return imgSrc;

    imgSrc = await fetchImageSrc(merchant);
    const newMerchant: MerchantInformation = { merchantName: merchant, imgSrc };

    merchantMap[merchant] = newMerchant;

    //todo save on db

    return imgSrc;
  }
}

export default MerchantMapper;
