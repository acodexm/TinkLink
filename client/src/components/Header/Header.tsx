import React, { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 50px;
  padding: 1rem;
  display: flex;
  border-radius: 0 0 5rem 1rem;
  background: #ffffff30;
  box-shadow: 2px 2px orange;
`;

const Header: FC = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export default Header;
