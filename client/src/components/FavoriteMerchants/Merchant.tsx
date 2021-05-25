import React from "react";

import { formatMoney } from "../../helpers/format";
import MerchantImage from "../MerchantImage/MerchantImage";
import { Description, MerchantCard } from "./styled";

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
      <Description>
        Since 2020 you have spent: <br />
        <strong>{formatMoney(total)}</strong>
      </Description>
    </MerchantCard>
  );
};

export default Merchant;
