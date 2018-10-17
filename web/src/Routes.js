import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import { Login, Register } from "./components/User";
import { Account, PaidUsers } from "./components/Account";
import Header from "./components/Header";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => (
                <Fragment>
                  <Header />
                  <Route exact={true} path="/" component={Home} />
                  <Route path="/register" component={Register} />
                  <Route path="/account" component={Account} />
                  <Route path="/paid-users" component={PaidUsers} />
                </Fragment>
              )}
            />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Routes;

// NEXT: 8
