import React, { Component } from "react";
import axios from 'axios';
import './Database.css';

import Sidebar from '../Sidebar'
import Content from '../Content'
import ModalConductor from "../ModalConductor";

class Database extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // this is for db-container sidebar loading feedback
      // 0 is loaded, 1 is loading
      loadingTables: 1,
      // This is for the db-container content loading feedback
      // 0 is loaded, 1 is loading, 2 means the user hasn't selected a table yet
      loadingItems: 2,
      tables: [],
      tableItems: [],
      dbName: "",
      modal: 0,
    };

    this.handleTableClick = this.handleTableClick.bind(this);
  }

  handleTableClick = (e, key) => {
    this.setState({ loadingItems: 1 });
    axios.post("/view/table", {
      data: key
    }).then(res => {
      console.log(res)
      this.setState({ loadingItems: 0, tableItems: res.data });
    }).catch(err => { console.log(err) })
  }

  componentDidMount = () => {
    axios.get("/view").then(res => {
      let tableArr = [];
      // res.data[0] (first table) [Object.keys(res.data[0]) <-- referring to first table object
      // this line gets the value of the first key in object specified
      res.data[0].forEach(object => {
        tableArr.push(object[Object.keys(object)[0]]);
      });
      this.setState({ tables: tableArr, loadingTables: 0, dbName: res.data[1][0][Object.keys(res.data[1][0])[0]] });
    }).catch(err => {
      console.log("internal server error " + err);
    })
  }

  showModule = (type) => {
    this.setState({modalType:type, modal:1});
  }

  hideModule = () => {
    this.setState({modalType:null, modal:0});
  }

  render() {
    return (
      <div className="container-fluid m-0 p-0">
      {this.state.modal === 1 && <ModalConductor type={this.state.modalType} close={this.hideModule} />}
        <div className="wrapper row p-0 m-0">
          <Sidebar showModule={this.showModule} loadingTables={this.state.loadingTables} dbName={this.state.dbName} tables={this.state.tables} handleTableClick={this.handleTableClick} />
          <Content loadingItems={this.state.loadingItems} tableItems={this.state.tableItems} />
        </div>
      </div>
    )
  }
}

export default Database;
