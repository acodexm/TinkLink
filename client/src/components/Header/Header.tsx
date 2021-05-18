import React, { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 50px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Header: FC = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export default Header;
