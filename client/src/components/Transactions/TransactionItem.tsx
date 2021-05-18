import React from "react";

type Props = {
  amount: V2.Transactions.Amount;
  descriptions: V2.Transactions.Descriptions;
};
const TransactionItem: React.VFC<Props> = ({ amount, descriptions }) => {
  return (
    <div>
      {amount}
      <div>{descriptions?.display}</div>
    </div>
  );
};

export default TransactionItem;
