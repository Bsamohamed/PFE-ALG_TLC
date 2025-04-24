import React, { useState } from "react";
import { FaEnvelope, FaUser, FaLock, FaCalendarAlt } from "react-icons/fa";
import "../styles/EditClientModal.css";

const EditClientModal = ({ client, onSave, onClose }) => {
  const [editedClient, setEditedClient] = useState(client);

  const handleChange = (e) => {
    setEditedClient({ ...editedClient, [e.target.name]: e.target.value });
  };

  // Cette fonction appelle onSave puis onClose pour fermer la modal
  const handleSave = () => {
    onSave(editedClient);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit <b>{client.name}</b> Client Informations</h3>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            value={editedClient.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            value={editedClient.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" value="**********" readOnly />
        </div>

        <div className="date-container">
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input
              type="date"
              name="startDate"
              value={editedClient.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input
              type="date"
              name="endDate"
              value={editedClient.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditClientModal;
