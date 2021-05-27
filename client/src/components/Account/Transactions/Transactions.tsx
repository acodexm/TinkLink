import React from "react";
import styled from "styled-components";

import { formatDate, formatMoney } from "../../../helpers/format";
import MerchantImage from "../../MerchantImage/MerchantImage";
import { Transaction } from "../../StyledComponents/Transaction";

interface TransactionsProps {
  transactions: V2.Transactions.Transaction[];
}
const TransactionImage = styled.div`
  width: 100px;
`;
const Money = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.bigger};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  align-self: center;
`;
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
