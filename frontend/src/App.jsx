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
        <Route path="/ManageGateway" element={<ProtectedRoute><ManageGateway /></ProtectedRoute>} />
        <Route path="/ManageClients" element={<ProtectedRoute><ManageClients /></ProtectedRoute>} />
        <Route path="/ConsultVps" element={<ProtectedRoute><ConsultVPS /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
