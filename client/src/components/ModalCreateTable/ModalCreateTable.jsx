import React, { Component } from "react";
import './ModalCreateTable.css'

import { data } from '../../dataTypes'

class ModalCreateTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // This is for how many table item rows there are
            rows: 1,
            rowValues: [{ itemName: '', dataType: null }]
        }
    }

    componentDidMount() {
        console.log(data)
    }

    render() {
        return (
            <div className="modal-body">
                <form action="">
                    <label htmlFor="tableName">Table Name</label>
                    <input type="text" className="form-control" id="tableName" placeholder="Enter table name"></input>
                    <div className="tableItemLabel">
                        <label className="pt-3">Table Items</label>
                        <i onClick={() => this.props.showModule("CREATE_TABLE")} data-toggle="tooltip" data-placement="bottom" title="Add Item" className="far fa-plus-square"></i>
                    </div>
                    {this.state.rowValues.map(item => (
                        <div key={this.state.rowValues.indexOf(item)} className="input-group">
                            <input type="text" className="form-control mr-1" placeholder="Name"></input>

                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{item.dataType === null ? "Data Type" : item.dataType}</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">

                                    {Object.keys(data).map(item => {
                                        return (
                                            <div>
                                                <h6 key={Object.keys(data).indexOf(item)} className="dropdown-header">{item}</h6>
                                                {data[item].map(dataType => (
                                                    <button key={dataType[1]} className="dropdown-item" type="button">{dataType[0]}</button>
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
