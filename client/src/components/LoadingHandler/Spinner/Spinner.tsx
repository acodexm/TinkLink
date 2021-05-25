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
  width: 50px;
  height: 50px;
  overflow: hidden;
  background: none;
  position: absolute;
  display: flex;
  flex: 1;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
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
