import React from "react";

import { BarsContainer, LoadingBars } from "./styles";

const Bars: React.VFC = () => (
  <LoadingBars data-testid="loading">
    <BarsContainer>
      <div />
      <div />
      <div />
    </BarsContainer>
  </LoadingBars>
);

export default Bars;
