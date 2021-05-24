import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { getAccount } from "../../api/account/getAccount";
import { PaginationQuery } from "../../api/types";
import { AccountDetails } from "../../components/Account";
import { LoadingHandler } from "../../components/LoadingHandler";
import { useQueryAsState } from "../../helpers/hooks/useQueryAsState";

const Account: React.VFC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useQueryAsState<PaginationQuery>({
    pageSize: 10,
  });
  const { data, isError, isLoading } = useQuery(
    ["account", id, state],
    () => getAccount(id, state.pageSize, state.pageToken),
    { keepPreviousData: true },
  );

  return (
    <LoadingHandler error={isError} loading={isLoading}>
      <h1>Your account details</h1>
      {data && (
        <AccountDetails
          transactions={data.transactions}
          account={data.account}
          callback={setState}
        />
      )}
    </LoadingHandler>
  );
};

export default Account;
