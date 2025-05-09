import React from "react";
import Sidebar from "../components/Sidebar";
import GatewayTable from "../components/GatewayTable";
import "../styles/Gateway.css";

const ManageGateway = () => {
  return (
    <div className="manage-gateway-container">
      <Sidebar />
      <div className="gateway-content">
        <h1>Manage Gateway</h1>
        <GatewayTable />
      </div>
    </div>
  );
};

export default ManageGateway;
