import React from "react";
import Sidebar from "../components/Sidebar";
import GatewayTable from "../components/GatewayTable";
import "../styles/Gateway.css";

const ManageGateway = () => {
  return (
    <div className="mgw-container">
      <Sidebar />
      <div className="mgw-content">
        <h1 className="mgw-content__title">Manage Gateway</h1>
        <GatewayTable />
      </div>
    </div>
  );
};

export default ManageGateway;
