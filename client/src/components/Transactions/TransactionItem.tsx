import React from "react";
import styled from "styled-components";

import { formatMoney } from "../../helpers/format";

type Props = {
  amount: V2.Transactions.Amount;
  descriptions: V2.Transactions.Descriptions;
};
const StyledTransaction = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  background: #ffffff30;
  box-shadow: 2px 2px orange;
  color: white;
`;
const TransactionItem: React.VFC<Props> = ({ amount, descriptions }) => {
  return (
    <StyledTransaction>
      <div>{descriptions?.display}:</div>
      <strong>{formatMoney(amount)}</strong>
    </StyledTransaction>
  );
};

export default TransactionItem;
