import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      // this is only used on the connection page.
      <div className="absolute">
        <p>Bootstrap theme provided by <a target="_blank" rel="noopener noreferrer" href="https://bootswatch.com/">Bootswatch</a></p>
      </div>
    );
  }
}

export default Footer;
