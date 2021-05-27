import React from "react";

import { formatDate, formatMoney } from "../../../helpers/format";
import MerchantImage from "../../MerchantImage";
import { Transaction } from "../../StyledComponents/Transaction";
import { Money, TransactionImage } from "./styled";

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
      {transactions.map(({ id, dates, amount, customMerchantInfo }) => (
        <Transaction key={id}>
          <TransactionImage>
            <MerchantImage info={customMerchantInfo} height={30} width={30} />
          </TransactionImage>
          <Money>{formatMoney(amount)}</Money>
          <b>{formatDate(new Date(dates.booked))}</b>
        </Transaction>
      ))}
    </div>
  );
};

export default Transactions;
