import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { getAccount } from "../../api/account/getAccount";
import { AccountDetails } from "../../components/Account";
import { LoadingHandler } from "../../components/LoadingHandler";

const Account: React.VFC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useQuery(["account", id], () => getAccount(id));

  return (
    <LoadingHandler error={isError} loading={isLoading}>
      <h1>Your account details</h1>
      {data && <AccountDetails transactions={data.transactions} account={data.account} />}
    </LoadingHandler>
  );
};

export default Account;
