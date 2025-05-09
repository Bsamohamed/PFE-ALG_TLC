import React, { useState } from "react";
import AssignCard from "./AssignCard";  // <- import it!

const AssignVPSModal = ({ gateway, onClose }) => {
  const [selectedVps, setSelectedVps] = useState(null);

  const availableVPS = [
    { id: 1, name: "VPS 03", server: "Server 01", assigned: false },
    { id: 2, name: "VPS 06", server: "Server 01", assigned: true },
    { id: 3, name: "VPS 07", server: "Server 01", assigned: false },
    { id: 4, name: "VPS 10", server: "Server 02", assigned: false },
  ];

  const handleAssignClick = (vps) => {
    setSelectedVps(vps);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Assign New VPS to {gateway.name}</h2>
        <table>
          <thead>
            <tr>
              <th>VPS Name</th>
              <th>Server</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableVPS.map((vps) => (
              <tr key={vps.id}>
                <td>{vps.name}</td>
                <td>{vps.server}</td>
                <td>
                  {vps.assigned ? (
                    <span className="assigned">✅ Assigned</span>
                  ) : (
                    <button onClick={() => handleAssignClick(vps)}>
                      🔗 Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={onClose}>Close</button>
      </div>

      {selectedVps && (
        <AssignCard
          vps={selectedVps}
          onClose={() => setSelectedVps(null)}
        />
      )}
    </div>
  );
};

export default AssignVPSModal;
