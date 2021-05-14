import React from "react";

import App from "./App";
import { render } from "./helpers/RTL";

const loader = document.querySelector(".loader");

const hideLoader = () => loader?.classList.add("loader--hide");

describe("<App>", () => {
  it("renders learn react link", () => {
    const { getByText } = render(<App hideLoader={hideLoader} />);
    const linkElement = getByText(/tink link/i);

    expect(document.body.contains(linkElement));
  });
});
