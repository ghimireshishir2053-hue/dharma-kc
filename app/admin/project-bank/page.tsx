"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { CATEGORIES } from "@/content/categories";
import { MUNICIPALITIES } from "@/content/municipalities";

type RequestRow = {
  id: string;
  refId: string;
  name: string;
  phone: string;
  palika: string;
  ward: number;
  category: string;
  title: string;
  budget: string | null;
  beneficiaries: number | null;
  org: string | null;
  responsible: string | null;
  message: string;
  attachment: string | null;
  status: "new" | "under_review" | "approved" | "rejected";
  createdAt: string;
};

const STATUS_META: Record<RequestRow["status"], { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "#E6F5FC", color: "#0077B0" },
  under_review: { label: "Under review", bg: "#FEF3D9", color: "#9A6A00" },
  approved: { label: "Approved", bg: "#E3F4EA", color: "#1F8A50" },
  rejected: { label: "Rejected", bg: "#FDEEEE", color: "#B23A3A" },
};

const STATUSES: RequestRow["status"][] = ["new", "under_review", "approved", "rejected"];

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  };
}

function ProjectBankContent() {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | RequestRow["status"]>("all");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/project-bank", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading project requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (refId: string, status: RequestRow["status"]) => {
    setRows((prev) => prev.map((r) => (r.refId === refId ? { ...r, status } : r)));
    try {
      await fetch("/admin/api/project-bank", { method: "PUT", headers: authHeaders(), body: JSON.stringify({ refId, status }) });
    } catch (err) {
      console.error("Error updating request:", err);
      load();
    }
  };

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: "26px", margin: "0 0 6px" }}>🏗️ Project Bank ({rows.length})</h1>
      <p style={{ color: "#6B7280", fontSize: "13.5px", margin: "0 0 24px" }}>
        Project funding requests submitted by citizens. Approved ones can be added to the public
        Project Tracker from the Projects section once work begins.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {(["all", ...STATUSES] as const).map((f) => (
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
          No requests {filter !== "all" ? `with status "${STATUS_META[filter as RequestRow["status"]].label}"` : "yet"}.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {visible.map((row) => {
            const cat = CATEGORIES.find((c) => c.id === row.category);
            const muni = MUNICIPALITIES.find((m) => m.id === row.palika);
            const meta = STATUS_META[row.status];
            return (
              <div key={row.refId} style={{ background: "white", padding: "18px 20px", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
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
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#14181D", marginBottom: "6px" }}>{row.title}</div>
                <div style={{ fontSize: "13.5px", color: "#454B52", marginBottom: "8px", lineHeight: 1.5 }}>{row.message}</div>
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "6px", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
                  {row.budget && <span>💰 {row.budget}</span>}
                  {row.beneficiaries !== null && <span>👥 {row.beneficiaries.toLocaleString()} beneficiaries</span>}
                  {row.org && <span>🏢 {row.org}</span>}
                  {row.responsible && <span>{row.responsible}</span>}
                </div>
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "14px" }}>
                  👤 {row.name} &nbsp;·&nbsp; 📞 {row.phone}
                  {row.attachment && <> &nbsp;·&nbsp; 📎 {row.attachment}</>}
                  &nbsp;·&nbsp; {new Date(row.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {STATUSES.map((s) => (
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

export default function AdminProjectBank() {
  return (
    <ProtectedAdminLayout>
      <ProjectBankContent />
    </ProtectedAdminLayout>
  );
}
