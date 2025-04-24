import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../styles/ConsultVPS.css";

const vpsData = [
  { id: 1, name: "VPS 01", status: "Ready", server: "Server 01", assignment: "Not Assigned" },
  { id: 2, name: "VPS 02", status: "Linked", server: "Server 01", assignment: "Gateway 01" },
  { id: 3, name: "VPS 03", status: "Linked", server: "Server 01", assignment: "Gateway 04" },
  { id: 4, name: "VPS 04", status: "Linked", server: "Server 01", assignment: "Gateway 04" },
  { id: 5, name: "VPS 05", status: "Ready", server: "Server 01", assignment: "Not Assigned" },
  { id: 6, name: "VPS 06", status: "Ready", server: "Server 01", assignment: "Not Assigned" },
  { id: 7, name: "VPS 07", status: "Linked", server: "Server 01", assignment: "Gateway 05" },
  { id: 8, name: "VPS 08", status: "Linked", server: "Server 01", assignment: "Gateway 02" },
];

const ConsultVPS = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVPS = vpsData.filter((vps) =>
    vps.id.toString().includes(searchTerm)
  );

  return (
    <div className="layout">
      {/* Sidebar toujours à gauche */}
      <Sidebar />

      {/* Contenu à droite */}
      <div className="consult-vps-content">
        <h2>Consult VPS</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter VPS ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="vps-table">
          <thead>
            <tr>
              <th>VPS ID</th>
              <th>VPS Name</th>
              <th>Status</th>
              <th>Server</th>
              <th>Assignment</th>
            </tr>
          </thead>
          <tbody>
            {filteredVPS.map((vps) => (
              <tr key={vps.id}>
                <td>
                  <a href={`/vps/${vps.id}`} className="vps-link">
                    #{vps.id}
                  </a>
                </td>
                <td>{vps.name}</td>
                <td>
                  <span className={vps.status === "Ready" ? "status-ready" : "status-linked"}>
                    {vps.status}
                  </span>
                </td>
                <td>{vps.server}</td>
                <td>{vps.assignment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ConsultVPS;
