import styled from "styled-components";

import { hoverEffect } from "../../StyledComponents/styled";

export const AccountCard = styled.div`
  padding: 1rem 0.5rem;
  margin: 1rem auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.tintedBackground};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  ${hoverEffect}
`;
