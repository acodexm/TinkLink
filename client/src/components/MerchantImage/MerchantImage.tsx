import React, { memo } from "react";
import styled from "styled-components";

import cardOperation from "../../assets/credit-card.svg";
import transfer from "../../assets/currency-exchange.svg";
import defaultOperation from "../../assets/flying-money.svg";
import payment from "../../assets/money.svg";
import fee from "../../assets/tax.svg";
import withdraw from "../../assets/withdrawal.svg";

const KNOWN_TYPES: Record<string, string> = {
  transfer,
  "card operation": cardOperation,
  fee,
  payment,
  withdraw,
  default: defaultOperation,
};
const StyledImg = styled.img`
  border-radius: 50%;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  margin-top: 1rem;
  text-transform: capitalize;
`;
const MerchantImage: React.VFC<{
  info: MerchantInformation;
  width: number;
  height: number;
  category?: string;
}> = ({ category = "unknown", info: { imgSrc, merchantName }, width, height }) => {
  let src;
  let alt;

  if (KNOWN_TYPES[category]) {
    src = KNOWN_TYPES[category];
    alt = category;
  } else {
    src = imgSrc ? imgSrc : KNOWN_TYPES["default"];
    alt = merchantName;
  }

  return (
    <>
      <StyledImg src={src} alt={alt} width={width} height={height} />
      <Title>{alt}</Title>
    </>
  );
};

export default memo(MerchantImage);
