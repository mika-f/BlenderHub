import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import AppContainer from "./components/app-container";
import Header from "./components/header";

import Installations from "./pages/installations";
import Settings from "./pages/settings";

const App: React.VFC = () => (
  <AppContainer>
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/installations/stable" />
        </Route>
        <Route path="/installations/:branch">
          <Installations />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
      </Switch>
    </Router>
  </AppContainer>
);

export default App;
