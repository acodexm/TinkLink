import React from "react";
import { useQuery } from "react-query";
import { Col, Row } from "styled-bootstrap-grid";

import { getTransactions } from "../../api";
import { PaginationQuery } from "../../api/helpers/types";
import { useQueryAsState } from "../../helpers/hooks/useQueryAsState";
import { LoadingHandler } from "../LoadingHandler";
import Pagination from "../Pagination";
import TransactionItem from "./TransactionItem";

type Props = { accountId?: string };
type State = PaginationQuery & Props;
const Transactions: React.VFC<Props> = ({ accountId }) => {
  const [state, setState] = useQueryAsState<State>({ pageSize: 10, accountId });

  const { isError, isLoading, data } = useQuery(
    ["transactions", state],
    () => getTransactions(state),
    { keepPreviousData: true },
  );

  return (
    <>
      <LoadingHandler loading={isLoading} error={isError} size={200}>
        <Row justifyContent={"center"}>
          <Col col={10}>
            {data &&
              data.transactions.map(({ id, amount, descriptions }) => (
                <TransactionItem key={id} amount={amount} descriptions={descriptions} />
              ))}
          </Col>
        </Row>
      </LoadingHandler>
      <Pagination nextPageToken={data?.nextPageToken} callback={setState} />
    </>
  );
};

export default Transactions;
