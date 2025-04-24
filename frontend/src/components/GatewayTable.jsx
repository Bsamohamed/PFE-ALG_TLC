import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import "../styles/Gateway.css"; // décommenter si tu utilises un fichier CSS

const Modal = ({ title, headers, rows, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div ref={modalRef} className="modal-content" onClick={(e) => e.stopPropagation()}>
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
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const menuRef = useRef(null);

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

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenuId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const vpsRows = [
    {
      cells: ["VPS 03", "Server 01"],
      actionText: "Assign",
      onClick: () => console.log("Assign VPS 03"),
    },
  ];

  const clientRows = [
    {
      cells: ["Ooredoo", "🔴 Offline"],
      actionText: "Assign",
      onClick: () => console.log("Assign to Ooredoo"),
    },
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="gateway-table">
      <table>
        <thead>
          <tr>
            <th>Gateway ID</th>
            <th>Gateway Name</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Assigned VPS</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gateways.map((gateway) => (
            <tr key={gateway.id}>
              <td>
                <button className="link-button">#{gateway.id}</button>
              </td>
              <td>{gateway.name}</td>
              <td>{gateway.ip}</td>
              <td className={gateway.status === "Available" ? "available" : "in-use"}>
                {gateway.status}
              </td>
              <td>
                <button disabled className="vps-status">
                  {gateway.vps && gateway.vps.length > 0 ? gateway.vps.join(", ") : "No VPS"}
                </button>
              </td>
              <td className="actions">
                <button
                  aria-label="Actions"
                  className="menu-trigger"
                  onClick={() => setOpenMenuId(openMenuId === gateway.id ? null : gateway.id)}
                >
                  ⋮
                </button>
                {openMenuId === gateway.id && (
                  <div ref={menuRef} className="action-menu">
                    <button onClick={() => {
                      setSelectedGateway(gateway);
                      setOpenModal("VPS");
                      setOpenMenuId(null);
                    }}>
                      Link to a New VPS
                    </button>
                    <button onClick={() => {
                      setSelectedGateway(gateway);
                      setOpenModal("Client");
                      setOpenMenuId(null);
                    }}>
                      Assign to a New User
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal === "VPS" && selectedGateway && (
        <Modal
          title={`Assign New VPS to ${selectedGateway.name}`}
          headers={["VPS Name", "Server", "Action"]}
          rows={vpsRows}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === "Client" && selectedGateway && (
        <Modal
          title={`Assign ${selectedGateway.name} to Client`}
          headers={["Client Name", "Status", "Action"]}
          rows={clientRows}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default GatewayTable;
