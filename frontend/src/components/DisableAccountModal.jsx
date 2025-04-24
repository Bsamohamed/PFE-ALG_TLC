import React from 'react';

const DisableAccountModal = ({ onClose, onConfirm, client }) => {
  if (!client) return null; // Ensure it doesn't render without a client

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>You are going to disable <strong>{client.name}</strong></p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="logout-btn" onClick={onConfirm}>Disable</button>
        </div>
      </div>
    </div>
  );
};

export default DisableAccountModal;

