import React, { createContext, useContext, useState, useEffect } from "react";
import { clientService } from "../services/api";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Récupération des anomalies
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
      }));

      setNotifications(formatted);
      setNotificationCount(formatted.length);
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

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
