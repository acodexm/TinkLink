import * as React from "react";
import styled from "styled-components";

import { formatDate, formatMoney } from "../../../helpers/format";
import MerchantImage from "../../FavoriteMerchants/MerchantImage";

export interface TransactionsProps {
  transactions: V2.Transactions.Transaction[];
}
const StyledTransaction = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 1rem 1rem 5rem 1rem;
  background: #ffffff30;
  box-shadow: 2px 2px orange;
  color: white;
`;
const Transactions: React.VFC<TransactionsProps> = ({ transactions }) => {
  if (transactions.length === 0)
    return (
      <div>
        <h4>Some of your transactions:</h4>
        <StyledTransaction>
          <p>You don’t seem to have any transactions.</p>
        </StyledTransaction>
      </div>
    );
  return (
    <div>
      <h4>Some of your transactions:</h4>
      {transactions.map(({ descriptions, id, dates, amount, customMerchantInfo }) => (
        <StyledTransaction key={id}>
          <div>
            <MerchantImage info={customMerchantInfo} height={30} width={30} />
            {descriptions.display}
            <br />
            <strong>{formatMoney(amount)}</strong>
          </div>
          <b>{formatDate(new Date(dates.booked))}</b>
        </StyledTransaction>
      ))}
    </div>
  );
};

export default Transactions;
