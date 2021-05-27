import React from "react";
import { useQuery } from "react-query";
import { Row } from "styled-bootstrap-grid";

import { getAggregatedMerchants } from "../../api";
import { LoadingHandler } from "../LoadingHandler";
import Merchant from "./Merchant";

const FavoriteMerchants: React.VFC = () => {
  const { isLoading, isError, data } = useQuery(["aggregate"], () => getAggregatedMerchants());

  return (
    <LoadingHandler loading={isLoading} error={isError}>
      <Row justifyContent={"between"}>
        {data && data.map(merchant => <Merchant key={merchant.category} merchant={merchant} />)}
      </Row>
    </LoadingHandler>
  );
};

export default FavoriteMerchants;
