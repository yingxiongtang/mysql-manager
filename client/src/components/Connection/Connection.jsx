import React, { Component } from "react";
import CenterContent from '../CenterContent';
import Footer from '../Footer';
import Success from '../Success';
import Error from '../Error';
import './Connection.css';
class Connection extends Component {
  render() {
    return (
      <div>
        <CenterContent>
          <div id="splash">
            <div id="splash_greeting" className="center-flex">
              <h1 className="text-center"> Hello!</h1>
              <p>Let's do a quick setup.</p>
            </div>
            <div>
              <form action="/connection" method="post" autoComplete="off">
                <label htmlFor="user">User</label>
                <input className="mb-3 form-control" type="text" name="user" id="user" autoComplete="off" placeholder="the_best_user" required></input>

                <label htmlFor="password">Password</label>
                <input className="mb-3 form-control" type="password" name="password" id="password" autoComplete="off" placeholder="secure_password" ></input>

                <label htmlFor="database">MySQL Database</label>
                <input className="mb-3 form-control" type="text" name="database" id="database" autoComplete="off" placeholder="db" required></input>

                <label htmlFor="host">Web Address</label>
                <input className="form-control" type="text" name="host" id="host" autoComplete="off" placeholder="localhost" required></input>
                <button className="mt-3 btn btn-primary" type="submit">Connect</button>
              </form>
            </div>
          </div>
        </CenterContent>
        <Footer></Footer>
      </div>
    );
  }
}

export default Connection;
