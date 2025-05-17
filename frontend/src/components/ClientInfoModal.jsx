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
        
        <div className="info-group">
          <span className="client-id">#{client.id}</span>
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="text" value={client.email} readOnly aria-label="Email" />
        </div>

        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" value={client.name} readOnly aria-label="Client Name" />
        </div>

        <div className="input-group password-group">
          <FaLock className="icon" />
          <input type="password" value="**********" readOnly aria-label="Password" />
        </div>

        <div className="date-container">
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input type="text" value={client.startDate} readOnly aria-label="Start Date" />
          </div>
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input type="text" value={client.endDate} readOnly aria-label="End Date" />
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ClientInfoModal;