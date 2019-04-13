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
      // tables holds the list of table names in the database
      tables: [],
      // table items holds the rows in the table selected
      tableItems: [],
      // tableName holds the name of the table currently selected
      tableName: '',
      // dbName holds the name of the database connected to
      dbName: "",
      // if modal is 1, that shows the modal. 0 hides it
      modal: 0,
      // data that needs to be passed in to the modal
      modalData: ''
    };
  }

  // this refreshs certain parts of the page to update rows, tables, etc.
  refresh = (type) => {
    switch (type) {
      case "table":
        this.loadTables();
        break;
      case "rows":
        this.loadRows(this.state.tableName);
        break;
      case "all":
        // this puts the app back in the default state of no table selected, so rows don't have to be reloaded
        this.refresh("table");
        this.setState({ loadingItems: 2 });
        break;
      default:
        console.log("refresh(): no type specified");
        break;
    }
  }

  // loadTables updates the sidebar, and loadRows updates the Content table
  loadTables = () => {
    axios.get("/api/viewTables").then(res => {
      let tableArr = [];
      // res.data[0] (first table) [Object.keys(res.data[0]) <-- referring to first table object
      // this line gets the value of the first key in object specified
      // this foreach loop makes an array full of table names to rerender the sidebar with
      res.data[0].forEach(object => {
        tableArr.push(object[Object.keys(object)[0]]);
      });                                                                        // can't explain this. you just gotta trust it
      this.setState({ tables: tableArr, loadingTables: 0, dbName: res.data[1][0][Object.keys(res.data[1][0])[0]] });
    }).catch(err => {
      // no
      console.log("internal server error " + err);
    })
  }

  loadRows = (key) => {
    // I don't know why this is a post request. 
    // sometimes when you have long coding session you just do stupid things sometimes.
    // will probably fix
    axios.post("/api/viewRows", {
      data: key
    }).then(res => {
      console.log(res)
      this.setState({ loadingItems: 0, tableItems: res.data });
    }).catch(err => { console.log(err) })
  }

  // sends modal type, shows module, and sends data (e.g. array with table name and other goodies)
  showModal = (type, data) => {
    this.setState({ modalType: type, modal: 1, modalData: data });
  }

  // resets modal type, hides modal
  hideModal = () => {
    this.setState({ modalType: null, modal: 0 });
  }

  // Used in Sidebar
  handleTableClick = (e, key) => {
    this.setState({ loadingItems: 1, tableName: key });
    this.loadRows(key);
  }

  render() {
    return (
      <div className="container-fluid m-0 p-0">
        {this.state.modal === 1 && <ModalConductor refresh={this.refresh} type={this.state.modalType} data={[this.state.modalData, this.state.tableName]} close={this.hideModal} />}
        <div className="wrapper row p-0 m-0">
          <Sidebar loadTables={this.loadTables} showModal={this.showModal} loadingTables={this.state.loadingTables} dbName={this.state.dbName} tables={this.state.tables} handleTableClick={this.handleTableClick} />
          <Content loadingItems={this.state.loadingItems} selectedTable={this.state.tableName} tableItems={this.state.tableItems} showModal={this.showModal} />
        </div>
      </div>
    )
  }
}

export default Database;
