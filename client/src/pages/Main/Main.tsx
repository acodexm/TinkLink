import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps, withRouter } from "react-router";

import { searchQuery } from "../../api/search/searchQuery";
import Account from "../../components/Account/Account";
import { LoadingHandler } from "../../components/LoadingHandler";
// import { useQueryAsState } from "../../helpers/hooks/useQueryAsState";
import { SearchQuery } from "../../model";

const Main: FunctionComponent<RouteComponentProps> = () => {
  const [state] = useState<SearchQuery>({
    endDate: new Date().setDate(new Date().getMonth() - 1),
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
