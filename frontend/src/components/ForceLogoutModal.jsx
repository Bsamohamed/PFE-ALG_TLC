import React from "react";
import "../styles/ForceLogoutModal.css"; // Create this CSS file for styling

const ForceLogoutModal = ({ client, onClose }) => {
  const handleForceLogout = () => {
    console.log(`Forcing logout for ${client.name}`);
    alert(`${client.name} has been logged out.`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Force Logout</h2>
        <p>Are you sure you want to log out {client.name}?</p>
        <div className="button-group">
          <button className="logout-btn" onClick={handleForceLogout}>
            Force Logout
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForceLogoutModal;
