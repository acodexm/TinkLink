import styled from "styled-components";

import { hoverEffect } from "./styled";

export const Transaction = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 1rem 1rem 5rem 1rem;
  background: ${({ theme }) => theme.colors.tintedBackground};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  ${hoverEffect}
`;
