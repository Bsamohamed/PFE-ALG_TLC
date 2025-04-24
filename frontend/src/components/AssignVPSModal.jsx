const AssignVPSModal = ({ gateway, onClose }) => {
    const availableVPS = [
      { name: "VPS 03", server: "Server 01", assigned: false },
      { name: "VPS 06", server: "Server 01", assigned: true },
      { name: "VPS 07", server: "Server 01", assigned: false },
      { name: "VPS 10", server: "Server 02", assigned: false },
    ];
  
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
              {availableVPS.map((vps, index) => (
                <tr key={index}>
                  <td>{vps.name}</td>
                  <td>{vps.server}</td>
                  <td>
                    {vps.assigned ? (
                      <span className="assigned">✅ Assigned</span>
                    ) : (
                      <button className="assign-btn">🔗 Assign</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default AssignVPSModal;
  