import React from "react";
import "../styles/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ client, onDelete, onCancel }) => {
  if (!client) return null;

  return (
    <div className="dc-modal-overlay">
      <div className="dc-modal-content">
        <h2 className="dc-modal-title">
          You are going to Delete <strong className="dc-client-name">{client.name}</strong> Account
        </h2>
        <div className="dc-modal-actions">
          <button className="dc-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="dc-delete-btn" onClick={() => onDelete(client.id)}>
            <i className="fa fa-trash dc-trash-icon"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;