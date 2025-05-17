// src/components/StatsBox.jsx
import React from "react";
import CountUp from "react-countup";
import "../styles/StatsBox.css";

const StatsBox = ({ title, value, delay = 0 }) => (
  <div className="stat-box">
    <h4>{title}</h4>
    <span className="stat-number">
      <CountUp
        start={0}
        end={Number(value)}
        duration={5}
        delay={delay}         // ← new
        separator=","
      />
    </span>
  </div>
);

export default StatsBox;
