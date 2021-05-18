import React from "react";

type Props = {
  name: string;
  balance: V2.Accounts.Value;
  accountId: string;
};
const AccountItem: React.VFC<Props> = props => {
  console.info(props);
  return <div>todo</div>;
};

export default AccountItem;
