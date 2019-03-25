import React, { Component } from "react";
import './ModalWrapper.css'
import ModalCreateTable from "../ModalCreateTable";

class ModalWrapper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            out: 0
        }
    }


    handleClick = (e) => {
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
                                this.handleClick(e)
                            }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalCreateTable />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save changes</button>
                            <button onClick={(e) => {
                                this.handleClick(e)
                            }} type="button" className="btn btn-secondary" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default ModalWrapper;
