import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatsBox from "../components/StatsBox";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Quick Panel</h2>

        <div className="stats-container">
          <StatsBox title="Available Gateways" value="05" />
          <StatsBox title="Ready VPS" value="13" />
          <StatsBox title="Active Clients" value="08" />
        </div>

        <div className="cards-container">
          <Link to="/ManageGateway" className="dashboard-card yellow">
            <div className="icon">🟡</div>
            <h3>Manage Gateways</h3>
            <p>View available gateways, link them to VPS, and monitor status.</p>
          </Link>

          <Link to="/ManageClients" className="dashboard-card red">
            <div className="icon">🔴</div>
            <h3>Manage Clients</h3>
            <p>Create, update, or remove client accounts and configurations.</p>
          </Link>

          <Link to="/ConsultVps" className="dashboard-card blue">
            <div className="icon">🔵</div>
            <h3>Consult VPS Instances</h3>
            <p>Browse VPS, ensure they are ready for linking, and monitor performance.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;