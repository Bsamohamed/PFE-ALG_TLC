const DeleteConfirmationModal = ({ client, onDelete, onCancel }) => {
    if (!client) return null; // Only show when a client is selected
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>
            You are going to Delete <strong>{client.name}</strong> Account
          </h2>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button className="delete-btn" onClick={() => onDelete(client.id)}>
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;
  