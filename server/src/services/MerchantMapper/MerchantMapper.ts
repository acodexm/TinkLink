import { omit } from "lodash";
import fetch from "node-fetch";
import qs from "qs";

import { handleResponse } from "../../controllers/helpers";
import { AutocompleteFailure, AutocompleteResponse, MerchantMap } from "./types";

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

    customMerchantInfo.imgSrc = await getMerchantImg(merchant, this.merchantMap);

    return { transaction: { ...transaction, customMerchantInfo }, type };
  }
  private async mapTransactionV2(
    transaction: V2.Transactions.Transaction,
  ): Promise<V2.Transactions.Transaction> {
    const merchant = transaction.descriptions.original;
    const customMerchantInfo: MerchantInformation = { merchantName: merchant };

    customMerchantInfo.imgSrc = await getMerchantImg(merchant, this.merchantMap);

    return { ...transaction, customMerchantInfo };
  }
}
async function getMerchantImg(merchant: string, merchantMap: MerchantMap) {
  let imgSrc = merchantMap[merchant]?.imgSrc;

  if (imgSrc) return imgSrc;

  imgSrc = await searchImgSrc(merchant);
  const newMerchant: MerchantInformation = { merchantName: merchant, imgSrc };

  merchantMap[merchant] = newMerchant;

  //todo save on db

  return imgSrc;
}

const searchImgSrc = async (merchant: string) => {
  const response = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest${qs.stringify(
      { query: merchant },
      { addQueryPrefix: true },
    )}`,
  );
  const [data, error] = await handleResponse<AutocompleteResponse, AutocompleteFailure>(response);

  if (error || !data || data.length === 0) {
    return undefined;
  }

  return data[0]?.logo;
};

export default MerchantMapper;
