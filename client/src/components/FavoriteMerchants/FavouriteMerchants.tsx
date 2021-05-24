import React from "react";
import { useQuery } from "react-query";

import { getAggregatedMerchants } from "../../api/aggregation/getAggregatedMerchants";
import { LoadingHandler } from "../LoadingHandler";
import Merchant from "./Merchant";

const FavoriteMerchants: React.VFC = () => {
  const { isLoading, isError, data } = useQuery(["aggregate"], () => getAggregatedMerchants());

  return (
    <LoadingHandler loading={isLoading} error={isError}>
      {data && data.map(merchant => <Merchant key={merchant.category} merchant={merchant} />)}
    </LoadingHandler>
  );
};

export default FavoriteMerchants;
