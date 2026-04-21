import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        danger: "#D94A4A",
        ok: "#5FBA89",
      },
      fontFamily: {
        sans: ["var(--f-sans)"],
        deva: ["var(--f-deva)"],
        "deva-serif": ["var(--f-deva-serif)"],
        serif: ["var(--f-serif)"],
        mono: ["var(--f-mono)"],
      },
      maxWidth: {
        container: "1280px",
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
