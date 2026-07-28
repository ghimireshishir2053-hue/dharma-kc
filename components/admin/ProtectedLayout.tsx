"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/grievances", label: "Grievances", icon: "📩" },
  { href: "/admin/project-bank", label: "Project Bank", icon: "🏗️" },
  { href: "/admin/diaspora", label: "Diaspora", icon: "🌐" },
  { href: "/admin/krishi-bank", label: "Krishi Bank", icon: "🌾" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/places", label: "Places & Attractions", icon: "📍" },
  { href: "/admin/videos", label: "Videos", icon: "🎬" },
  { href: "/admin/projects", label: "Projects", icon: "📋" },
];

export function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F3F6F9", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", background: "#14181D", color: "white", padding: "20px 14px", position: "fixed", height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px", marginBottom: "28px" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0094DA", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15 }}>ध</div>
          <span style={{ fontSize: "15px", fontWeight: 600 }}>Admin</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1 }}>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: active ? "#0094DA" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  fontWeight: active ? 600 : 400,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            );
          })}
        </nav>

        <div>
          <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.12)" }} />
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "rgba(217,74,74,0.15)",
              color: "#FF9B9B",
              border: "none",
              fontSize: "13.5px",
              fontWeight: 500,
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "240px", padding: "32px" }}>{children}</div>
    </div>
  );
}
