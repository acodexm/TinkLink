import React, { VFC } from "react";
import styled, { keyframes } from "styled-components";

import loading from "../../assets/loading.svg";

const spin = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
`;
const StyledSpinner = styled.img`
  animation: ${spin} 1.5s infinite linear;
`;

export const Spinner: VFC<{ width: number }> = ({ width }) => (
  <StyledSpinner src={loading} width={width} alt={"Loading"} />
);

export default Spinner;
