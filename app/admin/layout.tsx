"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f5f5f5", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#2c3e50", color: "white", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "30px" }}>🔧 Admin</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/admin/dashboard"
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "background 0.2s",
            }}
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/places"
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
          >
            📍 Places & Attractions
          </Link>

          <Link
            href="/admin/projects"
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
          >
            🏗️ Projects
          </Link>

          <Link
            href="/admin/news"
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
          >
            📰 News
          </Link>

          <Link
            href="/admin/events"
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
          >
            📅 Events
          </Link>

          <hr style={{ margin: "20px 0", borderColor: "rgba(255,255,255,0.2)" }} />

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>{children}</div>
    </div>
  );
}
