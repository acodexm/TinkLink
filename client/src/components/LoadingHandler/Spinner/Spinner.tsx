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
const StyledSpinner = styled.img<{ hide?: boolean }>`
  animation: ${spin} 1.5s infinite linear;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

export const Spinner: VFC<{ width: number; loading?: boolean }> = ({ width, loading }) => (
  <StyledSpinner
    src={spinner}
    width={width}
    hide={!loading}
    alt={"Loading"}
    data-testid={"loading"}
  />
);

export default Spinner;
