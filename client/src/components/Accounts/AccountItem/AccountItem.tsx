import React from "react";
import { Col } from "styled-bootstrap-grid";
import styled from "styled-components";

import { formatMoney } from "../../../helpers/format";

type Props = {
  name: string;
  balance: V2.Accounts.Amount;
  accountId: string;
  onClick: () => void;
};
const AccountCard = styled.div`
  padding: 1rem 0.5rem;
  margin: 1rem auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: #ffffff30;
  box-shadow: 2px 2px orange;
  color: white;
`;
const AccountItem: React.VFC<Props> = ({ onClick, name, balance }) => {
  return (
    <Col xs={12} lg={6}>
      <AccountCard onClick={onClick}>
        <strong>{name}</strong>
        <div>{formatMoney(balance)}</div>
      </AccountCard>
    </Col>
  );
};

export default AccountItem;
