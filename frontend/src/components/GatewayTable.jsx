import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Modal = ({ title, headers, rows, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
                <td>
                  <button className="link-button" onClick={row.onClick}>
                    {row.actionText}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      cells: PropTypes.arrayOf(PropTypes.node).isRequired,
      actionText: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

const GatewayTable = () => {
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/gateways")
      .then((response) => {
        setGateways(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des gateways :", err);
        setError("Erreur de chargement");
        setLoading(false);
      });
  }, []);

  const filteredGateways = gateways.filter((gateway) => {
    const text = filterText.toLowerCase();
    return (
      gateway.id.toString().includes(text) ||
      gateway.name.toLowerCase().includes(text) ||
      gateway.ip.toLowerCase().includes(text) ||
      gateway.status.toLowerCase().includes(text)
    );
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="gateway-table">
      <h2>Liste des Gateways</h2>

      <input
        type="text"
        placeholder="Rechercher par ID, nom, IP ou statut"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "320px" }}
      />

      <table>
        <thead>
          <tr>
            <th>Gateway ID</th>
            <th>Gateway Name</th>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredGateways.length > 0 ? (
            filteredGateways.map((gateway) => (
              <tr key={gateway.id}>
                <td>
                  <button className="link-button">#{gateway.id}</button>
                </td>
                <td>{gateway.name}</td>
                <td>{gateway.ip}</td>
                <td className={gateway.status === "Available" ? "available" : "in-use"}>
                  {gateway.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun résultat trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GatewayTable;
