"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import Icon from "./Icon";

const TABS = [
  { href: "/project-bank", icon: "building", ne: "बैंक", en: "Bank", color: "var(--accent)" },
  { href: "/grievance", icon: "doc", ne: "गुनासो", en: "Grievance", color: "var(--accent)" },
  { href: "/krishi-bank", icon: "sprout", ne: "कृषि बैंक", en: "Krishi", color: "var(--evergreen)" },
  { href: "/diaspora", icon: "globe", ne: "डायस्पोरा", en: "Diaspora", color: "var(--river)" },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname();
  const { lang } = useLang();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="mobile-tab-bar mobile-only" aria-label={lang === "en" ? "Quick access" : "द्रुत पहुँच"}>
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="mobile-tab-item"
            style={{ color: active ? tab.color : "var(--ink-muted)" }}
          >
            <Icon name={tab.icon} size={21} />
            <span>{lang === "en" ? tab.en : tab.ne}</span>
          </Link>
        );
      })}
    </nav>
  );
}
