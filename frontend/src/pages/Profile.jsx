import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChangePasswordModal from "../components/ChangePasswordModal";
import "../styles/Profile.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setAdmin(data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdmin();
  }, []);

  if (!admin) return (
    <div className="loader-container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );

  return (
    <div className="profile-container">
      <Sidebar />

      <motion.div
        className="profile-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2 
          className="profile-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Profile
        </motion.h2>

        <motion.div
          className="profile-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div 
            className="profile-header"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="profile-avatar"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280 }}
            >
              {admin.name?.[0]?.toUpperCase() || "A"}
            </motion.div>
            <div className="profile-info">
              <motion.h3
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                {admin.name || "Admin"}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Administrator
              </motion.p>
            </div>
          </motion.div>

          <div className="profile-details">
            {[['Username', admin.username, FaUser], 
             ['Email', admin.email, FaEnvelope]].map(([label, value, Icon], index) => (
              <motion.div
                key={label}
                className="profile-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Icon className="profile-icon" />
                <span className="profile-label">{label}</span>
                <span className="profile-value">{value}</span>
              </motion.div>
            ))}

            <motion.div
              className="profile-field"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <FaLock className="profile-icon" />
              <span className="profile-label">Password</span>
              <span className="profile-value">
                {showPassword ? "********" : "********"}
              </span>
              <motion.span
                className="profile-action"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Change Password
              </motion.span>
              <motion.span
                className="toggle-password"
                onClick={togglePasswordVisibility}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
               
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {modalOpen && (
            <ChangePasswordModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              username={admin.username}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Profile;