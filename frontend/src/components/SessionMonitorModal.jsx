import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/SessionMonitorModal.css";

const SessionMonitorModal = ({ client, onClose }) => {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/clients/${client.id}/logs`);
        console.log("Received logs from backend:", response.data);
        setLogs(response.data); // Set the fetched logs
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    if (client?.id) {
      fetchLogs();
    }
  }, [client]);

  // Render the sessions inside the modal
  const renderSessions = () => {
    if (!logs) return <p>Loading...</p>;

    return (
      <div className="sessions-list">
        <h3>Sessions for {logs.client} ({logs.username})</h3>
        <ul>
          {logs.sessions.map((session, index) => (
            <li key={index} className="session-item">
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!client) return null;

  return (
    <div className="session-monitor-overlay">
      <div className="session-monitor-content">
        <h2 className="session-monitor-title">Monitoring <strong className="session-monitor-client-name">{client.name}</strong> Account Session</h2>
        {renderSessions()}
        <button className="session-monitor-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SessionMonitorModal;
