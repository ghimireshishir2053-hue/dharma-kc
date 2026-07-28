"use client";

import { useState, useEffect } from "react";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";
import { COLLAB_INTERESTS } from "@/content/collabInterests";
import { MUNICIPALITIES } from "@/content/municipalities";

type MemberRow = {
  id: string;
  refId: string;
  name: string;
  phone: string;
  sector: string;
  country: string;
  palika: string;
  interest: string;
  message: string | null;
  cv: string | null;
  status: "new" | "contacted" | "archived";
  createdAt: string;
};

const STATUS_META: Record<MemberRow["status"], { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "#E6F5FC", color: "#0077B0" },
  contacted: { label: "Contacted", bg: "#E3F4EA", color: "#1F8A50" },
  archived: { label: "Archived", bg: "#F0F4F8", color: "#6B7280" },
};

const STATUSES: MemberRow["status"][] = ["new", "contacted", "archived"];

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
  };
}

function DiasporaContent() {
  const [rows, setRows] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | MemberRow["status"]>("all");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/diaspora", { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
    } catch (err) {
      console.error("Error loading diaspora members:", err);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = async (refId: string, status: MemberRow["status"]) => {
    setRows((prev) => prev.map((r) => (r.refId === refId ? { ...r, status } : r)));
    try {
      await fetch("/admin/api/diaspora", { method: "PUT", headers: authHeaders(), body: JSON.stringify({ refId, status }) });
    } catch (err) {
      console.error("Error updating member:", err);
      load();
    }
  };

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: "26px", margin: "0 0 6px" }}>🌐 Diaspora Network ({rows.length})</h1>
      <p style={{ color: "#6B7280", fontSize: "13.5px", margin: "0 0 24px" }}>
        Lamjung diaspora members who signed up through the public site to collaborate.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
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
          No members {filter !== "all" ? `with status "${STATUS_META[filter as MemberRow["status"]].label}"` : "yet"}.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {visible.map((row) => {
            const interest = COLLAB_INTERESTS.find((c) => c.id === row.interest);
            const muni = MUNICIPALITIES.find((m) => m.id === row.palika);
            const meta = STATUS_META[row.status];
            return (
              <div key={row.refId} style={{ background: "white", padding: "18px 20px", borderRadius: "10px", border: "1px solid #E1E7EC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                  <div>
                    <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "12.5px", color: "#6B7280" }}>{row.refId}</span>
                    <span style={{ margin: "0 8px", color: "#D1D8DE" }}>·</span>
                    <span style={{ fontSize: "12.5px", color: "#6B7280" }}>{interest?.en ?? row.interest}</span>
                  </div>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", background: meta.bg, color: meta.color, whiteSpace: "nowrap" }}>
                    {meta.label}
                  </span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#14181D", marginBottom: "4px" }}>{row.name}</div>
                <div style={{ fontSize: "13px", color: "#454B52", marginBottom: "8px" }}>
                  {row.sector} · {row.country} · Home: {muni?.en ?? row.palika}
                </div>
                {row.message && (
                  <div style={{ fontSize: "13.5px", color: "#454B52", marginBottom: "8px", lineHeight: 1.5 }}>{row.message}</div>
                )}
                <div style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "14px" }}>
                  📞 {row.phone}
                  {row.cv && <> &nbsp;·&nbsp; 📎 {row.cv}</>}
                  &nbsp;·&nbsp; {new Date(row.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
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

export default function AdminDiaspora() {
  return (
    <ProtectedAdminLayout>
      <DiasporaContent />
    </ProtectedAdminLayout>
  );
}
