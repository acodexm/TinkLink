import React from "react";

import { render } from "../../helpers/RTL";
import Account from "./Account";

const mockAccount = { accountId: "testId", balances: { booked: {} } } as V1.Ballance.Response;
const mockTransactions = {
  nextPageToken: "",
  transactions: [
    {
      customMerchantInfo: {},
      dates: {},
      types: {},
      descriptions: {},
      amount: { value: { unscaledValue: "" } },
    },
  ],
} as V2.Transactions.Response;
const callback = jest.fn();

describe("<Account />", () => {
  it("should use default icons", () => {
    render(
      <Account
        account={mockAccount}
        accountName={"test account"}
        transactions={mockTransactions}
        callback={callback}
      />,
    );
    console.info("todo");
  });
});
