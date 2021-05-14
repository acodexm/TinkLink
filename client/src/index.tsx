import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import theme from "./theme";

const loader = document.querySelector(".loader");

const hideLoader = () => loader?.classList.add("loader--hide");

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App hideLoader={hideLoader} />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector("#root"),
);
