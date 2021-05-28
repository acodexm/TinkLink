import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import { getAccount, getAccounts } from "../../api";
import { PaginationQuery } from "../../api/helpers/types";
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
  const accounts = useQuery("accounts", () => getAccounts({ pageSize: 30 }));
  const accountName = useMemo(() => {
    const accountData = accounts.data?.accounts.find(account => account.id === id);

    if (accountData) return accountData.name;
    return "";
  }, [accounts.data, id]);

  return (
    <LoadingHandler error={isError} loading={isLoading} size={200}>
      {data && (
        <AccountDetails
          transactions={data.transactions}
          account={data.account}
          accountName={accountName}
          callback={setState}
        />
      )}
    </LoadingHandler>
  );
};

export default Account;
