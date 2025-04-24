import React from "react";
import Sidebar from "../components/Sidebar";
import GatewayTable from "../components/GatewayTable";
import "../styles/Gateway.css";

const ManageGateway = () => {
  return (
    <div className="manage-gateway-container">
      <Sidebar />
      <div className="gateway-content">
        <h2>Manage Gateway</h2>
        <label>Gateway</label>
        <input type="text" placeholder="Enter Gateway ID" className="gateway-input" />
        <GatewayTable />
      </div>
    </div>
  );
};

export default ManageGateway;
