"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";

type VideoRow = {
  id: string;
  refId: string;
  titleNe: string;
  titleEn: string;
  platform: string;
  url: string;
  youtubeId: string | null;
  dateNe: string;
  dateEn: string;
};

const emptyForm = { titleNe: "", titleEn: "", platform: "YouTube", url: "", youtubeId: "", dateNe: "", dateEn: "" };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px", border: "1px solid #ddd",
  borderRadius: "6px", fontSize: "14px", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  };
}

function VideosContent() {
  const [rows, setRows] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/videos", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData(emptyForm);
    setEditingRefId(null);
    setError(null);
    setEditing(true);
  };

  const handleEdit = (row: VideoRow) => {
    setFormData({
      titleNe: row.titleNe, titleEn: row.titleEn, platform: row.platform,
      url: row.url, youtubeId: row.youtubeId ?? "", dateNe: row.dateNe, dateEn: row.dateEn,
    });
    setEditingRefId(row.refId);
    setError(null);
    setEditing(true);
  };

  const handleSave = async () => {
    setError(null);
    try {
      const res = await fetch("/admin/api/videos", {
        method: editingRefId ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(editingRefId ? { ...formData, refId: editingRefId } : formData),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setEditing(false);
        load();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Save failed");
      }
    } catch (err) {
      console.error("Error saving video:", err);
      setError("Save failed");
    }
  };

  const handleDelete = async (refId: string) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      const res = await fetch(`/admin/api/videos?refId=${encodeURIComponent(refId)}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) load();
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>🎬 Manage Videos ({rows.length})</h1>
        <button onClick={handleAddNew} style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
          ➕ Add Video
        </button>
      </div>

      <div style={{ marginBottom: "20px", padding: "14px 16px", background: "#f0f4ff", border: "1px solid #d0deff", borderRadius: "6px", color: "#333", fontSize: "13px" }}>
        Only videos entered here appear in the public Videos section. For a YouTube clip, paste just the video ID
        (the part after <code>v=</code> in the URL) to get an automatic thumbnail and inline playback.
      </div>

      {saved && (
        <div style={{ marginBottom: "20px", padding: "16px", background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: "6px", color: "#155724" }}>
          ✅ Video saved successfully!
        </div>
      )}

      {!editing ? (
        <div style={{ display: "grid", gap: "15px" }}>
          {rows.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              No videos yet. <button onClick={handleAddNew} style={{ color: "#27ae60", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Add one now</button>
            </div>
          ) : (
            rows.map((row) => (
              <div key={row.refId} style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #eee", display: "grid", gridTemplateColumns: "1fr auto", gap: "20px", alignItems: "start" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
                    <strong>{row.platform}</strong> · {row.dateEn}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "#333" }}>{row.titleEn}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{row.titleNe}</div>
                  {row.youtubeId && <div style={{ fontSize: "11px", color: "#aaa", marginTop: "8px" }}>▶ youtube.com/watch?v={row.youtubeId}</div>}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleEdit(row)} style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" }}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(row.refId)} style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>
            {editingRefId ? `✏️ Edit Video (${editingRefId})` : "➕ Add Video"}
          </h2>

          {error && (
            <div style={{ marginBottom: "20px", padding: "12px 16px", background: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: "6px", color: "#721c24", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <Field label="Title (English)">
                <input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} placeholder="e.g. Hard Talk: campaigning in Lamjung" style={inputStyle} />
              </Field>
              <Field label="Title (Nepali)">
                <input value={formData.titleNe} onChange={(e) => setFormData({ ...formData, titleNe: e.target.value })} style={inputStyle} />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <Field label="Platform">
                <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} style={inputStyle}>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </Field>
              <Field label="Source / show name">
                <input value={formData.dateEn} onChange={(e) => setFormData({ ...formData, dateEn: e.target.value, dateNe: e.target.value })} placeholder="e.g. Nepal Lead" style={inputStyle} />
              </Field>
            </div>

            <Field label="YouTube video ID (leave blank if not on YouTube)">
              <input value={formData.youtubeId} onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })} placeholder="e.g. QKMwiizLdAY" style={inputStyle} />
            </Field>

            <Field label="Full watch URL">
              <input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." style={inputStyle} />
            </Field>
          </div>

          <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
            <button onClick={handleSave} style={{ padding: "12px 24px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
              💾 Save
            </button>
            <button onClick={() => setEditing(false)} style={{ padding: "12px 24px", background: "#95a5a6", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminVideos() {
  return (
    <ProtectedAdminLayout>
      <VideosContent />
    </ProtectedAdminLayout>
  );
}
