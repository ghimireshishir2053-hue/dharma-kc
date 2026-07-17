"use client";

import { useState, useEffect } from "react";

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

const municipalities = [
  { id: "besisahar", name: "Besisahar" },
  { id: "madhyanepal", name: "Madhyanepal" },
  { id: "kwholasothar", name: "Kwholasothar" },
  { id: "dudhpokhari", name: "Dudhpokhari" },
  { id: "marsyangdi", name: "Marsyangdi" },
  { id: "dordi", name: "Dordi" },
  { id: "sundarbazar", name: "Sundarbazar" },
  { id: "rainas", name: "Rainas" },
];

export default function AdminPlaces() {
  const [selectedMuni, setSelectedMuni] = useState("besisahar");
  const [place, setPlace] = useState<Place | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlace();
  }, [selectedMuni]);

  const loadPlace = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/places/${selectedMuni}`);
      if (response.ok) {
        const data = await response.json();
        setPlace(data);
      }
    } catch (error) {
      console.error("Error loading place:", error);
    } finally {
      setLoading(false);
    }
  };

  const savePlace = async () => {
    if (!place) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/admin/api/places/${selectedMuni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
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

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;
  if (!place) return <div style={{ padding: "20px" }}>Place not found</div>;

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>📍 Manage Places</h1>

      {/* Municipality Selector */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: 600 }}>
          Select Municipality
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "12px" }}>
          {municipalities.map((muni) => (
            <button
              key={muni.id}
              onClick={() => setSelectedMuni(muni.id)}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: selectedMuni === muni.id ? "2px solid #3498db" : "1px solid #ddd",
                background: selectedMuni === muni.id ? "#e3f2fd" : "white",
                color: selectedMuni === muni.id ? "#3498db" : "#333",
                fontWeight: selectedMuni === muni.id ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {muni.name}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Notification */}
      {saved && (
        <div style={{ marginBottom: "20px", padding: "16px", background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: "6px", color: "#155724" }}>
          ✅ Changes saved successfully!
        </div>
      )}

      {/* Main Form */}
      <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>Primary Place Information</h2>

          <div style={{ display: "grid", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Place Name (Nepali)
              </label>
              <input
                type="text"
                disabled={!editing}
                value={place.primaryNe}
                onChange={(e) => setPlace({ ...place, primaryNe: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  background: editing ? "white" : "#f5f5f5",
                  cursor: editing ? "text" : "not-allowed",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Place Name (English)
              </label>
              <input
                type="text"
                disabled={!editing}
                value={place.primaryEn}
                onChange={(e) => setPlace({ ...place, primaryEn: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  background: editing ? "white" : "#f5f5f5",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Description (Nepali)
              </label>
              <textarea
                disabled={!editing}
                value={place.primaryDescNe}
                onChange={(e) => setPlace({ ...place, primaryDescNe: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  minHeight: "100px",
                  boxSizing: "border-box",
                  background: editing ? "white" : "#f5f5f5",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Description (English)
              </label>
              <textarea
                disabled={!editing}
                value={place.primaryDescEn}
                onChange={(e) => setPlace({ ...place, primaryDescEn: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  minHeight: "100px",
                  boxSizing: "border-box",
                  background: editing ? "white" : "#f5f5f5",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Image Path
              </label>
              <input
                type="text"
                disabled={!editing}
                value={place.primaryImg}
                onChange={(e) => setPlace({ ...place, primaryImg: e.target.value })}
                placeholder="/places/image.jpg"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  background: editing ? "white" : "#f5f5f5",
                }}
              />
            </div>
          </div>
        </div>

        {/* Additional Attractions */}
        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#2c3e50" }}>Additional Attractions ({place.details.length})</h2>

          {place.details.map((detail, idx) => (
            <div key={idx} style={{ marginBottom: "30px", padding: "20px", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "12px", color: "#555" }}>Attraction {idx + 1}</h3>

              <div style={{ display: "grid", gap: "12px" }}>
                <input
                  type="text"
                  disabled={!editing}
                  value={detail.placeNe}
                  onChange={(e) => {
                    const updated = [...place.details];
                    updated[idx].placeNe = e.target.value;
                    setPlace({ ...place, details: updated });
                  }}
                  placeholder="Place name (Nepali)"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    background: editing ? "white" : "#f5f5f5",
                  }}
                />

                <input
                  type="text"
                  disabled={!editing}
                  value={detail.placeEn}
                  onChange={(e) => {
                    const updated = [...place.details];
                    updated[idx].placeEn = e.target.value;
                    setPlace({ ...place, details: updated });
                  }}
                  placeholder="Place name (English)"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    background: editing ? "white" : "#f5f5f5",
                  }}
                />

                <input
                  type="text"
                  disabled={!editing}
                  value={detail.typeEn}
                  onChange={(e) => {
                    const updated = [...place.details];
                    updated[idx].typeEn = e.target.value;
                    setPlace({ ...place, details: updated });
                  }}
                  placeholder="Category (e.g., Trekking, Temple)"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    background: editing ? "white" : "#f5f5f5",
                  }}
                />

                <textarea
                  disabled={!editing}
                  value={detail.descEn}
                  onChange={(e) => {
                    const updated = [...place.details];
                    updated[idx].descEn = e.target.value;
                    setPlace({ ...place, details: updated });
                  }}
                  placeholder="Description (English)"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    minHeight: "60px",
                    background: editing ? "white" : "#f5f5f5",
                    resize: "vertical",
                  }}
                />

                <input
                  type="text"
                  disabled={!editing}
                  value={detail.infoLink}
                  onChange={(e) => {
                    const updated = [...place.details];
                    updated[idx].infoLink = e.target.value;
                    setPlace({ ...place, details: updated });
                  }}
                  placeholder="Information link"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    background: editing ? "white" : "#f5f5f5",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: "12px 24px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>
          ) : (
            <>
              <button
                onClick={savePlace}
                style={{
                  padding: "12px 24px",
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                💾 Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  loadPlace();
                }}
                style={{
                  padding: "12px 24px",
                  background: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
