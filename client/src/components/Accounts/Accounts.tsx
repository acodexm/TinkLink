import React, { FC } from "react";
import { useQuery } from "react-query";

import { getAccountList } from "../../api/account/getAccountList";
import { LoadingHandler } from "../../components/LoadingHandler";
import { AccountItem } from "./AccountItem";

const Accounts: FC = () => {
  const { data, isError, isLoading } = useQuery(["account/list"], () => getAccountList());

  return (
    <LoadingHandler error={isError} loading={isLoading}>
      {data &&
        data.accounts.map(({ balance, id, name }) => (
          <AccountItem key={id} name={name} accountId={id} balance={balance} />
        ))}
    </LoadingHandler>
  );
};

export default Accounts;
