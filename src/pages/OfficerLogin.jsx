import { useState } from "react";
import Queueease from "../assets/Queueease.png"
import "../styles/OfficerLoginForm.css"

export default function OfficerLoginForm({ onLoginSuccess, onSignupClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        // Save token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Save remember me preference
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        }

        // Redirect to dashboard via callback
        onLoginSuccess();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* LEFT SECTION - IMAGE */}
        <div style={styles.leftSection}>
          <img
            src={Queueease}
            alt="QueueEase"
            style={styles.heroImage}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* RIGHT SECTION - FORM */}
        <div style={styles.rightSection}>
          <h1 style={styles.heading}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your admin account</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address or Phone Number</label>
              <input
                type="text"
                placeholder="admin@queueease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {/* Password Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="loginPassword"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  style={styles.eyeIcon}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={styles.options}>
              <label style={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember Me
              </label>
              <a href="#" style={styles.forgotLink}>
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && <div style={styles.errorMessage}>{error}</div>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Create Account */}
            <div style={styles.createAccount}>
              <p style={{ margin: 0, marginBottom: 8 }}>
                Don't have an account?{" "}
              </p>
              <button
                type="button"
                onClick={onSignupClick}
                style={styles.signupLink}
              >
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  heading: { color: "#1d2433", fontSize: "28px", fontWeight: "700", marginBottom: "10px" },
  subtitle: { color: "#666", fontSize: "14px", marginBottom: "25px" },
  form: { display: "flex", flexDirection: "column", gap: "0" },
  fieldGroup: { display: "flex", flexDirection: "column", marginBottom: "18px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" },
  input: { width: "100%", height: "48px", border: "1px solid #ddd", borderRadius: "6px", padding: "0 15px", fontSize: "14px", fontFamily: "inherit", outline: "none", transition: "border-color 0.2s" },
  passwordBox: { position: "relative", display: "flex", alignItems: "center" },
  passwordInput: { width: "100%", height: "48px", border: "1px solid #ddd", borderRadius: "6px", padding: "0 15px", paddingRight: "45px", fontSize: "14px", fontFamily: "inherit", outline: "none" },
  eyeIcon: { position: "absolute", right: "15px", background: "none", border: "none", cursor: "pointer", fontSize: "18px", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" },
  options: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", fontSize: "14px" },
  rememberLabel: { display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontWeight: "500" },
  checkbox: { cursor: "pointer", width: "16px", height: "16px" },
  forgotLink: { textDecoration: "none", color: "#3ab3a5", fontWeight: "500", cursor: "pointer" },
  errorMessage: { background: "#ffe0e0", color: "#d32f2f", padding: "10px 12px", borderRadius: "6px", fontSize: "13px", marginBottom: "15px", border: "1px solid #ffcdd2" },
  button: { width: "100%", height: "50px", border: "none", borderRadius: "6px", background: "#3ab3a5", color: "white", cursor: "pointer", fontSize: "16px", fontWeight: "600", transition: "background-color 0.2s" },
  createAccount: { textAlign: "center", marginTop: "20px" },
  signupLink: { background: "none", border: "none", textDecoration: "none", color: "#333", fontWeight: "600", cursor: "pointer", fontSize: "14px", padding: "0" },
};