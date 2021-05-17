import React from "react";

import App from "./App";
import { render, screen } from "./helpers/RTL";

const loader = document.querySelector(".loader");

const hideLoader = () => loader?.classList.add("loader--hide");

describe("<App>", () => {
  it("renders learn react link", () => {
    render(<App hideLoader={hideLoader} />);
    const linkElement = screen.getByRole("button", { name: /tink link/i });

    expect(document.body.contains(linkElement));
  });
});
