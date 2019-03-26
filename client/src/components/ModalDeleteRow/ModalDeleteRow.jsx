import React, { Component } from "react";
import './ModalDeleteRow.css'

class ModalDeleteRow extends Component {
    render() {
        return (
                <div className="modal-body">
                    <p>Are you sure you want to delete this row?</p>
                </div>
        )
    }
}

export default ModalDeleteRow;
