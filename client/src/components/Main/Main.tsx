import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps, withRouter } from "react-router";

import { searchQuery } from "../../api/search/searchQuery";
// import { useQueryAsState } from "../../helpers/hooks/useQueryAsState";
import { SearchQuery } from "../../model";
import { LoadingHandler } from "../LoadingHandler";
import Account from "./Account/Account";

const Main: FunctionComponent<RouteComponentProps> = () => {
  const [state] = useState<SearchQuery>({
    endDate: new Date().setDate(new Date().getMonth() - 1),
    limit: 10,
    order: "DESC",
    sort: "DATE",
  });
  const { data, isError, isLoading } = useQuery(["search", state], () => searchQuery(state));

  return (
    <LoadingHandler error={isError} loading={isLoading}>
      {data && <Account searchData={data} />}
    </LoadingHandler>
  );
};

export default withRouter(Main);
