"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Places", count: 8, icon: "📍", href: "/admin/places" },
    { label: "Projects", count: "12+", icon: "🏗️", href: "/admin/projects" },
    { label: "News Articles", count: "15+", icon: "📰", href: "/admin/news" },
    { label: "Events", count: "8+", icon: "📅", href: "/admin/events" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px", color: "#2c3e50" }}>Dashboard</h1>
        <p style={{ color: "#666", fontSize: "16px" }}>Welcome to the Lamjung Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{stat.icon}</div>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "#2c3e50", marginBottom: "4px" }}>{stat.count}</div>
              <div style={{ fontSize: "14px", color: "#666" }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "#2c3e50" }}>Quick Actions</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          <Link href="/admin/places" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "16px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2980b9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3498db")}
            >
              ➕ Add Place
            </button>
          </Link>

          <Link href="/admin/projects" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "16px",
                background: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#229954")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#27ae60")}
            >
              ➕ Add Project
            </button>
          </Link>

          <Link href="/admin/news" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "16px",
                background: "#e67e22",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#d35400")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#e67e22")}
            >
              ➕ Add News
            </button>
          </Link>

          <Link href="/admin/events" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "16px",
                background: "#9b59b6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8e44ad")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#9b59b6")}
            >
              ➕ Add Event
            </button>
          </Link>
        </div>
      </div>

      {/* Info Box */}
      <div style={{ background: "#e8f4f8", padding: "20px", borderRadius: "12px", marginTop: "20px", borderLeft: "4px solid #3498db" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "8px" }}>ℹ️ About This Admin Portal</h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.6" }}>
          This admin panel allows you to manage all content on the Lamjung district portal. You can add, edit, and delete places, projects, news articles, and events. All changes are stored and reflected on the main website.
        </p>
      </div>
    </div>
  );
}
