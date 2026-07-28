"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedAdminLayout } from "@/components/admin/ProtectedLayout";

type Stats = {
  projects: number;
  events: number;
  videos: number;
  places: { entered: number; total: number };
  grievances: { total: number; new: number };
  projectRequests: { total: number; new: number };
  diasporaMembers: { total: number; new: number };
  krishiBank: { total: number };
};

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` };
}

function StatCard({ href, icon, label, value, badge }: { href: string; icon: string; label: string; value: string | number; badge?: number }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        style={{ background: "white", padding: "22px", borderRadius: "12px", border: "1px solid #E1E7EC", cursor: "pointer", position: "relative", transition: "box-shadow .15s, transform .15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 20px -8px rgba(11,15,20,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {!!badge && (
          <span style={{ position: "absolute", top: 16, right: 16, background: "#0094DA", color: "white", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
            {badge} new
          </span>
        )}
        <div style={{ fontSize: "28px", marginBottom: "10px" }}>{icon}</div>
        <div style={{ fontSize: "28px", fontWeight: 700, color: "#14181D", marginBottom: "4px" }}>{value}</div>
        <div style={{ fontSize: "13.5px", color: "#6B7280" }}>{label}</div>
      </div>
    </Link>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/api/stats", { headers: authHeaders() })
      .then((res) => (res.ok ? res.json() : null))
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "6px", color: "#14181D" }}>Dashboard</h1>
        <p style={{ color: "#6B7280", fontSize: "14.5px" }}>Live counts from the database — not estimates.</p>
      </div>

      {loading ? (
        <div style={{ padding: "20px" }}>Loading...</div>
      ) : !stats ? (
        <div style={{ padding: "20px", color: "#B23A3A" }}>Could not load stats.</div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <StatCard href="/admin/grievances" icon="📩" label="Grievances" value={stats.grievances.total} badge={stats.grievances.new} />
            <StatCard href="/admin/project-bank" icon="🏗️" label="Project Bank requests" value={stats.projectRequests.total} badge={stats.projectRequests.new} />
            <StatCard href="/admin/diaspora" icon="🌐" label="Diaspora signups" value={stats.diasporaMembers.total} badge={stats.diasporaMembers.new} />
            <StatCard href="/admin/krishi-bank" icon="🌾" label="Krishi Bank listings" value={stats.krishiBank.total} />
            <StatCard href="/admin/projects" icon="📋" label="Tracked projects" value={stats.projects} />
            <StatCard href="/admin/events" icon="📅" label="Calendar events" value={stats.events} />
            <StatCard href="/admin/places" icon="📍" label="Palikas with content" value={`${stats.places.entered}/${stats.places.total}`} />
            <StatCard href="/admin/videos" icon="🎬" label="Videos" value={stats.videos} />
          </div>

          <div style={{ background: "white", padding: "26px", borderRadius: "12px", border: "1px solid #E1E7EC" }}>
            <h2 style={{ fontSize: "17px", marginBottom: "16px", color: "#14181D" }}>Quick actions</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
              <Link href="/admin/projects" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", padding: "12px", background: "#0094DA", color: "white", border: "none", borderRadius: "8px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer" }}>
                  ➕ Add project
                </button>
              </Link>
              <Link href="/admin/events" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", padding: "12px", background: "#0094DA", color: "white", border: "none", borderRadius: "8px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer" }}>
                  ➕ Add event
                </button>
              </Link>
              <Link href="/admin/videos" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", padding: "12px", background: "#0094DA", color: "white", border: "none", borderRadius: "8px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer" }}>
                  ➕ Add video
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedAdminLayout>
      <DashboardContent />
    </ProtectedAdminLayout>
  );
}
