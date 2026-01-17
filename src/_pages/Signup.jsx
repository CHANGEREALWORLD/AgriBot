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

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.agree) {
      setError("You must accept terms");
      return;
    }

    setError("");

    // ✅ STEP 3 — SAVE USER (THIS IS THE IMPORTANT PART)
    const userData = {
      name: form.name,
      email: form.email,
      provider: "email",
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // optional token placeholder
    localStorage.setItem("token", "demo-token");

    // redirect
    window.location.href = "/";
  }

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div
          style={{
            width: 420,
            padding: 24,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 6 }}>
            Create Account
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
            Join AgriBot to get started
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={{ fontSize: 14 }}>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />{" "}
              I agree to Terms & Conditions
            </label>

            {error && (
              <div style={{ color: "#b00020", marginTop: 10 }}>
                {error}
              </div>
            )}

            <button style={btnStyle} type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
