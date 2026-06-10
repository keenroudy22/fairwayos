"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/feed",            label: "Feed" },
  { href: "/courses",         label: "Courses" },
  { href: "/register-course", label: "Register Course" },
];

export default function Navbar() {
  const [loggedIn, setLoggedIn]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                  = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setLoggedIn(!!session)
    );

    return () => subscription.unsubscribe();
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

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
        background: "rgba(5,15,7,0.85)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/FairwayOS-logo-v2.png"
            alt="FairwayOS"
            width={160}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive(href) ? "var(--turf)" : "var(--body-text)",
                background: isActive(href) ? "rgba(34,197,94,0.08)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}

          {loggedIn && (
            <Link
              href="/course-admin"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive("/course-admin") ? "var(--turf)" : "var(--body-text)",
                background: isActive("/course-admin") ? "rgba(34,197,94,0.08)" : "transparent",
              }}
            >
              Course Admin
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!loggedIn ? (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "var(--body-text)" }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-sm px-5 py-2"
                style={{ borderRadius: "8px", padding: "8px 20px" }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                color: "#fb7185",
                border: "1px solid rgba(251,113,133,0.3)",
              }}
            >
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: "var(--body-text)" }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
          style={{
            background: "rgba(5,15,7,0.97)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 rounded-lg text-sm font-medium"
              style={{
                color: isActive(href) ? "var(--turf)" : "var(--body-text)",
                background: isActive(href) ? "rgba(34,197,94,0.08)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}

          {loggedIn && (
            <Link
              href="/course-admin"
              className="px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: "var(--body-text)" }}
            >
              Course Admin
            </Link>
          )}

          <div
            className="my-2"
            style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
          />

          {!loggedIn ? (
            <>
              <Link
                href="/signin"
                className="px-4 py-3 rounded-lg text-sm font-medium"
                style={{ color: "var(--body-text)" }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-3 rounded-lg text-sm font-semibold text-center mt-1"
                style={{
                  background: "var(--turf)",
                  color: "var(--fairway-950)",
                }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-3 rounded-lg text-sm font-medium text-left"
              style={{ color: "#fb7185" }}
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}