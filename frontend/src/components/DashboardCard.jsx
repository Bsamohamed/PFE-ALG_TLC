import React from "react";

const DashboardCard = ({ icon, title, description, color }) => {
  return (
    <div className="dashboard-card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default DashboardCard;
