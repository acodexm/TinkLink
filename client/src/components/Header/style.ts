import styled from "styled-components";

export const StyledHeader = styled.header`
  height: 50px;
  padding: 1rem;
  display: flex;
  border-radius: 0 0 5rem 1rem;
  background: ${({ theme }) => theme.colors.tintedBackground};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.primary};
`;
