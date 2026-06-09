import { useState } from "react";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://queue-ease-apis.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("queueease_token", data.token);
        }

        alert("Registration Successful!");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="/Frame 630266468_071020.png"
          alt="QueueEase Illustration"
        />
      </div>

      <div className="right-section">
        <h1>Welcome to QueueEase</h1>
        <p>Create an account</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@queueease.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="08123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Enter Password</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <i
              className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <label>Confirm Password</label>

          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <i
              className={`fa-solid ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              } toggle-password`}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            ></i>
          </div>

          <button type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;