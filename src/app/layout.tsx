import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/data/profile";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Data Analyst & Software Developer building Al-Basira, an Arabic BI platform for retail chains. Sales & inventory analytics, BI dashboards, ETL.",
  keywords: [
    "Data Analyst",
    "Data Engineer",
    "Business Intelligence",
    "Power BI",
    "Python",
    "SQL",
    "Ahmed Anter",
    "Al-Basira",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.featuredNote,
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.featuredNote },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink font-sans">
        <Grain />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
