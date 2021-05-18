import * as React from "react";

import { formatCurrency, formatDate, formatNumber } from "../../../helpers/format";
import { TransactionData } from "../../../model";

export interface TransactionsProps {
  transactions: TransactionData[];
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
        {transactions.map(
          ({ transaction: { description, id, date, amount, currencyDenominatedAmount } }) => (
            <li key={id}>
              <b>{formatDate(new Date(date))}</b>
              <br />
              {description}
              <br />
              {formatNumber(amount)} {formatCurrency(currencyDenominatedAmount?.currencyCode)}
              <br />
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Transactions;
