import React, { FC } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAccounts } from "../../api/account/getAccounts";
import { LoadingHandler } from "../../components/LoadingHandler";
import paths from "../../const/paths";
import { AccountItem } from "./AccountItem";

const Accounts: FC = () => {
  //no more than 30 accounts :) unless you own all banks accounts in the country xD
  const { data, isError, isLoading } = useQuery(["accounts"], () => getAccounts({ pageSize: 30 }));
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
        </>
      )}
    </LoadingHandler>
  );
};

export default Accounts;
