import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './Sidebar.css';
class Sidebar extends Component {

  logOut = () => {
    // in the future this needs to remove the 'connection' cookie so the user is actually logged out, not just redirected
    window.location.href('/')
  }

  componentDidMount = () => {
    this.props.loadTables();
  }

  render() {
    return (
      <nav id="sidebar" className="disable-select position-fixed col-xl-2 col-lg-3">
        {this.props.loadingTables === 0 &&

          <div id="db-container">
            <div id="db-title">
              <h5 className="p-0 m-0 dbName">{this.props.dbName}</h5>
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

        {/* loadingggg */}
        {this.props.loadingTables === 1 &&
          <div className="center max">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className="pt-3">Loading Sidebar...</p>
          </div>
        }
        
        <Link to="/" className="btn btn-outline-secondary sidebar-logout">disconnect</Link>
      </nav>
    )
  }
}

export default Sidebar;
