import React from "react";
import ReactDOM from "react-dom";
import ModalWrapper from "../ModalWrapper";


function ModalConductor(props) {
  console.log("asdf created")
  switch (props.type) {
    case "CREATE_TABLE":
      return ReactDOM.createPortal(
        <ModalWrapper type="CREATE_TABLE" close={props.close} title="Create Table" refresh={props.refresh}></ModalWrapper>,
        document.querySelector("#modal"));

    case "CREATE_ROW":
      return ReactDOM.createPortal(
        <ModalWrapper type="CREATE_ROW" close={props.close} data={props.data} title="Create Row" refresh={props.refresh}></ModalWrapper>,
        document.querySelector("#modal"));

    case "DELETE_ROW":
      return ReactDOM.createPortal(
        <ModalWrapper type="DELETE_ROW" close={props.close} data={props.data} title="Delete Row" refresh={props.refresh}></ModalWrapper>,
        document.querySelector("#modal"));

    case "DELETE_TABLE":
      return ReactDOM.createPortal(
        <ModalWrapper type="DELETE_TABLE" close={props.close} data={props.data} title="Delete Table" refresh={props.refresh}></ModalWrapper>,
        document.querySelector("#modal"));

    default:
      console.log("No type was passed");
      return;
  }
}


export default ModalConductor;