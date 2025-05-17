import React from 'react';
import '../styles/DisableAccountModal.css';

const DisableAccountModal = ({ onClose, onConfirm, client }) => {
  if (!client) return null;

  return (
    <div className="disable-modal-overlay">
      <div className="disable-modal-content">
        <p className="disable-modal-text">
          You are going to disable <strong className="disable-modal-client-name">{client.name}</strong>
        </p>
        <div className="disable-modal-actions">
          <button className="disable-modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="disable-modal-confirm-btn" onClick={onConfirm}>
            Disable
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisableAccountModal;