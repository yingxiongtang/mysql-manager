import React from "react";
import ReactDOM from "react-dom";
import ModalWrapper from "../ModalWrapper";


function ModalConductor(props) {
  console.log("asdf created")
  switch (props.type) {
    case "CREATE_TABLE":
      return ReactDOM.createPortal(
        <ModalWrapper type="CREATE_TABLE" close={props.close} title="Create Table"></ModalWrapper>,
        document.querySelector("#modal"));
    default:
      console.log("No type was passed");
      return;
  }
}


export default ModalConductor;