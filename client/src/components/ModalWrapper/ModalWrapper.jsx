import React, { Component } from "react";
import './ModalWrapper.css'
import ModalCreateTable from "../ModalCreateTable";
import ModalDeleteRow from "../ModalDeleteRow";
import ModalDeleteTable from '../ModalDeleteTable';
import axios from 'axios'
import ModalCreateRow from "../ModalCreateRow/ModalCreateRow";

// this file is kind of a mess
class ModalWrapper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // error, out, and loading are for ModalWrapper (this component)

            // out is for animating the modal. 0 is for the modal rendering, and 1 is for the modal exiting.
            // this is use to determine classNames to fadeIn or fadeOut for example
            out: 0,

            // error 0 means no error, 1 means input error (e.g. empty field), 2 means server error
            error: 0,

            // loading spinner for feedback. 1 will show the spinner
            loading: 0,

            // tableName, rows, and rowValues is for ModalCreateTable
            tableName: '',
            rows: 1,
            rowValues: [{ itemName: '', dataTypePretty: '', dataType: '' }],

            // createRowValues and tableFields is for ModalCreateRow
            createRowValues: [],
            tableFields: []
        }
    }

    handleSubmit = () => {
        this.setState({ error: 0, loading: 1 });
        // each modal type has their own different submit procedure
        switch (this.props.type) {
            case "CREATE_TABLE":
                // validation. Doesn't really work, having issues because it's not asynchronous.
                // also return does nothing so.
                if (this.state.tableName === '') {
                    this.setState({ error: 1, loading: 0 });
                    return;
                }
                // more validation
                this.state.rowValues.forEach(element => {
                    if (element.itemName === '' || element.dataTypePretty === '') {
                        this.setState({ error: 1, loading: 0 });
                        return;
                    }
                });

                // attempt at validation
                if (this.state.error === 0) {

                    // do the thing
                    axios.post('/api/table', {
                        tableName: this.state.tableName,
                        rows: this.state.rowValues
                    }).then(res => {
                        this.setState({ error: 0, loading: 0 })
                        this.props.refresh("table");

                        this.props.close()
                    }).catch(err => {
                        console.log(err);
                        this.setState({ loading: 0, error: 2 });
                        return;
                    })
                }
                break;
            // it's all basically self explanitory past this :)
            case "CREATE_ROW":
                // validation
                this.state.createRowValues.forEach(element => {
                    if (element === "") {
                        console.log('invalid found')
                        this.setState({ error: 1, loading: 0 });
                    }
                });
                if (this.state.error === 0) {
                    axios.post('/api/row', {
                        data: {
                            input: this.state.createRowValues,
                            fields: this.state.tableFields,
                            name: this.props.data[0]
                        }
                    }).then(res => {
                        this.setState({ loading: 0 })
                        this.props.refresh("rows");
                        this.props.close()

                    }).catch(err => {
                        console.log(err)
                        this.setState({ loading: 0, error: 2 });
                    })
                }
                break;

            case "DELETE_ROW":
                axios.delete('/api/row', {
                    data: {
                        rowIndex: this.props.data[0],
                        tableName: this.props.data[1]
                    }
                }).then(res => {
                    this.setState({ loading: 0 })
                    this.props.refresh("rows");
                    this.props.close()

                }).catch(err => {
                    console.log(err)
                    this.setState({ loading: 0, error: 2 });
                })
                break;
            case "DELETE_TABLE":
                axios.delete('/api/table', {
                    data: {
                        tableName: this.props.data[1]
                    }
                }).then(res => {
                    this.setState({ loading: 0, tableName: '' })
                    this.props.refresh("all");
                    this.props.close()

                }).catch(err => {
                    console.log(err)
                    this.setState({ loading: 0, error: 2 });
                })
                break;
            default:
                return;
        }
    }

    // Functions for ModalCreateTable

    handleTableDropdownClick = (e, index, notPretty) => {
        let array = [...this.state.rowValues];
        array[index].dataTypePretty = e.target.innerHTML;
        array[index].dataType = notPretty;
        this.setState({ rowValues: array });
    }

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

    // Functions for ModalCreateRow

    handleCreateRowChange = (e, index) => {
        let array = [...this.state.createRowValues];
        array[index] = e.target.value;
        this.setState({ createRowValues: array });

    }

    loadCreateRows = (res) => {
        this.setState({ tableFields: res });
        this.setState({ createRowValues: Array(this.state.tableFields.length - 1).fill('') })
        return;
    }

    // ModalWrapper functions

    handleClickClose = (e) => {
        this.setState({ out: 1 });
        setTimeout(() => {
            this.props.close();
        }, 400);
    }

    // this is for closing the modal when the user clicks the background div, but not the content inside of said div
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

    // this is for limiting input on certain fields. a little bit of
    // protection against SQL Injection or errors.
    // kind of hacky
    safeInput(s) {
        if (s.match(/(?!.*[.\-_]{2,})^[a-zA-Z0-9.\-_]{0,128}$/gm) === null) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div style={{ display: "block" }} onClick={(e) => {
                this.handleBackgroundClick(e)
            }} className={
                // for managing animations
                this.state.out === 0 ?
                    "modal animated fadeIn faster disable-select" :
                    "modal animated fadeOut faster disable-select"
            } tabIndex="-1" role="dialog" >
                <div className={
                    // for managing animations
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
                        {/* these are for choosing which modal body to render */}
                        {this.props.type === "CREATE_TABLE" &&
                            <ModalCreateTable handleTableDropdownClick={this.handleTableDropdownClick} handleTableNameChange={this.handleTableNameChange} handleTableRowChange={this.handleTableRowChange} addCreateTable={this.addCreateTable}
                                tableName={this.state.tableName}
                                rows={this.state.rows}
                                rowValues={this.state.rowValues} />}

                        {this.props.type === "CREATE_ROW" &&
                            <ModalCreateRow loadCreateRows={this.loadCreateRows} tableFields={this.state.tableFields} data={this.props.data} createRowValues={this.state.createRowValues} handleCreateRowChange={this.handleCreateRowChange} />
                        }

                        {this.props.type === "DELETE_ROW" &&
                            <ModalDeleteRow />
                        }

                        {this.props.type === "DELETE_TABLE" &&
                            <ModalDeleteTable />
                        }


                        {/* error handling at its finest */}
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
