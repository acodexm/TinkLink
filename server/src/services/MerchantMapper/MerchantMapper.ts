import { omit } from "lodash";
import fetch from "node-fetch";

import { handleResponse } from "../../controllers/helpers";
import { AutocompleteFailure, AutocompleteResponse, MerchantMap } from "./types";

class MerchantMapper {
  private static instance: MerchantMapper;
  merchantMap: MerchantMap;
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
  private async mapTransactionV1({ transaction, type }: V1.Search.TransactionData) {
    const merchant = transaction.description;
    const merchantInfo: MerchantInformation = { merchantName: merchant };

    merchantInfo.imgSrc = await getMerchantImg(merchant, this.merchantMap);

    return { transaction: { ...transaction }, type, merchantInfo };
  }
  async mapTransactionV2(transaction: V2.Transactions.Transaction) {
    const merchant = transaction.descriptions.original;
    const merchantInfo: MerchantInformation = { merchantName: merchant };

    merchantInfo.imgSrc = await getMerchantImg(merchant, this.merchantMap);

    return { ...transaction, merchantInfo };
  }
}
async function getMerchantImg(merchant: string, merchantMap: MerchantMap) {
  let imgSrc = defaultMapper(merchant);

  if (imgSrc) return imgSrc;

  imgSrc = merchantMap[merchant]?.imgSrc;
  if (imgSrc) return imgSrc;

  imgSrc = await searchImgSrc(merchant);
  const newMerchant: MerchantInformation = { merchantName: merchant, imgSrc };

  merchantMap[merchant] = newMerchant;

  //todo save on db

  return imgSrc;
}

const searchImgSrc = async (merchant: string) => {
  const response = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${merchant}`,
  );
  const [data, error] = await handleResponse<AutocompleteResponse, AutocompleteFailure>(response);

  if (error || !data || data.length === 0) {
    return undefined;
  }

  return data[0]?.logo;
};

const defaultMapper = (name: string) => {
  switch (name.toLowerCase()) {
    case "withdraw": {
      return "https://";
    }
    case "payment": {
      return "https://";
    }
    case "income": {
      return "https://";
    }
    case "transfer": {
      return "https://";
    }
    case "salary": {
      return "https://";
    }
    case "card operation": {
      return "https://";
    }
    case "fee": {
      return "https://";
    }
    default: {
      return undefined;
    }
  }
};

export default MerchantMapper;
