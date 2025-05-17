import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Notifications.css";
import { FaTrash, FaExclamationTriangle, FaEye } from "react-icons/fa";
import { clientService } from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const detailsPanelRef = useRef(null); // Reference for details panel

  const fetchAnomalies = async () => {
    try {
      const response = await clientService.getAnomalies();
      const anomalies = response.data.anomalies;

      if (!Array.isArray(anomalies)) {
        console.error("Format de réponse inattendu :", response.data);
        return;
      }

      const formatted = anomalies.map((item, index) => ({
        ...item,
        id: item.radacctid || index + 1,
        time: new Date(item.acctstarttime).toLocaleTimeString(),
        message: "Anomalie détectée de",
        highlight: item.username || item.nasipaddress || "Inconnu",
        icon: <FaExclamationTriangle className="warning-icon-pulse" />,
      }));

      setNotifications(formatted);
    } catch (err) {
      console.error("Erreur récupération anomalies :", err);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnomalies();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const handleSelect = (notification) => {
    setSelectedNotification(notification);
  };

  const handleClickOutside = (event) => {
    if (detailsPanelRef.current && !detailsPanelRef.current.contains(event.target)) {
      setSelectedNotification(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="notifications-container">
      <Sidebar />

      <div className="notifications-content">
        <h2 className="notifications-title">Notification</h2>

        <div className="notifications-section">
          <h3>Aujourd’hui</h3>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-card">
                <span className="notification-time">{notification.time}</span>
                <span className="notification-message">
                  {notification.icon} {notification.message}{" "}
                  <strong className="notification-highlight">{notification.highlight}</strong>
                </span>

                <div className="notification-actions">
                  <span
                    className="notification-icon"
                    title="Afficher les détails"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(notification);
                    }}
                  >
                    <FaEye />
                  </span>

                  <span
                    className="notification-icon notification-icon-delete"
                    title="Supprimer"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <FaTrash />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-notification">Aucune anomalie détectée aujourd’hui.</p>
          )}
        </div>
      </div>

      {/* Détails de l’anomalie sélectionnée */}
      {selectedNotification && (
        <div ref={detailsPanelRef} className="notification-details-panel">
          <div className="details-header">
            <h3>Détails de l’anomalie</h3>
          </div>
          <div className="details-content">
            {Object.entries(selectedNotification).map(([key, value]) => (
              <div key={key} className="detail-row">
                <strong>{key}</strong>: <span>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
