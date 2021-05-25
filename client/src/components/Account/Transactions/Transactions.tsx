import * as React from "react";

import { formatDate, formatMoney } from "../../../helpers/format";
import MerchantImage from "../../MerchantImage/MerchantImage";
import { Transaction } from "../../StyledComponents/Transaction";

interface TransactionsProps {
  transactions: V2.Transactions.Transaction[];
}

const Transactions: React.VFC<TransactionsProps> = ({ transactions }) => {
  if (transactions.length === 0)
    return (
      <div>
        <h4>Some of your transactions:</h4>
        <Transaction>
          <p>You don’t seem to have any transactions.</p>
        </Transaction>
      </div>
    );
  return (
    <div>
      <h4>Some of your transactions:</h4>
      {transactions.map(({ descriptions, id, dates, amount, customMerchantInfo }) => (
        <Transaction key={id}>
          <div>
            <MerchantImage info={customMerchantInfo} height={30} width={30} />
            {descriptions.display}
            <br />
            <strong>{formatMoney(amount)}</strong>
          </div>
          <b>{formatDate(new Date(dates.booked))}</b>
        </Transaction>
      ))}
    </div>
  );
};

export default Transactions;
