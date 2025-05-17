import React from 'react';
import '../styles/EnableAccountModal.css';

const EnableAccountModal = ({ onClose, onConfirm, client }) => {
  if (!client) return null;

  return (
    <div className="enable-modal-overlay">
      <div className="enable-modal-content">
        <p className="enable-modal-text">
          You are going to enable <strong className="enable-modal-client-name">{client.name}</strong>
        </p>
        <div className="enable-modal-actions">
          <button className="enable-modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="enable-modal-confirm-btn" onClick={onConfirm}>
            Enable
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnableAccountModal;