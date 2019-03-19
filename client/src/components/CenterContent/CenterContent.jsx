import React, { Component } from "react";
import './CenterContent.css';
class CenterContent extends Component {
  render() {
    return (
      <div className="center-content">
        {this.props.children}
      </div>
    );
  }
}

export default CenterContent;
