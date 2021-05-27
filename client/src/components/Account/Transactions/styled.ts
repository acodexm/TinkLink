import styled from "styled-components";

export const TransactionImage = styled.div`
  width: 100px;
`;
export const Money = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.bigger};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  align-self: center;
`;
