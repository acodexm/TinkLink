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
export const expectedResult = {
  testdescription: {
    category: "testdescription",
    total: {
      currencyCode: "EUR",
      scaledValue: -259.05,
    },
    customMerchantInfo: {
      merchantName: "testMerchant",
    },
  },
  testtype: {
    category: "testtype",
    total: {
      currencyCode: "EUR",
      scaledValue: -123.45,
    },
    customMerchantInfo: {
      merchantName: "testMerchant",
    },
  },
  testtype2: {
    category: "testtype2",
    total: {
      currencyCode: "EUR",
      scaledValue: -135.6,
    },
    customMerchantInfo: {
      merchantName: "testMerchant",
    },
  },
};
