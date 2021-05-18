import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAccounts } from "../../api/account/getAccounts";
import { Pagination } from "../../api/types";
import { LoadingHandler } from "../../components/LoadingHandler";
import paths from "../../const/paths";
import { AccountItem } from "./AccountItem";

const Accounts: FC = () => {
  const [state, setState] = useState<Pagination>({ pageSize: 5 });
  const { data, isError, isLoading } = useQuery(["accounts", state], () => getAccounts(state));
  const onNextClick = () => {
    if (data?.nextPageToken) setState(prev => ({ ...prev, pageToken: data.nextPageToken }));
  };
  const { push } = useHistory();
  const onAccountClick = (id: string) => () => {
    push(`${paths.Account}/${id}`);
  };

  return (
    <LoadingHandler error={isError} loading={isLoading}>
      {data && (
        <>
          {data.accounts.map(
            ({
              id,
              name,
              balances: {
                booked: {
                  amount: { value },
                },
              },
            }) => (
              <AccountItem
                key={id}
                name={name}
                accountId={id}
                balance={value}
                onClick={onAccountClick(id)}
              />
            ),
          )}
          <button onClick={onNextClick} disabled={!data.nextPageToken}>
            next
          </button>
        </>
      )}
    </LoadingHandler>
  );
};

export default Accounts;
