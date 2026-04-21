import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
  JetBrains_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoDeva = Noto_Sans_Devanagari({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-deva",
  display: "swap",
});

const notoDevaSerif = Noto_Serif_Devanagari({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-deva-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "माननीय धर्मराज के.सी. — सांसद, लमजुङ",
  description:
    "Official portal of Hon. Dharma Raj K.C., Member of Parliament, Lamjung-1, House of Representatives, Nepal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ne"
      className={`${spaceGrotesk.variable} ${notoDeva.variable} ${notoDevaSerif.variable} ${jetbrains.variable} ${fraunces.variable}`}
    >
      <body>
        <LangProvider>
          <div className="page">{children}</div>
        </LangProvider>
      </body>
    </html>
  );
}
