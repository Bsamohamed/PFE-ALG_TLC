import React from "react";

const StatsBox = ({ title, value }) => {
  return (
    <div className="stat-box">
      <strong>{title}</strong>
      <span className="stat-number">{value}</span>
    </div>
  );
};

export default StatsBox;
