import React, { Component } from "react";
import './ModalWrapper.css'
import ModalCreateTable from "../ModalCreateTable";
import ModalDeleteRow from "../ModalDeleteRow";
import ModalDeleteTable from '../ModalDeleteTable';
import axios from 'axios'
import ModalCreateRow from "../ModalCreateRow/ModalCreateRow";
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
            rowValues: [{ itemName: '', dataTypePretty: '', dataType: '' }],
            tableFields: [],
            createRowValues: []
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

            case "CREATE_ROW":
                this.state.createRowValues.forEach(element => {
                    if (element === ""){
                        console.log('invalid found')
                        this.setState({error:1, loading:0});
                    }
                });
                if (this.state.error === 0) {
                    axios.post('/api/row', {
                        data: {
                            input: this.state.createRowValues,
                            fields: this.state.tableFields,
                            name:this.props.data[0]
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

    // Row functions

    handleCreateRowChange = (e, index) => {
        let array = [...this.state.createRowValues];
        array[index] = e.target.value;
        this.setState({ createRowValues: array });
        
    }

    loadCreateRows = (res) => {
        this.setState({ tableFields: res });
        this.setState({ createRowValues: Array(this.state.tableFields.length - 1).fill('')})
        return;
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

                        {this.props.type === "CREATE_ROW" &&
                            <ModalCreateRow loadCreateRows={this.loadCreateRows} tableFields={this.state.tableFields} data={this.props.data} inputValues={this.state.createRowValues} handleCreateRowChange={this.handleCreateRowChange} />
                        }

                        {this.props.type === "DELETE_ROW" &&
                            <ModalDeleteRow />
                        }

                        {this.props.type === "DELETE_TABLE" &&
                            <ModalDeleteTable />
                        }


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
