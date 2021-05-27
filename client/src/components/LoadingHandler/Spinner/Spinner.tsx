import React, { VFC } from "react";
import styled, { keyframes } from "styled-components";

import spinner from "../../../assets/spinner.png";

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
  overflow: hidden;
  position: absolute;
  animation: ${spin} 1.5s infinite linear;
`;

export const Spinner: VFC<{ width?: number }> = ({ width = 50 }) => (
  <StyledSpinner src={spinner} width={width} alt={"Loading"} data-testid={"loading"} />
);

export default Spinner;
