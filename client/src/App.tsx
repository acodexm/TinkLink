import React, { FunctionComponent, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BaseCSS } from "styled-bootstrap-grid";
import { Normalize } from "styled-normalize";

import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback/Callback";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound";
import paths from "./const/paths";
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
      <Header>tink link</Header>
      <Switch>
        <Route path={paths.Callback} component={Callback} />
        <Route path={paths.Main} component={Main} />
        <Route exact path={paths.Auth} component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
};

export default App;
