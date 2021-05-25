import React from "react";

import { render } from "../../../helpers/RTL";
import Transactions from "./Transactions";

const mockTransactions = [] as V2.Transactions.Transaction[];

describe("<MerchantImage />", () => {
  it("should use default icons", () => {
    render(<Transactions transactions={mockTransactions} />);
    console.info("todo");
  });
});
