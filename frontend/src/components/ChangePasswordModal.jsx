import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/ChangePasswordModal.css";

const ChangePasswordModal = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = (field) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Password change failed.");
      } else {
        setSuccess("Password changed successfully!");
        setTimeout(() => onClose(), 2000);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Change Account Password</h3>
        <hr />

        {/* Current Password */}
        <div className="modal-input-group">
          <label>Current Password</label>
          <div className="modal-input">
            <input
              type={visible.current ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span onClick={() => toggleVisibility("current")}>
              {visible.current ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className="modal-input-group">
          <label>New Password</label>
          <div className="modal-input">
            <input
              type={visible.new ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span onClick={() => toggleVisibility("new")}>
              {visible.new ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="modal-input-group">
          <label>Confirm Password</label>
          <div className="modal-input">
            <input
              type={visible.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={() => toggleVisibility("confirm")}>
              {visible.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="change-button" onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

