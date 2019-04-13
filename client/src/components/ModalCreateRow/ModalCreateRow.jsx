import React, { Component } from "react";
import axios from 'axios'
import './ModalCreateRow.css'

class ModalCreateRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableFields: [],
            createRowValues: [],
            loading: 1
        }
    }

    showColumns = () => {
        axios.get('/api/columnNames', {
            params: {
                name: this.props.data[0]
            }
        }).then(res => {
            this.props.loadCreateRows(res.data);
            this.setState({loading:0})
        }).catch(err => {
            return err;
        })
    }

    componentDidMount() {
        this.showColumns();
    }

    render() {
        return (
            <div className="modal-body">
                {this.state.loading === 1 &&
                    <div className="lds-dual-ring"></div>
                }
                {this.state.loading === 0 &&
                    <form className="px-3" id="CREATE_ROW" action="">
                        {this.props.tableFields.map(stateField => (
                            <div key={stateField[0]} className="row mb-2">
                                <p className="input-p col-3 m-0 pl-2">{stateField[0]}</p>
                                <input type="text" className="form-control col-9" placeholder={stateField[1]} value={this.props.createRowValues[this.props.tableFields.indexOf(stateField)]} onChange={(e) => this.props.handleCreateRowChange(e, this.props.tableFields.indexOf(stateField))} required></input>
                            </div>
                        ))}
                        
                    </form>
                }
            </div>
        )
    }
}

export default ModalCreateRow;
