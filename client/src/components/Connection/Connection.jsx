import React, { Component } from "react";
import CenterContent from '../CenterContent';
import axios from 'axios';
import Footer from '../Footer';
import Success from '../Success';
import Error from '../Error';
import './Connection.css';
class Connection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this is for displaying loading, connected, and failed feedback
      // 0 is not yet submitted, 1 is loading, 2 is connected, 3 is failed
      connectStatus: 0
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ connectStatus: 1 });
    const values = {
      user: event.target.user.value,
      password: event.target.password.value,
      database: event.target.database.value,
      host: event.target.host.value,
    }
    axios.post('/api/connectDB', values)
      .then(res => {
        // probably don't need this if statement
        if (res.status === 200) {
          this.setState({ connectStatus: 2 });
          // this is for letting the connection icon be visible for a second.5 before loading the next thing
          setTimeout(() => window.location.href = "/database", 1500);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ connectStatus: 3 });
        setTimeout(() => this.setState({ connectStatus: 0 }), 2000);
      });
  }

  render() {
    return (
      <div>
        <CenterContent>
          {this.state.connectStatus === 0 && (
            <div id="splash">
              <div id="splash_greeting" className="center-flex">
                <h1 className="text-center"> Hello!</h1>
                <p>Let's do a quick setup.</p>
              </div>
              <div>
                <form onSubmit={this.handleSubmit}>
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
          )}

          {this.state.connectStatus === 1 && (
            <h1>Connecting...</h1>
          )}

          {this.state.connectStatus === 2 && (
            <div><Success></Success>
              <h4 className="text-center pt-4">Connected!</h4>
            </div>
          )}
          {this.state.connectStatus === 3 && (
            <div><Error></Error>
              <h4 className="pt-4">Connection Failed.</h4></div>
          )}
        </CenterContent>
        <Footer></Footer>
      </div>
    );
  }
}

export default Connection;
