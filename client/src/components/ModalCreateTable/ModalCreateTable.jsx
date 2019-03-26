import React, { Component } from "react";
import './ModalCreateTable.css'

import { data } from '../../dataTypes'

class ModalCreateTable extends Component {
    render() {
        return (
                <div className="modal-body">
                    <form id="CREATE_TABLE" action="">
                        <label htmlFor="tableName">Table Name</label>
                        <input type="text" className="form-control" id="tableName" placeholder="Enter table name" value={this.props.tableName} onChange={(e) => this.props.handleTableNameChange(e)}></input>
                        <div className="tableItemLabel my-3">
                            <label className="p-0 m-0">Table Items</label>
                            <i onClick={() => this.props.addCreateTable()} data-toggle="tooltip" data-placement="bottom" title="Add Item" className="far fa-plus-square"></i>
                        </div>
                        {this.props.rowValues.map(stateItem => (
                            <div key={this.props.rowValues.indexOf(stateItem)} className="input-group mb-2">
                                <input type="text" className="form-control mr-1" placeholder="Name" value={this.props.rowValues[this.props.rowValues.indexOf(stateItem)].itemName} onChange={(e) => this.props.handleTableRowChange(e, this.props.rowValues.indexOf(stateItem))} required></input>

                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{stateItem.dataTypePretty === '' ? "Data Type" : stateItem.dataTypePretty}</button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">

                                        {Object.keys(data).map(jsonDataGroup => {
                                            return (
                                                <div key={Object.keys(data).indexOf(jsonDataGroup)}>
                                                    <h6 className="dropdown-header">{jsonDataGroup}</h6>
                                                    {data[jsonDataGroup].map(jsonDataType => (
                                                        <button onClick={(e) => { this.props.handleTableDropdownClick(e, this.props.rowValues.indexOf(stateItem), jsonDataType[2]) }} key={jsonDataType[1]} className="dropdown-item" type="button">{jsonDataType[0]}</button>
                                                    ))}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
        )
    }
}

export default ModalCreateTable;
