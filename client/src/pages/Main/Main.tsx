import React, { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Accounts } from "../../components/Accounts";
import FavoriteMerchants from "../../components/FavoriteMerchants";
import Transactions from "../../components/Transactions";

const Main: FC<RouteComponentProps> = () => {
  return (
    <>
      <h1>Your Tink Link connected accounts:</h1>
      <Accounts />
      <h2>Your favorite merchants and spending:</h2>
      <FavoriteMerchants />
      <h3>Your transactions:</h3>
      <Transactions />
    </>
  );
};

export default withRouter(Main);
