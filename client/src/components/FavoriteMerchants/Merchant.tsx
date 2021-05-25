import React from "react";
import styled from "styled-components";

import { formatMoney } from "../../helpers/format";
import MerchantImage from "./MerchantImage";

const MerchantCard = styled.div`
  width: 200px;
  padding: 1rem 0.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: #ffffff30;
  box-shadow: 2px 2px orange;
  color: white;
`;
const Title = styled.div`
  font-size: 14px;
  margin-top: 1rem;
`;
const Description = styled.div`
  margin-top: 1rem;
  font-size: 10px;
  text-align: center;
  strong {
    font-size: 14px;
    line-height: 2rem;
  }
`;
const Merchant: React.VFC<{ merchant: FavoriteMerchant }> = ({
  merchant: { category, total, customMerchantInfo },
}) => {
  return (
    <MerchantCard
      onClick={() => {
        console.info(category);
      }}
    >
      <MerchantImage category={category} info={customMerchantInfo} width={100} height={100} />
      <Title>{customMerchantInfo?.merchantName}</Title>
      <Description>
        Since 2020 you have spent: <br />
        <strong>{formatMoney(total)}</strong>
      </Description>
    </MerchantCard>
  );
};

export default Merchant;
