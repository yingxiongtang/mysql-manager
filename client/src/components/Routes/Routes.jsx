import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Connection from "../Connection";
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={props => <Timeline posts={this.state.posts} {...props} />} /> */}
          <Route path="/" exact component={Connection} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
