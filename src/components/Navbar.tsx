"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/feed", label: "Feed" },
  { href: "/courses", label: "Courses" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className="absolute left-0 top-0 h-0.5 w-5 rounded-full transition-transform"
        style={{
          background: "currentColor",
          transform: open ? "translateY(7px) rotate(45deg)" : "translateY(0)",
        }}
      />
      <span
        className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full transition-opacity"
        style={{
          background: "currentColor",
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full transition-transform"
        style={{
          background: "currentColor",
          transform: open ? "translateY(-7px) rotate(-45deg)" : "translateY(0)",
        }}
      />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(false);

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

  useEffect(() => {
    function syncNavMode() {
      const compact = window.innerWidth < 900;
      setIsCompactNav(compact);
      if (!compact) {
        setMenuOpen(false);
      }
    }

    syncNavMode();
    window.addEventListener("resize", syncNavMode);

    return () => {
      window.removeEventListener("resize", syncNavMode);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setMenuOpen(false);

  const authLinks = loggedIn ? (
    <>
      <Link href="/course-admin" className="btn-primary text-sm" onClick={closeMenu}>
        Course Admin
      </Link>

      <button
        onClick={logout}
        className="text-sm font-medium"
        style={{ color: "#fb7185" }}
      >
        Log Out
      </button>
    </>
  ) : (
    <>
      <Link
        href="/signin"
        className="text-sm font-medium"
        style={{ color: "var(--body-text)" }}
        onClick={closeMenu}
      >
        Sign In
      </Link>

      <Link href="/signup" className="btn-primary text-sm" onClick={closeMenu}>
        Sign Up
      </Link>
    </>
  );

  const mobileMenu = typeof document !== "undefined" && isCompactNav && menuOpen
    ? createPortal(
        <div>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            onClick={closeMenu}
          />

          <aside
            className="fixed inset-y-0 right-0 z-[80] flex w-[86vw] max-w-[340px] flex-col border-l px-5 py-5 shadow-2xl"
            style={{
              background: "rgba(5,15,7,0.98)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                Navigation
              </span>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation"
                className="flex h-10 w-10 items-center justify-center rounded-lg border"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "var(--sand)",
                }}
              >
                <MenuIcon open />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-base font-semibold"
                  style={{
                    background: isActive(link.href)
                      ? "rgba(34,197,94,0.10)"
                      : "rgba(255,255,255,0.02)",
                    color: isActive(link.href)
                      ? "var(--turf)"
                      : "var(--body-text)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              className="mt-6 flex flex-col gap-3 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {authLinks}
            </div>
          </aside>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(5,15,7,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="app-shell flex h-[72px] items-center justify-between lg:h-20">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/FairwayOS-logo-v2.png"
              alt="FairwayOS"
              width={190}
              height={48}
              priority
              className="h-auto w-[160px] sm:w-[190px]"
            />
          </Link>

          {!isCompactNav && (
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? "var(--turf)" : "var(--body-text)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {!isCompactNav && <div className="flex items-center gap-4">{authLinks}</div>}

          {isCompactNav && (
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "var(--sand)",
              }}
            >
              <MenuIcon open={menuOpen} />
            </button>
          )}
        </div>
      </nav>

      {mobileMenu}
    </>
  );
}
