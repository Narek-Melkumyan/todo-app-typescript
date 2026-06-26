
type Props ={
    close (): void
    confirmDelete (): void
}


function Modal({close,confirmDelete}: Props) {
    return (
        <div className="modal-overlay show" id="deleteModal">
            <div className="confirm-modal">
                <h3>Delete task?</h3>
                <p>This action cannot be undone.</p>

                <div className="modal-actions">
                    <button className="cancel-btn" id="cancelDeleteBtn" onClick={close}>
                        Cancel
                    </button>
                    <button className="delete-btn" id="confirmDeleteBtn" onClick={confirmDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;