// import React from 'react';

// import ModalCreateTable from './ModalCreateTable.jsx';

// const ModalConductor = props => {
//   switch (props.currentModal) {
//     case 'CREATE_TABLE':
//       return <ModalCreateTable {...props}/>;

//     default:
//       return null;
//   }
// };

// export default ModalConductor;


import React from "react";
import ReactDOM from "react-dom";
import ModalWrapper from "../ModalWrapper";
import ModalCreateTable from "../ModalCreateTable";


function ModalConductor(props) {
  console.log("asdf created")
  switch (props.type) {
    case "CREATE_TABLE":
      return ReactDOM.createPortal(
        <ModalWrapper close={props.close} title="Create Table"><ModalCreateTable /></ModalWrapper>,
        document.querySelector("#modal"));
    default:
      console.log("No type was passed");
      return;
  }
}


export default ModalConductor;