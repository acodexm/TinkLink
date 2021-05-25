import * as React from "react";
import styled from "styled-components";

import { PaginationQuery } from "../../api/types";
import { formatMoney } from "../../helpers/format";
import { QueryUpdater } from "../../helpers/hooks/useQueryAsState";
import Pagination from "../Pagination";
import { Transactions } from "./Transactions";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
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
