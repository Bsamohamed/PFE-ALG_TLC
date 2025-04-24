import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";  
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageGateway from "./pages/ManageGateway";
import ManageClients from "./pages/ManageClients";
import ConsultVPS from "./pages/ConsultVPS";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/ManageGateway" element={<ManageGateway />} />
        <Route path="/ManageClients" element={<ManageClients />} />
        <Route path="/ConsultVps" element={<ConsultVPS />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
