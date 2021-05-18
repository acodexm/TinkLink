import React, { useState } from "react";
import { useQuery } from "react-query";

import { getTransactions } from "../../api/transactions/getTransactions";
import { Pagination } from "../../api/types";
import { LoadingHandler } from "../LoadingHandler";
import TransactionItem from "./TransactionItem";

type Props = { accountId?: string };
type State = Pagination & Props;
const Transactions: React.VFC<Props> = ({ accountId }) => {
  const [state, setState] = useState<State>({ pageSize: 30, accountId });
  const { isError, isLoading, data } = useQuery(["transactions", state], () =>
    getTransactions(state),
  );
  const onNextClick = () => {
    if (data?.nextPageToken) setState(prev => ({ ...prev, pageToken: data.nextPageToken }));
  };

  return (
    <LoadingHandler loading={isLoading} error={isError}>
      {data && (
        <>
          {data.transactions.map(({ id, amount, descriptions }) => (
            <TransactionItem key={id} amount={amount} descriptions={descriptions} />
          ))}
          <button onClick={onNextClick} disabled={!data.nextPageToken}>
            next
          </button>
        </>
      )}
    </LoadingHandler>
  );
};

export default Transactions;
