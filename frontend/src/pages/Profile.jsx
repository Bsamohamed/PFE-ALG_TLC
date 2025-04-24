import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChangePasswordModal from "../components/ChangePasswordModal";
import "../styles/Profile.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

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

  if (!admin) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <Sidebar />

      <div className="profile-content">
        <h2 className="profile-title">Profile</h2>

        <div className="profile-wrapper">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">😊</div>
              <div className="profile-info">
                <h3>{admin.name || "Admin"}</h3>
                <p>Administrator</p>
              </div>
            </div>

            <div className="profile-details">
              {/* Username */}
              <div className="profile-field">
                <FaUser className="profile-icon" />
                <span className="profile-label">Username</span>
                <span className="profile-value">{admin.username}</span>
              </div>

              {/* Email */}
              <div className="profile-field">
                <FaEnvelope className="profile-icon" />
                <span className="profile-label">Email</span>
                <span className="profile-value">{admin.email}</span>
              </div>

              {/* Password */}
              <div className="profile-field">
                <FaLock className="profile-icon" />
                <span className="profile-label">Password</span>
                <span className="profile-value">
                  {showPassword ? "********" : "********"}
                </span>
                <span className="profile-action" onClick={() => setModalOpen(true)}>
                  Change Password
                </span>
                <span className="profile-icon toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <ChangePasswordModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          username={admin.username}
        />
      </div>
    </div>
  );
};

export default Profile;
