import { useState } from "react";

export default function OfficerLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://queue-ease-apis.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLoginSuccess();
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-up" style={{ maxWidth: 400, margin: "60px auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 800 }}>
          Staff Login
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>
          Sign in to manage queues.
        </p>
      </div>

      <form className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }} onSubmit={handleLogin}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="officer@example.com"
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div style={{ color: "var(--rose)", fontSize: 12 }}>{error}</div>}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}