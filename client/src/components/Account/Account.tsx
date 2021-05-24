import * as React from "react";

import { PaginationQuery } from "../../api/types";
import { QueryUpdater } from "../../helpers/hooks/useQueryAsState";
import Pagination from "../Pagination";
import { Transactions } from "./Transactions";

const Account: React.VFC<{
  account: V1.Ballance.Response;
  transactions: V2.Transactions.Response;
  callback: QueryUpdater<PaginationQuery>;
}> = ({ account, transactions, callback }) => {
  return (
    <div>
      <h3>available balance:</h3>
      {account.balances.booked.unscaledValue}
      <Transactions transactions={transactions.transactions} />
      <Pagination nextPageToken={transactions.nextPageToken} callback={callback} />
    </div>
  );
};

export default Account;
