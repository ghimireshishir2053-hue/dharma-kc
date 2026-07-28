"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { PRODUCE_TYPES } from "@/content/produceTypes";
import { MUNICIPALITIES } from "@/content/municipalities";

type FarmerRow = {
  id: string; refId: string; name: string; phone: string; palika: string; ward: number;
  produce: string; otherProduce: string | null; qty: string; price: string | null;
  createdAt: string; notifiedCount: number; notifiedSent: number;
};
type BuyerRow = {
  id: string; refId: string; business: string; phone: string; city: string;
  produce: string; otherProduce: string | null; qty: string;
  createdAt: string; notifiedCount: number; notifiedSent: number;
};

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` };
}

function produceLabel(id: string, other: string | null) {
  if (id === "other" && other) return other;
  const p = PRODUCE_TYPES.find((x) => x.id === id);
  return p ? `${p.emoji} ${p.en}` : id;
}

function KrishiBankContent() {
  const [farmers, setFarmers] = useState<FarmerRow[]>([]);
  const [buyers, setBuyers] = useState<BuyerRow[]>([]);
  const [tab, setTab] = useState<"farmers" | "buyers">("farmers");
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/krishi-bank", { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setFarmers(data.farmers ?? []);
        setBuyers(data.buyers ?? []);
      }
    } catch (err) {
      console.error("Error loading Krishi Bank data:", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (type: "farmer" | "buyer", refId: string) => {
    if (!window.confirm("Remove this listing?")) return;
    try {
      const res = await fetch(`/admin/api/krishi-bank?type=${type}&refId=${encodeURIComponent(refId)}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) load();
    } catch (err) {
      console.error("Error removing listing:", err);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: "26px", margin: "0 0 6px" }}>🌾 Krishi Bank ({farmers.length + buyers.length})</h1>
      <p style={{ color: "#6B7280", fontSize: "13.5px", margin: "0 0 20px" }}>
        Farmer produce listings and buyer requests submitted through the public site. When a farmer lists
        produce, matching buyers are texted automatically — the SMS column shows whether that actually went out.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <button
          onClick={() => setTab("farmers")}
          style={{ padding: "8px 16px", borderRadius: "999px", fontSize: "13px", cursor: "pointer", border: tab === "farmers" ? "1px solid #0094DA" : "1px solid #E1E7EC", background: tab === "farmers" ? "#0094DA" : "white", color: tab === "farmers" ? "white" : "#454B52", fontWeight: tab === "farmers" ? 600 : 400 }}
        >
          🧑‍🌾 Farmer listings ({farmers.length})
        </button>
        <button
          onClick={() => setTab("buyers")}
          style={{ padding: "8px 16px", borderRadius: "999px", fontSize: "13px", cursor: "pointer", border: tab === "buyers" ? "1px solid #0094DA" : "1px solid #E1E7EC", background: tab === "buyers" ? "#0094DA" : "white", color: tab === "buyers" ? "white" : "#454B52", fontWeight: tab === "buyers" ? 600 : 400 }}
        >
          🏪 Buyer requests ({buyers.length})
        </button>
      </div>

      {tab === "farmers" ? (
        farmers.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#9AA3AC", background: "white", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
            No farmer listings yet.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {farmers.map((row) => {
              const muni = MUNICIPALITIES.find((m) => m.id === row.palika);
              return (
                <div key={row.refId} style={{ background: "white", padding: "18px 20px", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                    <div>
                      <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "12.5px", color: "#6B7280" }}>{row.refId}</span>
                      <span style={{ margin: "0 8px", color: "#D1D8DE" }}>·</span>
                      <span style={{ fontSize: "13px", fontWeight: 600 }}>{produceLabel(row.produce, row.otherProduce)}</span>
                    </div>
                    <button onClick={() => remove("farmer", row.refId)} style={{ background: "none", border: "none", color: "#B23A3A", cursor: "pointer", fontSize: "12px" }}>
                      🗑️ Remove
                    </button>
                  </div>
                  <div style={{ fontSize: "13.5px", color: "#14181D", marginBottom: "6px" }}>
                    {row.qty}{row.price ? ` · ${row.price}` : ""} — {muni?.en ?? row.palika}-{row.ward}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "10px" }}>
                    👤 {row.name} &nbsp;·&nbsp; 📞 {row.phone} &nbsp;·&nbsp; {new Date(row.createdAt).toLocaleDateString()}
                  </div>
                  <span style={{
                    fontSize: "11.5px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px",
                    background: row.notifiedCount === 0 ? "#F0F4F8" : row.notifiedSent === row.notifiedCount ? "#E3F4EA" : "#FEF3D9",
                    color: row.notifiedCount === 0 ? "#6B7280" : row.notifiedSent === row.notifiedCount ? "#1F8A50" : "#9A6A00",
                  }}>
                    📩 {row.notifiedSent}/{row.notifiedCount} buyers notified by SMS
                  </span>
                </div>
              );
            })}
          </div>
        )
      ) : buyers.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#9AA3AC", background: "white", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
          No buyer requests yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {buyers.map((row) => (
            <div key={row.refId} style={{ background: "white", padding: "18px 20px", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                <div>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "12.5px", color: "#6B7280" }}>{row.refId}</span>
                  <span style={{ margin: "0 8px", color: "#D1D8DE" }}>·</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{produceLabel(row.produce, row.otherProduce)}</span>
                </div>
                <button onClick={() => remove("buyer", row.refId)} style={{ background: "none", border: "none", color: "#B23A3A", cursor: "pointer", fontSize: "12px" }}>
                  🗑️ Remove
                </button>
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: 600, color: "#14181D", marginBottom: "4px" }}>{row.business}</div>
              <div style={{ fontSize: "13.5px", color: "#14181D", marginBottom: "6px" }}>{row.qty} · {row.city}</div>
              <div style={{ fontSize: "12.5px", color: "#6B7280" }}>
                📞 {row.phone} &nbsp;·&nbsp; {new Date(row.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminKrishiBank() {
  return (
    <ProtectedAdminLayout>
      <KrishiBankContent />
    </ProtectedAdminLayout>
  );
}
