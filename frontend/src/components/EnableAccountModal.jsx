import React from 'react';

const EnableAccountModal = ({ onClose, onConfirm, client }) => {
  if (!client) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>You are going to enable <strong>{client.name}</strong></p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="logout-btn" onClick={onConfirm}>Enable</button>
        </div>
      </div>
    </div>
  );
};

export default EnableAccountModal;
