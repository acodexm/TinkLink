import styled from "styled-components";

export const MerchantCard = styled.div`
  width: 200px;
  padding: 1rem 0.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.tintedBackground};
  box-shadow: 2px 2px ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
export const Description = styled.div`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
  strong {
    font-size: 14px;
    line-height: 2rem;
  }
`;
