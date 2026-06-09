import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FairwayOS",
  description:
    "The Operating System for Golf Courses. Follow courses, receive updates, and never miss a tee time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}