"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { CATEGORIES } from "@/content/categories";
import { MUNICIPALITIES } from "@/content/municipalities";

type GrievanceRow = {
  id: string;
  refId: string;
  name: string;
  phone: string;
  palika: string;
  ward: number;
  category: string;
  message: string;
  attachment: string | null;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
};

const STATUS_META: Record<GrievanceRow["status"], { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "#E6F5FC", color: "#0077B0" },
  in_progress: { label: "In progress", bg: "#FEF3D9", color: "#9A6A00" },
  resolved: { label: "Resolved", bg: "#E3F4EA", color: "#1F8A50" },
};

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  };
}

function GrievancesContent() {
  const [rows, setRows] = useState<GrievanceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | GrievanceRow["status"]>("all");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/grievances", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading grievances:", err);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (refId: string, status: GrievanceRow["status"]) => {
    setRows((prev) => prev.map((r) => (r.refId === refId ? { ...r, status } : r)));
    try {
      await fetch("/admin/api/grievances", { method: "PUT", headers: authHeaders(), body: JSON.stringify({ refId, status }) });
    } catch (err) {
      console.error("Error updating grievance:", err);
      load();
    }
  };

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: "26px", margin: "0 0 6px" }}>📩 Grievances ({rows.length})</h1>
      <p style={{ color: "#6B7280", fontSize: "13.5px", margin: "0 0 24px" }}>
        Citizen grievances submitted through the public site. Mark progress as your office follows up.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {(["all", "new", "in_progress", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 14px", borderRadius: "999px", fontSize: "13px", cursor: "pointer",
              border: filter === f ? "1px solid #0094DA" : "1px solid #E1E7EC",
              background: filter === f ? "#0094DA" : "white",
              color: filter === f ? "white" : "#454B52",
              fontWeight: filter === f ? 600 : 400,
            }}
          >
            {f === "all" ? "All" : STATUS_META[f].label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#9AA3AC", background: "white", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
          No grievances {filter !== "all" ? `with status "${STATUS_META[filter as GrievanceRow["status"]].label}"` : "yet"}.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {visible.map((row) => {
            const cat = CATEGORIES.find((c) => c.id === row.category);
            const muni = MUNICIPALITIES.find((m) => m.id === row.palika);
            const meta = STATUS_META[row.status];
            return (
              <div key={row.refId} style={{ background: "white", padding: "18px 20px", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                  <div>
                    <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "12.5px", color: "#6B7280" }}>{row.refId}</span>
                    <span style={{ margin: "0 8px", color: "#D1D8DE" }}>·</span>
                    <span style={{ fontSize: "12.5px", color: "#6B7280" }}>{cat?.en ?? row.category}</span>
                    <span style={{ margin: "0 8px", color: "#D1D8DE" }}>·</span>
                    <span style={{ fontSize: "12.5px", color: "#6B7280" }}>{muni?.en ?? row.palika}-{row.ward}</span>
                  </div>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", background: meta.bg, color: meta.color, whiteSpace: "nowrap" }}>
                    {meta.label}
                  </span>
                </div>
                <div style={{ fontSize: "14.5px", color: "#14181D", marginBottom: "8px", lineHeight: 1.5 }}>{row.message}</div>
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "14px" }}>
                  👤 {row.name} &nbsp;·&nbsp; 📞 {row.phone}
                  {row.attachment && <> &nbsp;·&nbsp; 📎 {row.attachment}</>}
                  &nbsp;·&nbsp; {new Date(row.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {(["new", "in_progress", "resolved"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(row.refId, s)}
                      disabled={row.status === s}
                      style={{
                        padding: "6px 12px", borderRadius: "6px", fontSize: "12.5px", cursor: row.status === s ? "default" : "pointer",
                        border: "1px solid " + (row.status === s ? STATUS_META[s].color : "#E1E7EC"),
                        background: row.status === s ? STATUS_META[s].bg : "white",
                        color: row.status === s ? STATUS_META[s].color : "#454B52",
                        fontWeight: row.status === s ? 600 : 400,
                      }}
                    >
                      Mark {STATUS_META[s].label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminGrievances() {
  return (
    <ProtectedAdminLayout>
      <GrievancesContent />
    </ProtectedAdminLayout>
  );
}
