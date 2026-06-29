import "~/styles/globals.css";
import "leaflet/dist/leaflet.css";

import { type Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "dopamina.shop — compra tudo. paga nada.",
  description:
    "A loja que vende a dopamina de comprar. 100% falso, 200% dopamina. A fatura nunca chega.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
