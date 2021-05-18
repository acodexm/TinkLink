import React, { FunctionComponent, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BaseCSS } from "styled-bootstrap-grid";
import { Normalize } from "styled-normalize";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/NotFound";
import paths from "./const/paths";
import Layout from "./Layout";
import Account from "./pages/Account";
import Auth from "./pages/Auth/Auth";
import Callback from "./pages/Callback/Callback";
import Main from "./pages/Main";
import { GlobalStyle } from "./styled";

interface Loading {
  hideLoader(): void;
}

const App: FunctionComponent<Loading> = ({ hideLoader }) => {
  useEffect(hideLoader, [hideLoader]);

  return (
    <ErrorBoundary>
      <GlobalStyle />
      <Normalize />
      <BaseCSS />
      <Layout>
        <Switch>
          <Route path={paths.Callback} component={Callback} />
          <Route path={`${paths.Account}/:id`} component={Account} />
          <Route path={paths.Main} component={Main} />
          <Route exact path={paths.Auth} component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
