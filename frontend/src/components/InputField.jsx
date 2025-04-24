import React from "react";
import "../styles/login.css";

const InputField = ({ type, placeholder, icon, showPasswordToggle, value, onChange }) => {
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div className="input-container">
      <span className="icon">{icon}</span>
      <input
        type={showPasswordToggle ? (isPasswordVisible ? "text" : "password") : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showPasswordToggle && (
        <span className="toggle-password" onClick={() => setPasswordVisible(!isPasswordVisible)}>
          👁
        </span>
      )}
    </div>
  );
};

export default InputField;
