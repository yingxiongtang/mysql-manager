import React, { Component } from "react";
import axios from 'axios';
import './Database.css';
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
      dbName: ""
    };

    this.handleTableClick = this.handleTableClick.bind(this);
  }

  handleTableClick = (e, key) => {
    this.setState({ loadingItems: 1 });
    axios.post("/view/table", {
      data: key
    }).then(res => {
      console.log(res)
      this.setState({loadingItems:0,tableItems:res.data});
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

  render() {
    return (
      <div className="wrapper row p-0 m-0">

        <nav id="sidebar" className="col-xl-2 col-lg-3">
          {this.state.loadingTables === 0 &&

            < div id="db-container">
              <div id="db-title">
                <h5 className="p-0 m-0">{this.state.dbName}</h5>
                <i data-toggle="tooltip" data-placement="bottom" title="Create Table" className="far fa-plus-square"></i>
              </div>

              <div id="db-tables">
                <ul id="db-tables-ul">
                  {this.state.tables.map(table => (
                    <li onClick={(e) => { this.handleTableClick(e, table) }} key={table}>{table}</li>
                  ))}
                </ul>
              </div>
            </div>
          }

          {this.state.loadingTables === 1 &&
            <div className="center max">
              <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <p className="pt-3">Loading database...</p>
            </div>
          }
        </nav>

        <div id="content" className="col-xl-10 col-lg-9">

          {this.state.loadingItems === 2 && <p className="text-center pt-3">Select a table in the sidebar.</p>}
          {this.state.loadingItems === 1 &&
            <div className="center max p-0 m-0  ">
              <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <p className="pt-3">Loading table items...</p>
            </div>
          }
          {this.state.loadingItems === 0 &&
            <table className="table table-striped">
              <thead>
                <tr>
                  {Object.keys(this.state.tableItems[0]).map(item => (
                    <th scope="col">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr> */}
              </tbody>
            </table>

          }
        </div>
      </div>
    )
  }
}

export default Database;
