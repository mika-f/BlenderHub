import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import AppContainer from "./components/app-container";
import Header from "./components/header";
import Installations from "./pages/installations";
import Settings from "./pages/settings";
import { store } from "./store";

const App: React.VFC = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
