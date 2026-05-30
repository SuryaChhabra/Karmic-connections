import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karmic Connections — Hypnotherapy & Past Life Regression",
  description:
    "Heal yourself. Discover the root of your fears, patterns, and pain through Hypnotherapy and Past Life Regression.",
  keywords: [
    "Past Life Regression",
    "Hypnotherapy",
    "Karmic Connections",
    "Spiritual Healing",
    "Regression Therapy",
  ],
  openGraph: {
    title: "Karmic Connections — Hypnotherapy & Past Life Regression",
    description:
      "A gentle journey of healing through Hypnotherapy and Past Life Regression.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
