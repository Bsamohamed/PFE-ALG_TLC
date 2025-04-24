import React, { useState } from "react";
import "../styles/SetDataLimitModal.css";
import { clientService } from "../services/api";

const SetDataLimitModal = ({ client, onClose }) => {
  const [limitType, setLimitType] = useState("Session");
  const [usageLimit, setUsageLimit] = useState("");
  const [unit, setUnit] = useState("GB");
  const [message, setMessage] = useState("");

  const handleSetLimit = async () => {
    if (!usageLimit || usageLimit <= 0) {
      setMessage("Veuillez entrer une limite valide.");
      return;
    }

    try {
      const limitString = `${usageLimit} ${unit} per ${limitType}`;
      await clientService.setDataLimit(client.id, limitString);
      setMessage("✅ Limite de données mise à jour !");
      setTimeout(onClose, 1500); // Ferme le modal après un petit délai
    } catch (err) {
      setMessage("❌ Échec de la mise à jour de la limite.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Définir une limite pour {client.name}</h2>
        <hr />

        <div className="form-group">
          <label>Appliquer la limite par</label>
          <select value={limitType} onChange={(e) => setLimitType(e.target.value)}>
            <option value="Session">Session</option>
            <option value="Day">Jour</option>
            <option value="Month">Mois</option>
          </select>
        </div>

        <div className="form-group">
          <label>Valeur de la limite</label>
          <div className="input-group">
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              placeholder="Entrer la limite"
            />
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="MB">MB</option>
              <option value="GB">GB</option>
              <option value="TB">TB</option>
            </select>
          </div>
        </div>

        {message && <div className="message">{message}</div>}

        <button className="set-btn" onClick={handleSetLimit}>Définir</button>
        <button className="close-btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default SetDataLimitModal;
