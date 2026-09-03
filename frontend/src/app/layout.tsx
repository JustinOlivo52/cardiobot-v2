import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardioBot v2",
  description: "Production-oriented cardiology AI workbench",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
