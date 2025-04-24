import React from "react";
import "../styles/login.css";

const Button = ({ text,onClick }) => {
  return <button className="login-button" onClick={onClick}>{text}</button>;
};

export default Button;
