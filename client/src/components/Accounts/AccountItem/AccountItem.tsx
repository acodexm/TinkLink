import React from "react";
import { Col } from "styled-bootstrap-grid";

import { formatMoney } from "../../../helpers/format";
import { AccountCard } from "./styled";

type Props = {
  name: string;
  balance: V2.Accounts.Amount;
  accountId: string;
  onClick: () => void;
};
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
