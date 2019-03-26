import React, { Component } from "react";
import './Sidebar.css';
class Sidebar extends Component {

  render() {
    return (
      <nav id="sidebar" className="position-fixed col-xl-2 col-lg-3">
        {this.props.loadingTables === 0 &&

          <div id="db-container">
            <div id="db-title">
              <h5 className="p-0 m-0">{this.props.dbName}</h5>
              <i onClick={() => this.props.showModal("CREATE_TABLE")} data-toggle="tooltip" data-placement="bottom" title="Create Table" className="far fa-plus-square"></i>
            </div>

            <div id="db-tables">
              <ul id="db-tables-ul">
                {this.props.tables.map(table => (
                  <li onClick={(e) => { this.props.handleTableClick(e, table) }} key={table}>{table}</li>
                ))}
              </ul>
            </div>
          </div>
        }

        {this.props.loadingTables === 1 &&
          <div className="center max">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className="pt-3">Loading Sidebar...</p>
          </div>
        }
      </nav>
    )
  }
}

export default Sidebar;
