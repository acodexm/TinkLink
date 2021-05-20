import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";

import { getTransactions } from "../../api/transactions/getTransactions";
import { PaginationQuery } from "../../api/types";
import { LoadingHandler } from "../LoadingHandler";
import Pagination from "../Pagination";
import TransactionItem from "./TransactionItem";

type Props = { accountId?: string };
type State = PaginationQuery & Props;
const Transactions: React.VFC<Props> = ({ accountId }) => {
  const [state, setState] = useState<State>({ pageSize: 10, accountId });
  const { isError, isLoading, data } = useQuery(
    ["transactions", state],
    () => getTransactions(state),
    { keepPreviousData: true },
  );
  const setPage = useCallback((page?: string) => {
    setState(prev => ({ ...prev, pageToken: page }));
  }, []);

  return (
    <>
      <LoadingHandler loading={isLoading} error={isError}>
        {data && (
          <>
            <div>
              {data.transactions.map(({ id, amount, descriptions }) => (
                <TransactionItem key={id} amount={amount} descriptions={descriptions} />
              ))}
            </div>
          </>
        )}
      </LoadingHandler>
      <Pagination nextPageToken={data?.nextPageToken} callback={setPage} />
    </>
  );
};

export default Transactions;
