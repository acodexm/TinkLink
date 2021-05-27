import React, { memo } from "react";

import { StyledImg, Title } from "./static";
import { KNOWN_TYPES } from "./style";

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
