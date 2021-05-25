import React, { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 50px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 5rem 1rem;
  background: ${({ theme }) => theme.colors.tintedBackground};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.primary};
`;

const Header: FC = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export default Header;
