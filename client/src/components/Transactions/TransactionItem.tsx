import React from "react";

import { formatMoney } from "../../helpers/format";
import { Transaction } from "../StyledComponents/Transaction";

type Props = {
  amount: V2.Transactions.Amount;
  descriptions: V2.Transactions.Descriptions;
};

const TransactionItem: React.VFC<Props> = ({ amount, descriptions }) => {
  return (
    <Transaction>
      <div>{descriptions?.display}:</div>
      <strong>{formatMoney(amount)}</strong>
    </Transaction>
  );
};

export default TransactionItem;
