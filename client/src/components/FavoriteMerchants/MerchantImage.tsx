import React from "react";

import transfer from "../../assets/currency-exchange.svg";

const KNOWN_TYPES: Record<string, string> = {
  transfer,
  "card operation": "",
  fee: "",
  payment: "",
  withdraw: "",
  default: "",
};
const MerchantImage: React.VFC<{
  category: string;
  info: MerchantInformation;
  width: number;
  height: number;
}> = ({ category, info: { imgSrc, merchantName }, width, height }) => {
  let src;
  let alt;

  if (KNOWN_TYPES[category]) {
    src = KNOWN_TYPES[category];
    alt = category;
  } else {
    src = imgSrc ? imgSrc : KNOWN_TYPES["default"];
    alt = merchantName;
  }

  return <img src={src} alt={alt} width={width} height={height} />;
};

export default MerchantImage;
