"use client";

export default function AdminProjects() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🏗️ Manage Projects</h1>

      <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <p style={{ color: "#666", marginBottom: "20px" }}>Project management interface coming soon...</p>

        <div style={{ background: "#f0f4ff", padding: "20px", borderRadius: "8px", border: "1px solid #d0deff" }}>
          <h3 style={{ color: "#333", marginBottom: "12px" }}>📋 Features</h3>
          <ul style={{ color: "#666", fontSize: "14px", lineHeight: "1.8" }}>
            <li>✅ View all projects from your districts</li>
            <li>✅ Add new project proposals</li>
            <li>✅ Edit project status and details</li>
            <li>✅ Track project progress</li>
            <li>✅ Categorize by district and sector</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
