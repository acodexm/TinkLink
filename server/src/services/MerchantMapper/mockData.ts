export const mockDataV1 = {
  results: [
    {
      transaction: {
        id: "testId",
        accountId: "testAccountId",
        date: 12345,
        currencyDenominatedAmount: { currencyCode: "EUR", scale: 2, unscaledValue: -12345 },
        type: "testType",
        description: "testDescription",
        customMerchantInfo: {
          merchantName: "testMerchant",
        },
      },
    },
    {
      transaction: {
        id: "testId",
        accountId: "testAccountId",
        date: 12345,
        currencyDenominatedAmount: { currencyCode: "EUR", scale: 1, unscaledValue: -678 },
        type: "testType2",
        description: "testDescription",
        customMerchantInfo: {
          merchantName: "testMerchant",
        },
      },
    },
    {
      transaction: {
        id: "testId",
        accountId: "testAccountId",
        date: 12345,
        currencyDenominatedAmount: { currencyCode: "EUR", scale: 1, unscaledValue: -678 },
        type: "testType2",
        description: "testDescription",
        customMerchantInfo: {
          merchantName: "testMerchant",
        },
      },
    },
  ],
} as V1.Search.Response;
export const mockDataV2 = {
  transactions: [
    {
      id: "testId",
      accountId: "testAccountId",
      dates: { booked: "2021-05-22" },
      amount: { currencyCode: "EUR", value: { scale: "2", unscaledValue: "-12345" } },
      types: { type: "testType" },
      descriptions: { original: "testDescription" },
      merchantInformation: {
        merchantName: "testMerchant",
      },
    },
    {
      id: "testId",
      accountId: "testAccountId",
      dates: { booked: "2021-05-22" },
      amount: { currencyCode: "EUR", value: { scale: "1", unscaledValue: "-678" } },
      types: { type: "testType2" },
      descriptions: { original: "testDescription" },
      merchantInformation: {
        merchantName: "testMerchant",
      },
    },
    {
      id: "testId",
      accountId: "testAccountId",
      dates: { booked: "2021-05-22" },
      amount: { currencyCode: "EUR", value: { scale: "1", unscaledValue: "-678" } },
      types: { type: "testType2" },
      descriptions: { original: "testDescription" },
      merchantInformation: {
        merchantName: "testMerchant",
      },
    },
  ],
} as V2.Transactions.Response;
export const expectedResultV1 = {
  results: [
    {
      transaction: {
        customMerchantInfo: {
          imgSrc: "http://test",
          merchantName: "testDescription",
        },
        accountId: "testAccountId",
        currencyDenominatedAmount: {
          currencyCode: "EUR",
          scale: 2,
          unscaledValue: -12345,
        },
        date: 12345,
        description: "testDescription",
        id: "testId",
        type: "testType",
      },
      type: undefined,
    },
    {
      transaction: {
        customMerchantInfo: {
          imgSrc: "http://test",
          merchantName: "testDescription",
        },
        accountId: "testAccountId",
        currencyDenominatedAmount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        date: 12345,
        description: "testDescription",
        id: "testId",
        type: "testType2",
      },
      type: undefined,
    },
    {
      transaction: {
        customMerchantInfo: {
          imgSrc: "http://test",
          merchantName: "testDescription",
        },
        accountId: "testAccountId",
        currencyDenominatedAmount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        date: 12345,
        description: "testDescription",
        id: "testId",
        type: "testType2",
      },
      type: undefined,
    },
  ],
} as unknown as V1.Search.Response;
export const expectedResultV2 = {
  nextPageToken: undefined,
  transactions: [
    {
      accountId: "testAccountId",
      amount: {
        currencyCode: "EUR",
        value: {
          scale: "2",
          unscaledValue: "-12345",
        },
      },
      dates: {
        booked: "2021-05-22",
      },
      descriptions: {
        original: "testDescription",
      },
      id: "testId",
      customMerchantInfo: {
        imgSrc: "http://test",
        merchantName: "testDescription",
      },
      merchantInformation: {
        merchantName: "testMerchant",
      },
      types: {
        type: "testType",
      },
    },
    {
      accountId: "testAccountId",
      amount: {
        currencyCode: "EUR",
        value: {
          scale: "1",
          unscaledValue: "-678",
        },
      },
      dates: {
        booked: "2021-05-22",
      },
      descriptions: {
        original: "testDescription",
      },
      id: "testId",
      customMerchantInfo: {
        imgSrc: "http://test",
        merchantName: "testDescription",
      },
      merchantInformation: {
        merchantName: "testMerchant",
      },
      types: {
        type: "testType2",
      },
    },
    {
      accountId: "testAccountId",
      amount: {
        currencyCode: "EUR",
        value: {
          scale: "1",
          unscaledValue: "-678",
        },
      },
      dates: {
        booked: "2021-05-22",
      },
      descriptions: {
        original: "testDescription",
      },
      id: "testId",
      customMerchantInfo: {
        imgSrc: "http://test",
        merchantName: "testDescription",
      },
      merchantInformation: {
        merchantName: "testMerchant",
      },
      types: {
        type: "testType2",
      },
    },
  ],
};
