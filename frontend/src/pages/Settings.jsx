import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../styles/Settings.css";

const Settings = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("+1 GMT");

  return (
    <div className="settings-container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Settings Content */}
      <div className="settings-content">
        <h2 className="settings-title">Setting Panel</h2>

        {/* System Section */}
        <div className="settings-section">
          <h3>System</h3>
          <div className="settings-card">
            <div className="settings-option">
              <span>Choose default language</span>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="settings-option">
              <span>Define Time zone</span>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option>+1 GMT</option>
                <option>+2 GMT</option>
                <option>+3 GMT</option>
              </select>
            </div>
          </div>
        </div>

        {/* Backup and System Recovery Section */}
        <div className="settings-section">
          <h3>Backup and System Recovery</h3>
          <div className="settings-card">
            <div className="settings-option">
              <span>Download Actual Site Configuration</span>
            </div>
            <div className="settings-option reset">
              <span className="reset-text">Reset Site</span>
              <small>(This Will delete All clients Accounts and Actual Configuration)</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
