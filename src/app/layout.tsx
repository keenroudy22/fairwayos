import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FairwayOS — The Operating System for Golf Courses",
  description:
    "Follow courses, get tee time alerts, discover events and promotions. FairwayOS connects golfers and golf courses in one live feed.",
  openGraph: {
    title: "FairwayOS",
    description: "The Operating System for Golf Courses.",
    siteName: "FairwayOS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}