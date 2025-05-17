import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatsBox from "../components/StatsBox";
import "../styles/Dashboard.css";
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.svg";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Quick Panel</h2>

     
<div className="stats-container">
  {/* first box fades in at 0.5s, so start count at 0.5 */}
  <StatsBox title="Available Gateways" value={3} delay={0.5} />
  {/* second box: 0.5s fade too (identical), but you can offset if you like */}
  <StatsBox title="Available VPS"      value={5} delay={0.5} />
</div>


        <div className="cards-container">
          <Link to="/ManageGateway" className="dashboard-card yellow">
             <div className="icon">
             <img src={logo1} alt="Manage Clients" className="dashboard-icon" />
             </div>
            <h3>Manage Gateways</h3> 
            <strong>View available gateways, link them to VPS, and monitor status.</strong>
          </Link>

          <Link to="/ManageClients" className="dashboard-card red">
  <div className="icon">
    <img src={logo2} alt="Manage Clients" className="dashboard-icon" />
  </div>
  <h3>Manage Clients</h3>
  <strong>Create, update, or remove client accounts and configurations.</strong>
</Link>


          <Link to="/ConsultVps" className="dashboard-card blue">
             <div className="icon">
            <img src={logo3} alt="Manage Clients" className="dashboard-icon" />
            </div>
            <h3>Consult VPS Instances</h3>
            <strong>Browse VPS, ensure they are ready for linking, and monitor performance.</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;