"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/feed", label: "Feed" },
  { href: "/courses", label: "Courses" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(5,15,7,0.92)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/FairwayOS-logo-v2.png"
            alt="FairwayOS"
            width={220}
            height={55}
            priority
          />
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{
                color: isActive(link.href)
                  ? "var(--turf)"
                  : "var(--body-text)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link
                href="/course-admin"
                className="btn-primary text-sm"
              >
                Course Admin
              </Link>

              <button
                onClick={logout}
                className="text-sm"
                style={{ color: "#fb7185" }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm"
                style={{ color: "var(--body-text)" }}
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="btn-primary text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
<div className="hidden md:flex items-center gap-8">
  {NAV_LINKS.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className="text-sm font-medium transition-colors"
      style={{
        color: isActive(href)
          ? "var(--turf)"
          : "var(--body-text)",
      }}
    >
      {label}
    </Link>
  ))}
</div>
      </div>
    </nav>
  );
}