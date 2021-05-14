import React, { FunctionComponent, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch } from "react-router-dom";
import { BaseCSS } from "styled-bootstrap-grid";
import { Normalize } from "styled-normalize";

import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback/Callback";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound";

interface Loading {
  hideLoader(): void;
}
const queryClient = new QueryClient();

const App: FunctionComponent<Loading> = ({ hideLoader }) => {
  useEffect(hideLoader, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Normalize />
        <BaseCSS />
        <Header>tink link</Header>
        <Switch>
          <Route path={"/callback"} component={Callback} />
          <Route path={"/account"} component={Main} />
          <Route exact path={"/"} component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
