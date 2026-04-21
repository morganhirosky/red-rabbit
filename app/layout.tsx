import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "morgan hirosky",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%" }}>
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
