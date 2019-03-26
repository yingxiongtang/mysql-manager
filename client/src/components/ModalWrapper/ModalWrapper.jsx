import React, { Component } from "react";
import './ModalWrapper.css'
import ModalCreateTable from "../ModalCreateTable";
import axios from 'axios'
// import { data } from '../../dataTypes'

class ModalWrapper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            out: 0,
            error: 0,
            loading: 0,
            tableName: '',
            rows: 1,
            rowValues: [{ itemName: '', dataTypePretty: '', dataType: '' }]
        }
    }

    handleSubmit = () => {
        this.setState({ error: 0, loading: 1 });
        switch (this.props.type) {
            case "CREATE_TABLE":

                if (this.state.tableName === '') {
                    this.setState({ error: 1, loading: 0 });
                    return;
                }

                this.state.rowValues.forEach(element => {
                    if (element.itemName === '' || element.dataTypePretty === '') {
                        this.setState({ error: 1, loading: 0 });
                        return;
                    }
                });

                if (this.state.error === 0) {

                    axios.post('/api/table', {
                        tableName: this.state.tableName,
                        rows: this.state.rowValues
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                        return;
                    })
                }
                break;
            default:
                return;
        }
    }

    handleClickClose = (e) => {
        this.setState({ out: 1 });
        setTimeout(() => {
            this.props.close();
        }, 400);
    }

    handleBackgroundClick = (e) => {
        if (e.target !== e.currentTarget) {
            return;
        } else {
            this.setState({ out: 1 });
            setTimeout(() => {
                this.props.close();
            }, 400);
        }
    }

    safeInput(s) {
        if (s.match(/(?!.*[.\-_]{2,})^[a-zA-Z0-9.\-_]{0,128}$/gm) === null) {
            return false;
        } else {
            return true;
        }
    }

    // Create Table functions

    addCreateTable = () => {
        let newRow = [...this.state.rowValues];
        newRow.push({ itemName: '', dataTypePretty: '', dataType: '' });
        this.setState({ rowValues: newRow });
    }

    handleTableNameChange = (e) => {
        if (this.safeInput(e.target.value)) {
            this.setState({ tableName: e.target.value })
        } else {
            return;
        }
    }

    handleTableRowChange = (e, index) => {
        if (this.safeInput(e.target.value)) {
            let array = [...this.state.rowValues]
            array[index].itemName = e.target.value;
            this.setState({ rowValues: array });
        } else {
            return;
        }
    }

    handleTableDropdownClick = (e, index, notPretty) => {
        let array = [...this.state.rowValues];
        array[index].dataTypePretty = e.target.innerHTML;
        array[index].dataType = notPretty;
        this.setState({ rowValues: array });
    }

    render() {
        return (
            <div style={{ display: "block" }} onClick={(e) => {
                this.handleBackgroundClick(e)
            }} className={
                this.state.out === 0 ?
                    "modal animated fadeIn faster" :
                    "modal animated fadeOut faster"
            } tabIndex="-1" role="dialog" >
                <div className={
                    this.state.out === 0 ?
                        "modal-dialog animated fadeInDown faster" :
                        "modal-dialog animated fadeOutUp faster"
                } role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button onClick={(e) => {
                                this.handleClickClose(e)
                            }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {this.props.type === "CREATE_TABLE" &&
                            <ModalCreateTable handleTableDropdownClick={this.handleTableDropdownClick} handleTableNameChange={this.handleTableNameChange} handleTableRowChange={this.handleTableRowChange} addCreateTable={this.addCreateTable}
                                tableName={this.state.tableName}
                                rows={this.state.rows}
                                rowValues={this.state.rowValues} />}

                        {this.state.error === 1 &&
                            <div><p className="text-danger center text-center">All fields are required to be filled.</p></div>
                        }
                        {this.state.error === 2 &&
                            <div><p className="text-danger center text-center">Submission failed. Check your browser console for details.</p></div>
                        }
                        <div className="modal-footer">
                            {this.state.loading === 1 &&
                                <div className="lds-dual-ring"></div>
                            }
                            <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Save changes</button>
                            <button onClick={(e) => {
                                this.handleClickClose(e)
                            }} type="button" className="btn btn-secondary" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default ModalWrapper;
