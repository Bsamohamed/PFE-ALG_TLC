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
    console.log("Login button clicked!");
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
        // Store token & redirect to Admin Dashboard
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
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Algerie Telecom" className="logo" />
        <h2 className="title">Admin Login Page</h2>
        <p className="subtitle">Enter your credentials to access the admin panel</p>

        <InputField type="email" placeholder="Email" icon="📧" value={email} onChange={setEmail} />
        <InputField type="text" placeholder="Username" icon="👤" value={username} onChange={setUsername} />
        <InputField type="password" placeholder="Password" icon="🔒" showPasswordToggle value={password} onChange={setPassword} />

        {error && <p className="error-message">{error}</p>}

        <Button text="Sign In" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
