import React from "react";

import { render } from "../../helpers/RTL";
import MerchantImage from "./MerchantImage";

describe("<MerchantImage />", () => {
  it("should use default icons", () => {
    render(<MerchantImage info={{ merchantName: "test" }} width={50} height={50} />);
    console.info("todo");
  });
});
