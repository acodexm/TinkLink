import styled from "styled-components";

import { hoverEffect } from "./styled";

export const Button = styled.button<{ rtl?: boolean }>`
  margin: auto;
  min-width: 70px;
  min-height: 70px;
  padding: 1rem;
  border-radius: ${({ rtl = false }) => (rtl ? "1rem 1rem 1rem 5rem" : "1rem 1rem 5rem")};
  background: ${({ disabled, theme }) => (disabled ? "transparent" : theme.colors.buttonBg)};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.disabled};
  border: none;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.disabled : theme.colors.textBtn)};
  ${hoverEffect}
`;
