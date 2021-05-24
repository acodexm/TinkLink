import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Accounts } from "../../components/Accounts";
import FavoriteMerchants from "../../components/FavoriteMerchants/FavouriteMerchants";
import Transactions from "../../components/Transactions";

const Main: FC<RouteComponentProps> = () => {
  return (
    <>
      <FavoriteMerchants />
      <Accounts />
      <Transactions />
    </>
  );
};

export default withRouter(Main);
