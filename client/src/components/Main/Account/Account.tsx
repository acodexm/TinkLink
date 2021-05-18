import * as React from "react";

import { SearchData } from "../../../model";
import Transactions from "../Transactions/Transactions";

const Account: React.VFC<{ searchData: SearchData }> = ({ searchData }) => {
  return (
    <div>
      <h3>todo</h3>
      <Transactions transactions={searchData.results} />
    </div>
  );
};

export default Account;
