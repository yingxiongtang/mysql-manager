import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Connection from "../Connection";
import Database from "../Database";
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Connection is the initial setup page */}
          <Route path="/" exact component={Connection} />
          {/* Database contains the rest of the web app once the user has a connection made */}
          <Route path="/database" exact component={Database} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
