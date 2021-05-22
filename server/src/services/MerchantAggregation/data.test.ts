export const mockData = {
  results: [
    {
      transaction: {
        id: "testId",
        accountId: "testAccountId",
        date: 12345,
        currencyDenominatedAmount: { currencyCode: "EUR", scale: 2, unscaledValue: -12345 },
        type: "testType",
        description: "testDescription",
      },
      merchantInformation: {
        merchantName: "testMerchant",
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
      },
      merchantInformation: {
        merchantName: "testMerchant",
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
      },
      merchantInformation: {
        merchantName: "testMerchant",
      },
    },
  ],
} as V1.Search.Response;
export const expectedResult = {
  testdescription: {
    category: "testdescription",
    total: {
      currencyCode: "EUR",
      scaledValue: -259.05,
    },
    transactions: [
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 2,
          unscaledValue: -12345,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType",
      },
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType2",
      },
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType2",
      },
    ],
  },
  testtype: {
    category: "testtype",
    total: {
      currencyCode: "EUR",
      scaledValue: -123.45,
    },
    transactions: [
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 2,
          unscaledValue: -12345,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType",
      },
    ],
  },
  testtype2: {
    category: "testtype2",
    total: {
      currencyCode: "EUR",
      scaledValue: -135.6,
    },
    transactions: [
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType2",
      },
      {
        accountId: "testAccountId",
        amount: {
          currencyCode: "EUR",
          scale: 1,
          unscaledValue: -678,
        },
        category: undefined,
        date: 12345,
        id: "testId",
        merchantInfo: {
          merchantName: "testMerchant",
        },
        type: "testType2",
      },
    ],
  },
};
