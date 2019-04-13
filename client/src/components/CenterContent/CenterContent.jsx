import React, { Component } from "react";
import './CenterContent.css';
class CenterContent extends Component {
  render() {
    return (
      // this component wasn't as important as I hoped it would be.
      // in the future this component should just be deleted and
      // replaced with the class center-content for other 
      // components that used this.
      <div className="center-content">
        {this.props.children}
      </div>
    );
  }
}

export default CenterContent;
