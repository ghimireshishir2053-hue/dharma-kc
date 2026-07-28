"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { MUNICIPALITIES } from "@/content/municipalities";

interface PlaceDetail {
  placeNe: string;
  placeEn: string;
  descNe: string;
  descEn: string;
  typeNe: string;
  typeEn: string;
  infoLink: string;
  img: string;
}

interface Place {
  primaryNe: string;
  primaryEn: string;
  primaryDescNe: string;
  primaryDescEn: string;
  primaryImg: string;
  details: PlaceDetail[];
}

const emptyDetail: PlaceDetail = { placeNe: "", placeEn: "", descNe: "", descEn: "", typeNe: "", typeEn: "", infoLink: "", img: "" };

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  };
}

function PlacesContent() {
  const [selectedMuni, setSelectedMuni] = useState(MUNICIPALITIES[0].id);
  const [place, setPlace] = useState<Place | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlace();
    setEditing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMuni]);

  const loadPlace = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/places/${selectedMuni}`, { headers: authHeaders() });
      if (response.ok) setPlace(await response.json());
    } catch (error) {
      console.error("Error loading place:", error);
    } finally {
      setLoading(false);
    }
  };

  const savePlace = async () => {
    if (!place) return;
    try {
      const response = await fetch(`/admin/api/places/${selectedMuni}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(place),
      });
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const addAttraction = () => {
    if (!place) return;
    setPlace({ ...place, details: [...place.details, { ...emptyDetail }] });
  };

  const removeAttraction = (idx: number) => {
    if (!place) return;
    setPlace({ ...place, details: place.details.filter((_, i) => i !== idx) });
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;
  if (!place) return <div style={{ padding: "20px" }}>Place not found</div>;

  const inputStyle = (disabled: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px",
    fontSize: "13px", boxSizing: "border-box", background: disabled ? "#f5f5f5" : "white",
  });

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>📍 Manage Places</h1>
      <p style={{ color: "#6B7280", fontSize: "13.5px", marginBottom: "24px" }}>
        The featured destination and top attractions shown for each palika on the homepage Lamjung map.
        Population, area and ward counts are census facts maintained in code, not here.
      </p>

      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>Palika</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
          {MUNICIPALITIES.map((muni) => (
            <button
              key={muni.id}
              onClick={() => setSelectedMuni(muni.id)}
              style={{
                padding: "10px", borderRadius: "6px", cursor: "pointer",
                border: selectedMuni === muni.id ? "2px solid #0094DA" : "1px solid #ddd",
                background: selectedMuni === muni.id ? "#E6F5FC" : "white",
                color: selectedMuni === muni.id ? "#0077B0" : "#333",
                fontWeight: selectedMuni === muni.id ? 600 : 400,
              }}
            >
              {muni.en}
            </button>
          ))}
        </div>
      </div>

      {saved && (
        <div style={{ marginBottom: "20px", padding: "16px", background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: "6px", color: "#155724" }}>
          ✅ Changes saved successfully!
        </div>
      )}

      <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>Featured destination</h2>

        <div style={{ display: "grid", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>Name (English)</label>
            <input disabled={!editing} value={place.primaryEn} onChange={(e) => setPlace({ ...place, primaryEn: e.target.value })} style={inputStyle(!editing)} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>Name (Nepali)</label>
            <input disabled={!editing} value={place.primaryNe} onChange={(e) => setPlace({ ...place, primaryNe: e.target.value })} style={inputStyle(!editing)} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>Description (English)</label>
            <textarea disabled={!editing} value={place.primaryDescEn} onChange={(e) => setPlace({ ...place, primaryDescEn: e.target.value })} style={{ ...inputStyle(!editing), minHeight: "80px", resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>Description (Nepali)</label>
            <textarea disabled={!editing} value={place.primaryDescNe} onChange={(e) => setPlace({ ...place, primaryDescNe: e.target.value })} style={{ ...inputStyle(!editing), minHeight: "80px", resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
              Image path <span style={{ fontWeight: 400, color: "#999" }}>(leave blank to show a placeholder)</span>
            </label>
            <input disabled={!editing} value={place.primaryImg} onChange={(e) => setPlace({ ...place, primaryImg: e.target.value })} placeholder="/places/image.jpg" style={inputStyle(!editing)} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", color: "#2c3e50", margin: 0 }}>Top attractions ({place.details.length})</h2>
            {editing && (
              <button onClick={addAttraction} style={{ padding: "6px 14px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontSize: "12.5px", fontWeight: 600, cursor: "pointer" }}>
                ➕ Add attraction
              </button>
            )}
          </div>

          {place.details.map((detail, idx) => (
            <div key={idx} style={{ marginBottom: "20px", padding: "18px", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "14px", color: "#555", margin: 0 }}>Attraction {idx + 1}</h3>
                {editing && (
                  <button onClick={() => removeAttraction(idx)} style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "12px" }}>
                    🗑️ Remove
                  </button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input disabled={!editing} value={detail.placeEn} onChange={(e) => { const d = [...place.details]; d[idx].placeEn = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Name (English)" style={inputStyle(!editing)} />
                <input disabled={!editing} value={detail.placeNe} onChange={(e) => { const d = [...place.details]; d[idx].placeNe = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Name (Nepali)" style={inputStyle(!editing)} />
                <input disabled={!editing} value={detail.typeEn} onChange={(e) => { const d = [...place.details]; d[idx].typeEn = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Category (English), e.g. Trekking" style={inputStyle(!editing)} />
                <input disabled={!editing} value={detail.typeNe} onChange={(e) => { const d = [...place.details]; d[idx].typeNe = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Category (Nepali)" style={inputStyle(!editing)} />
                <textarea disabled={!editing} value={detail.descEn} onChange={(e) => { const d = [...place.details]; d[idx].descEn = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Description (English)" style={{ ...inputStyle(!editing), minHeight: "60px", resize: "vertical" }} />
                <textarea disabled={!editing} value={detail.descNe} onChange={(e) => { const d = [...place.details]; d[idx].descNe = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Description (Nepali)" style={{ ...inputStyle(!editing), minHeight: "60px", resize: "vertical" }} />
                <input disabled={!editing} value={detail.infoLink} onChange={(e) => { const d = [...place.details]; d[idx].infoLink = e.target.value; setPlace({ ...place, details: d }); }} placeholder="Information link" style={{ ...inputStyle(!editing), gridColumn: "1 / -1" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{ padding: "12px 24px", background: "#3498db", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
              ✏️ Edit
            </button>
          ) : (
            <>
              <button onClick={savePlace} style={{ padding: "12px 24px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
                💾 Save
              </button>
              <button onClick={() => { setEditing(false); loadPlace(); }} style={{ padding: "12px 24px", background: "#95a5a6", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPlaces() {
  return (
    <ProtectedAdminLayout>
      <PlacesContent />
    </ProtectedAdminLayout>
  );
}
