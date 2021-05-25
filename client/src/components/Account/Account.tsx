import * as React from "react";

import { PaginationQuery } from "../../api/types";
import { formatMoney } from "../../helpers/format";
import { QueryUpdater } from "../../helpers/hooks/useQueryAsState";
import Pagination from "../Pagination";
import { Centered } from "../StyledComponents/Centered";
import { Transactions } from "./Transactions";

const Account: React.VFC<{
  accountName: string;
  account: V1.Ballance.Response;
  transactions: V2.Transactions.Response;
  callback: QueryUpdater<PaginationQuery>;
}> = ({ account, accountName, transactions, callback }) => {
  return (
    <div>
      <Centered>
        <h1>{accountName}</h1>
        <h2>Available balance:</h2>
        <strong>{formatMoney(account.balances.booked)}</strong>
      </Centered>
      <Transactions transactions={transactions.transactions} />
      <Pagination nextPageToken={transactions.nextPageToken} callback={callback} />
    </div>
  );
};

export default Account;
