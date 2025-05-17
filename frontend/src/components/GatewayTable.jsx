// src/components/GatewayTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GatewayTable = () => {
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/gateways")
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.gateways || [];
        setGateways(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des gateways :", err);
        setError("Erreur de chargement");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error)   return <p>{error}</p>;

  const filteredGateways = gateways.filter((gw) => {
    const text = filterText.toLowerCase();
    return (
      gw.id.toString().includes(text) ||
      gw.name.toLowerCase().includes(text) ||
      gw.ip.toLowerCase().includes(text) ||
      gw.status.toString().toLowerCase().includes(text)
    );
  });

  return (
    <div className="mgw-table-container">
      <h2 className="mgw-content__subtitle">Liste des Gateways</h2>

      <input
        type="text"
        className="mgw-filter"
        placeholder="Rechercher par ID, nom, IP ou statut"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <table className="mgw-table">
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
            filteredGateways.map((gw) => {
              // normalize once
              const statusNormalized = gw.status?.toString().trim().toLowerCase();
              const isOnline = statusNormalized === "online";
              return (
                <tr key={gw.id}>
                  <td><button className="mgw-link">#{gw.id}</button></td>
                  <td>{gw.name}</td>
                  <td>{gw.ip}</td>
                  <td>
                    <span
                      className={`mgw-status ${
                        isOnline
                          ? "mgw-status--online"
                          : "mgw-status--offline"
                      }`}
                    >
                      {gw.status}
                    </span>
                  </td>
                </tr>
              );
            })
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
