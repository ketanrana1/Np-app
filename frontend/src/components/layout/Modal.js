import React from 'react'

const Modal = (props) => {
    const { deleteHandler } = props;
  return (
    <div className="modal fade" id="delete-confirmation-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-confirmation-modal" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body mt-3">
            <h5>Are you sure you want to delete?</h5>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={deleteHandler}>Delete</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal