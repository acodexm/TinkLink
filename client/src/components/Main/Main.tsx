import React, { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { useQueryAsState } from "../../helpers/hooks/useQueryAsState";

interface OwnProps {}
export type State = {
  account: string;
  pageIndex: number;
  filters: string[];
  sortBy: string;
  desc: boolean;
};
type Props = OwnProps & RouteComponentProps;

const Main: FunctionComponent<Props> = () => {
  useQueryAsState<State>({
    account: "",
    pageIndex: 0,
    filters: [],
    sortBy: "date",
    desc: true,
  });

  return <main>todo you are authorized</main>;
};

export default withRouter(Main);
