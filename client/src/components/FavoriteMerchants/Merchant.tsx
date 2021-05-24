import React from "react";

import { formatMoney } from "../../helpers/format";
import MerchantImage from "./MerchantImage";

const Merchant: React.VFC<{ merchant: FavoriteMerchant }> = ({
  merchant: { category, total, customMerchantInfo },
}) => {
  return (
    <div
      onClick={() => {
        console.info(category);
      }}
    >
      <h2>{customMerchantInfo?.merchantName}</h2>
      <div>
        <MerchantImage category={category} info={customMerchantInfo} width={50} height={50} />
      </div>
      <strong>{formatMoney(total)}</strong>
    </div>
  );
};

export default Merchant;
