import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RHSWAP — Swap & bridge to Robinhood Chain",
  description:
    "Swap and bridge tokens to Robinhood Chain (chain ID 4663) with best-price routing powered by LI.FI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-void font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}
