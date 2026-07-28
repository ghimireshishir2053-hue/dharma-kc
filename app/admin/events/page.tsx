"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { EVENT_KINDS } from "@/content/eventKinds";

type EventRow = {
  id: string;
  refId: string;
  date: string;
  titleNe: string;
  titleEn: string;
  timeNe: string;
  timeEn: string;
  locNe: string;
  locEn: string;
  kind: string;
};

const emptyForm = { date: "", titleNe: "", titleEn: "", timeNe: "", timeEn: "", locNe: "", locEn: "", kind: "" };

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

function EventsContent() {
  const [rows, setRows] = useState<EventRow[]>([]);
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
      const res = await fetch("/admin/api/events", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading events:", err);
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

  const handleEdit = (row: EventRow) => {
    setFormData({
      date: row.date, titleNe: row.titleNe, titleEn: row.titleEn,
      timeNe: row.timeNe, timeEn: row.timeEn, locNe: row.locNe, locEn: row.locEn, kind: row.kind,
    });
    setEditingRefId(row.refId);
    setError(null);
    setEditing(true);
  };

  const handleSave = async () => {
    setError(null);
    try {
      const res = await fetch("/admin/api/events", {
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
      console.error("Error saving event:", err);
      setError("Save failed");
    }
  };

  const handleDelete = async (refId: string) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await fetch(`/admin/api/events?refId=${encodeURIComponent(refId)}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) load();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>📅 Manage Events ({rows.length})</h1>
        <button onClick={handleAddNew} style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
          ➕ Add Event
        </button>
      </div>

      <div style={{ marginBottom: "20px", padding: "14px 16px", background: "#f0f4ff", border: "1px solid #d0deff", borderRadius: "6px", color: "#333", fontSize: "13px" }}>
        Only events entered here appear on the public program calendar — nothing is shown until you add it.
      </div>

      {saved && (
        <div style={{ marginBottom: "20px", padding: "16px", background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: "6px", color: "#155724" }}>
          ✅ Event saved successfully!
        </div>
      )}

      {!editing ? (
        <div style={{ display: "grid", gap: "15px" }}>
          {rows.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              No events yet. <button onClick={handleAddNew} style={{ color: "#27ae60", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Add one now</button>
            </div>
          ) : (
            rows.map((row) => {
              const kind = EVENT_KINDS.find((k) => k.id === row.kind);
              return (
                <div key={row.refId} style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #eee", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "20px", alignItems: "start" }}>
                  <div style={{ background: "#f0f8ff", padding: "15px", borderRadius: "6px", textAlign: "center", minWidth: "90px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#3498db" }}>{row.date}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#333" }}>{row.titleEn}</div>
                    <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>{row.titleNe}</div>
                    <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>⏰ {row.timeEn}</div>
                    <div style={{ fontSize: "12px", color: "#999" }}>📍 {row.locEn}</div>
                    <div style={{ fontSize: "11px", color: "#aaa", marginTop: "8px" }}>
                      <span style={{ background: "#e8f4f8", padding: "4px 8px", borderRadius: "3px" }}>{kind?.en ?? row.kind}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <button onClick={() => handleEdit(row)} style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" }}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(row.refId)} style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>
            {editingRefId ? `✏️ Edit Event (${editingRefId})` : "➕ Add Event"}
          </h2>

          {error && (
            <div style={{ marginBottom: "20px", padding: "12px 16px", background: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: "6px", color: "#721c24", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <Field label="Date (drives the calendar grid placement)">
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
              </Field>
              <Field label="Type">
                <select value={formData.kind} onChange={(e) => setFormData({ ...formData, kind: e.target.value })} style={inputStyle}>
                  <option value="">Select type</option>
                  {EVENT_KINDS.map((k) => <option key={k.id} value={k.id}>{k.en}</option>)}
                </select>
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Title (English)">
                <input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} placeholder="Event title in English" style={inputStyle} />
              </Field>
              <Field label="Title (Nepali)">
                <input value={formData.titleNe} onChange={(e) => setFormData({ ...formData, titleNe: e.target.value })} placeholder="Event title in Nepali" style={inputStyle} />
              </Field>
              <Field label="Time (English)">
                <input value={formData.timeEn} onChange={(e) => setFormData({ ...formData, timeEn: e.target.value })} placeholder="e.g. 10:00 AM" style={inputStyle} />
              </Field>
              <Field label="Time (Nepali)">
                <input value={formData.timeNe} onChange={(e) => setFormData({ ...formData, timeNe: e.target.value })} placeholder="e.g. बिहान १०:००" style={inputStyle} />
              </Field>
              <Field label="Location (English)">
                <input value={formData.locEn} onChange={(e) => setFormData({ ...formData, locEn: e.target.value })} placeholder="Event location in English" style={inputStyle} />
              </Field>
              <Field label="Location (Nepali)">
                <input value={formData.locNe} onChange={(e) => setFormData({ ...formData, locNe: e.target.value })} placeholder="Event location in Nepali" style={inputStyle} />
              </Field>
            </div>
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

export default function AdminEvents() {
  return (
    <ProtectedAdminLayout>
      <EventsContent />
    </ProtectedAdminLayout>
  );
}
