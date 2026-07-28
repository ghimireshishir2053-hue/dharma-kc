"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { CATEGORIES, STATUS } from "@/content/categories";
import { MUNICIPALITIES } from "@/content/municipalities";
import type { StatusId } from "@/lib/types";

type ProjectRow = {
  id: string;
  refId: string;
  cat: string;
  palika: string;
  titleNe: string;
  titleEn: string;
  status: string;
  progress: number | null;
  budgetNe: string;
  budgetEn: string;
  startNe: string;
  startEn: string;
  etaNe: string;
  etaEn: string;
  updateNe: string;
  updateEn: string;
  tagsNe: string[];
  tagsEn: string[];
  updatedAt: string;
};

const emptyForm = {
  cat: "", palika: "", titleNe: "", titleEn: "", status: "",
  progress: "", budgetNe: "", budgetEn: "", startNe: "", startEn: "",
  etaNe: "", etaEn: "", updateNe: "", updateEn: "", tagsNe: "", tagsEn: "",
};

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

function ProjectsContent() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  });

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/projects", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading projects:", err);
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

  const handleEdit = (row: ProjectRow) => {
    setFormData({
      cat: row.cat, palika: row.palika, titleNe: row.titleNe, titleEn: row.titleEn,
      status: row.status, progress: row.progress?.toString() ?? "",
      budgetNe: row.budgetNe, budgetEn: row.budgetEn, startNe: row.startNe, startEn: row.startEn,
      etaNe: row.etaNe, etaEn: row.etaEn, updateNe: row.updateNe, updateEn: row.updateEn,
      tagsNe: row.tagsNe.join(", "), tagsEn: row.tagsEn.join(", "),
    });
    setEditingRefId(row.refId);
    setError(null);
    setEditing(true);
  };

  const handleSave = async () => {
    setError(null);
    const body = {
      ...formData,
      tagsNe: formData.tagsNe.split(",").map((s) => s.trim()).filter(Boolean),
      tagsEn: formData.tagsEn.split(",").map((s) => s.trim()).filter(Boolean),
      ...(editingRefId ? { refId: editingRefId } : {}),
    };
    try {
      const res = await fetch("/admin/api/projects", {
        method: editingRefId ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setEditing(false);
        loadProjects();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Save failed");
      }
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Save failed");
    }
  };

  const handleDelete = async (refId: string) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      const res = await fetch(`/admin/api/projects?refId=${encodeURIComponent(refId)}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) loadProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>🏗️ Manage Projects ({rows.length})</h1>
        <button
          onClick={handleAddNew}
          style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
        >
          ➕ Add Project
        </button>
      </div>

      <div style={{ marginBottom: "20px", padding: "14px 16px", background: "#f0f4ff", border: "1px solid #d0deff", borderRadius: "6px", color: "#333", fontSize: "13px" }}>
        Only projects entered here appear on the public "Sectors" tracker and Lamjung map — nothing is shown until you add it.
      </div>

      {saved && (
        <div style={{ marginBottom: "20px", padding: "16px", background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: "6px", color: "#155724" }}>
          ✅ Project saved successfully!
        </div>
      )}

      {!editing ? (
        <div style={{ display: "grid", gap: "15px" }}>
          {rows.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              No projects yet. <button onClick={handleAddNew} style={{ color: "#27ae60", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Add one now</button>
            </div>
          ) : (
            rows.map((row) => {
              const cat = CATEGORIES.find((c) => c.id === row.cat);
              const status = STATUS[row.status as StatusId];
              const muni = MUNICIPALITIES.find((m) => m.id === row.palika);
              return (
                <div
                  key={row.refId}
                  style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #eee", display: "grid", gridTemplateColumns: "1fr auto", gap: "20px", alignItems: "start" }}
                >
                  <div>
                    <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
                      <strong>{row.refId}</strong> · {cat?.en ?? row.cat} · {muni?.en ?? row.palika} · {status?.en ?? row.status}
                      {row.progress !== null && ` · ${row.progress}%`}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "#333" }}>{row.titleEn}</div>
                    <div style={{ fontSize: "13px", color: "#888" }}>{row.titleNe}</div>
                    <div style={{ fontSize: "12px", color: "#aaa", marginTop: "8px" }}>{row.updateEn}</div>
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
              );
            })
          )}
        </div>
      ) : (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>
            {editingRefId ? `✏️ Edit Project (${editingRefId})` : "➕ Add Project"}
          </h2>

          {error && (
            <div style={{ marginBottom: "20px", padding: "12px 16px", background: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: "6px", color: "#721c24", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
              <Field label="Category">
                <select value={formData.cat} onChange={(e) => setFormData({ ...formData, cat: e.target.value })} style={inputStyle}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
                </select>
              </Field>
              <Field label="Palika">
                <select value={formData.palika} onChange={(e) => setFormData({ ...formData, palika: e.target.value })} style={inputStyle}>
                  <option value="">Select palika</option>
                  {MUNICIPALITIES.map((m) => <option key={m.id} value={m.id}>{m.en}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                  <option value="">Select status</option>
                  {(Object.entries(STATUS) as [string, { en: string }][]).map(([k, v]) => <option key={k} value={k}>{v.en}</option>)}
                </select>
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Title (English)">
                <input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} placeholder="e.g. Dordi Khola Small Hydro, Phase 2" style={inputStyle} />
              </Field>
              <Field label="Title (Nepali)">
                <input value={formData.titleNe} onChange={(e) => setFormData({ ...formData, titleNe: e.target.value })} placeholder="परियोजनाको नाम" style={inputStyle} />
              </Field>
            </div>

            <Field label="Progress % (leave blank if not applicable)">
              <input type="number" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: e.target.value })} placeholder="e.g. 64" style={{ ...inputStyle, maxWidth: 160 }} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Budget (English)">
                <input value={formData.budgetEn} onChange={(e) => setFormData({ ...formData, budgetEn: e.target.value })} placeholder="e.g. NPR 50 lakh" style={inputStyle} />
              </Field>
              <Field label="Budget (Nepali)">
                <input value={formData.budgetNe} onChange={(e) => setFormData({ ...formData, budgetNe: e.target.value })} placeholder="जस्तै: रू. ५० लाख" style={inputStyle} />
              </Field>
              <Field label="Start (English)">
                <input value={formData.startEn} onChange={(e) => setFormData({ ...formData, startEn: e.target.value })} placeholder="e.g. Chaitra 2081" style={inputStyle} />
              </Field>
              <Field label="Start (Nepali)">
                <input value={formData.startNe} onChange={(e) => setFormData({ ...formData, startNe: e.target.value })} placeholder="जस्तै: चैत २०८१" style={inputStyle} />
              </Field>
              <Field label="ETA (English)">
                <input value={formData.etaEn} onChange={(e) => setFormData({ ...formData, etaEn: e.target.value })} placeholder="e.g. Ashadh 2083" style={inputStyle} />
              </Field>
              <Field label="ETA (Nepali)">
                <input value={formData.etaNe} onChange={(e) => setFormData({ ...formData, etaNe: e.target.value })} placeholder="जस्तै: असार २०८३" style={inputStyle} />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Latest update (English)">
                <textarea rows={3} value={formData.updateEn} onChange={(e) => setFormData({ ...formData, updateEn: e.target.value })} placeholder="What happened most recently on this project" style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
              <Field label="Latest update (Nepali)">
                <textarea rows={3} value={formData.updateNe} onChange={(e) => setFormData({ ...formData, updateNe: e.target.value })} placeholder="पछिल्लो अद्यावधिक विवरण" style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <Field label="Tags (English, comma separated)">
                <input value={formData.tagsEn} onChange={(e) => setFormData({ ...formData, tagsEn: e.target.value })} placeholder="e.g. Turbine, Penstock, Q3 2082" style={inputStyle} />
              </Field>
              <Field label="Tags (Nepali, comma separated)">
                <input value={formData.tagsNe} onChange={(e) => setFormData({ ...formData, tagsNe: e.target.value })} placeholder="जस्तै: टर्बाइन, पेनस्टक" style={inputStyle} />
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

export default function AdminProjects() {
  return (
    <ProtectedAdminLayout>
      <ProjectsContent />
    </ProtectedAdminLayout>
  );
}
