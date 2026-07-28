"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  server_not_configured: "Admin login isn't configured on this server yet.",
  invalid_credentials: "Incorrect username or password.",
  missing_fields: "Enter both a username and password.",
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES[data.error] || "Login failed");
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F3F6F9",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "14px",
          border: "1px solid #E1E7EC",
          boxShadow: "0 12px 32px -16px rgba(11,15,20,0.18)",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: "28px" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#0094DA", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>
            ध
          </div>
          <h1 style={{ fontSize: "20px", textAlign: "center", color: "#14181D", margin: 0, fontWeight: 600 }}>
            Admin Portal
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "#14181D" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
              style={{
                width: "100%",
                padding: "11px 12px",
                border: "1px solid #E1E7EC",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: 600, color: "#14181D" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "11px 12px",
                border: "1px solid #E1E7EC",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{ marginBottom: "18px", padding: "11px 14px", background: "#FDEEEE", border: "1px solid #F5C6C6", borderRadius: "8px", color: "#B23A3A", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#9AA3AC" : "#0094DA",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14.5px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
