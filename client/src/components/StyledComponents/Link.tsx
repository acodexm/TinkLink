import styled from "styled-components";

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 5px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
