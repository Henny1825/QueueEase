import { useState } from "react";
import Queueease from "../assets/Queueease.png"
import "../styles/ManagerSignupForm.css"

export default function ManagerSignupForm({ onSignupSuccess, onLoginClick }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email or phone number is required");
      return false;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

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
        setSuccess("Account created successfully. Redirecting to login...");
        
        // Clear form
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        // Redirect after 2 seconds
        setTimeout(() => {
          onSignupSuccess();
        }, 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* LEFT SECTION - IMAGE */}
        <div className="signup-left">
          <img src={Queueease} alt="QueueEase" />
        </div>

        {/* RIGHT SECTION - FORM */}
        <div className="signup-right">
          <h1 style={styles.heading}>Create an Account</h1>
          <p style={styles.subtitle}>Sign up to join your organization</p>

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

            {/* Phone Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                placeholder="+233 XX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {/* Password Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Enter Password</label>
              <div style={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? "+" : "|"}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.passwordBox}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? "+" : "|"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div style={styles.errorMessage}>{error}</div>}

            {/* Success Message */}
            {success && <div style={styles.successMessage}>{success}</div>}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div style={styles.loginLink}>
              <p style={{ margin: 0, marginBottom: 8 }}>
                Already have an account?
              </p>
              <button
                type="button"
                onClick={onLoginClick}
                style={styles.loginButton}
              >
                Back to Login
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
  heading: {
    color: "#1d2433",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },

  input: {
    width: "100%",
    height: "48px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0 15px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  },

  passwordBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  passwordInput: {
    width: "100%",
    height: "48px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0 15px",
    paddingRight: "45px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  },

  eyeIcon: {
    position: "absolute",
    right: "15px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
  },

  errorMessage: {
    background: "#ffe0e0",
    color: "#d32f2f",
    padding: "10px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    marginBottom: "15px",
    border: "1px solid #ffcdd2",
  },

  successMessage: {
    background: "#e0f7e0",
    color: "#2e7d32",
    padding: "10px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    marginBottom: "15px",
    border: "1px solid #c8e6c9",
  },

  button: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "6px",
    background: "#3ab3a5",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  },

  loginLink: {
    textAlign: "center",
    marginTop: "20px",
  },

  loginButton: {
    background: "none",
    border: "none",
    textDecoration: "none",
    color: "#333",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
  },
};