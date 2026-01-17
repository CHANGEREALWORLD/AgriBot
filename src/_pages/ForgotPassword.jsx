import { useState } from "react";
import Layout from "../layout/Layout";

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const btnStyle = {
  width: "100%",
  padding: 12,
  marginTop: 16,
  background: "#3a8f45",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 15,
  cursor: "pointer",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setError("");
    setMessage("Password reset link sent to your email (demo)");
  }

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div
          style={{
            width: 420,
            padding: 24,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            {error && (
              <div style={{ color: "#b00020", marginBottom: 8 }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{ color: "#2e7d32", marginBottom: 8 }}>
                {message}
              </div>
            )}

            <button type="submit" style={btnStyle}>
              Send Reset Link
            </button>
          </form>

          <p style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}>
            Remembered your password? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
