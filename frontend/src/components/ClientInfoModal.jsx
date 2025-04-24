import React from "react";
import { FaEnvelope, FaUser, FaLock, FaCalendarAlt, FaEye } from "react-icons/fa";
import "../styles/ClientInfoModal.css";

const ClientInfoModal = ({ client, onClose }) => {
  if (!client) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          <b>{client.name}</b> Client Informations
        </h3>
        
        <div className="input-group">
          <span># {client.id}</span>
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="text" value={client.email} readOnly />
        </div>

        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" value={client.name} readOnly />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" value="**********" readOnly />
          <FaEye className="icon eye-icon" />
        </div>

        <div className="date-container">
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input type="text" value={client.startDate} readOnly />
          </div>
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input type="text" value={client.endDate} readOnly />
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClientInfoModal;
