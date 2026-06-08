import React, { useState } from "react";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://queue-ease-apis.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Login Successful");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="/Frame 630266468_071020.png"
          alt="QueueEase"
        />
      </div>

      <div className="right-section">
        <h1>Welcome Back</h1>
        <p>Sign in to your admin account</p>

        <form id="loginForm" onSubmit={handleSubmit}>
          <label>Email Address or Phone Number</label>

          <input
            type="text"
            placeholder="admin@queueease.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <i
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={togglePassword}
            ></i>
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="/">Forgot Password?</a>
          </div>

          <button type="submit">
            Login
          </button>

          <div className="create-account">
            <a href="/register">
              Create an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;