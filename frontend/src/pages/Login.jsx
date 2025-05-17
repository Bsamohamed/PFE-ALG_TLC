import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import logo from "../assets/logo.svg";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error, please try again later");
    }
  };

  return (
    <div className="login-wrapper">
      <video autoPlay muted loop playsInline className="login-video">
        <source src="/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-main-container">
        <div className="login-card-box">
          <img src={logo} alt="Algerie Telecom" className="login-logo" />
          <h2 className="login-title">Admin Login Page</h2>
          <p className="login-subtitle">Enter your credentials to access the admin panel</p>

          <InputField
            type="email"
            placeholder="Email"
          
            value={email}
            onChange={setEmail}
          />
          <InputField
            type="text"
            placeholder="Username"
            
            value={username}
            onChange={setUsername}
          />
          <InputField
            type="password"
            placeholder="Password"
            
            
            value={password}
            onChange={setPassword}
          />

          {error && <p className="login-error-message">{error}</p>}

          <Button text="Sign In" onClick={handleLogin} className="login-button-submit" />
        </div>
      </div>
    </div>
  );
};

export default Login;
