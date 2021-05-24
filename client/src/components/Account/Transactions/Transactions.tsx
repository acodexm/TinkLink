import * as React from "react";

import { formatDate, formatMoney } from "../../../helpers/format";

export interface TransactionsProps {
  transactions: V2.Transactions.Transaction[];
}

const Transactions: React.VFC<TransactionsProps> = ({ transactions }) => {
  if (transactions.length === 0)
    return (
      <div>
        <h4>Some of your transactions</h4>
        <div>
          <p>You don’t seem to have any transactions.</p>
        </div>
      </div>
    );
  return (
    <div>
      <h4>Some of your transactions</h4>
      <ul>
        {transactions.map(({ descriptions, id, dates, amount }) => (
          <li key={id}>
            <b>{formatDate(new Date(dates.booked))}</b>
            <br />
            {descriptions.display}
            <br />
            {formatMoney(amount)}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
