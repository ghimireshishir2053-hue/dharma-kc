"use client";

export default function AdminNews() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>📰 Manage News</h1>

      <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <p style={{ color: "#666", marginBottom: "20px" }}>News management interface coming soon...</p>

        <div style={{ background: "#fffbf0", padding: "20px", borderRadius: "8px", border: "1px solid #ffead0" }}>
          <h3 style={{ color: "#333", marginBottom: "12px" }}>📰 Features</h3>
          <ul style={{ color: "#666", fontSize: "14px", lineHeight: "1.8" }}>
            <li>✅ Publish and manage news articles</li>
            <li>✅ Add featured images and thumbnails</li>
            <li>✅ Schedule articles for publishing</li>
            <li>✅ Categorize by news type (Press, Speech, Updates)</li>
            <li>✅ Multi-language support (Nepali & English)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
