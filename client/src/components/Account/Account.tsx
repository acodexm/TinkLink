import * as React from "react";

import { Transactions } from "./Transactions";

const Account: React.VFC<{
  account: V1.Ballance.Response;
  transactions: V1.Search.TransactionData[];
}> = ({ account, transactions }) => {
  return (
    <div>
      <h3>available balance:</h3>
      {account.balances.booked.unscaledValue}
      <Transactions transactions={transactions} />
    </div>
  );
};

export default Account;
