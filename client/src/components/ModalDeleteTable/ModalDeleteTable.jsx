import React, { Component } from "react";

class ModalDeleteTable extends Component {
    render() {
        return (
                <div className="modal-body">
                    <p>Are you sure you want to delete this table?</p>
                    <p className="text-danger">This is not reversible.</p>
                </div>
        )
    }
}

export default ModalDeleteTable;
