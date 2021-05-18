import React from "react";

type Props = {
  name: string;
  balance: V2.Accounts.Value;
  accountId: string;
  onClick: () => void;
};
const AccountItem: React.VFC<Props> = ({ onClick, name, balance }) => {
  return (
    <div onClick={onClick}>
      {name}
      <div>{balance.unscaledValue}</div>
    </div>
  );
};

export default AccountItem;
