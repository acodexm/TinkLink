import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Accounts } from "../../components/Accounts";
import Transactions from "../../components/Transactions";

const Main: FC<RouteComponentProps> = () => {
  return (
    <>
      <Accounts />
      <Transactions />
    </>
  );
};

export default withRouter(Main);
