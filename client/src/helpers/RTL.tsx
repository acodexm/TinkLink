import type { RenderOptions } from "@testing-library/react";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react";

import theme from "../theme";

const queryClient = new QueryClient();
const Providers: React.FC = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);
const renderWithProviders = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
