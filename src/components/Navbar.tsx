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
  { href: "/register-course", label: "Register Course" },
];

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={open ? "M4 4L14 14" : "M2.5 4.5H15.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d={open ? "M14 4L4 14" : "M2.5 9H15.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {!open && (
        <path
          d="M2.5 13.5H15.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
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

    return () => window.removeEventListener("resize", syncNavMode);
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

  const desktopAuth = loggedIn ? (
    <>
      <Link href="/course-admin" className="btn-primary text-sm">
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
        className="pr-2 text-sm font-medium"
        style={{ color: "var(--body-text)" }}
      >
        Sign In
      </Link>
      <Link href="/signup" className="btn-primary text-sm">
        Sign Up
      </Link>
    </>
  );

  const mobileAuth = loggedIn ? (
    <>
      <Link href="/course-admin" className="btn-primary text-sm" onClick={closeMenu}>
        Course Admin
      </Link>
      <button
        onClick={logout}
        className="text-left text-sm font-medium"
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

  const mobileMenu =
    typeof document !== "undefined" && isCompactNav && menuOpen
      ? createPortal(
          <div>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "var(--sand)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <MenuGlyph open />
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
                className="mt-6 flex flex-col gap-4 border-t pt-6"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {mobileAuth}
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
          <div className="flex items-center gap-12">
            <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
              <Image
                src="/FairwayOS-logo-v2.png"
                alt="FairwayOS"
                width={240}
                height={58}
                priority
                className="h-auto w-[210px] sm:w-[240px]"
              />
            </Link>

            {!isCompactNav && (
              <nav aria-label="Primary" className="flex items-center">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex py-2 text-sm font-medium transition-colors"
                    style={{
                      color: isActive(link.href)
                        ? "var(--turf)"
                        : "var(--body-text)",
                      marginRight: index === NAV_LINKS.length - 1 ? 0 : "28px",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {!isCompactNav && (
            <div className="flex shrink-0 items-center gap-6">{desktopAuth}</div>
          )}

          {isCompactNav && (
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "var(--sand)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <MenuGlyph open={menuOpen} />
            </button>
          )}
        </div>
      </nav>

      {mobileMenu}
    </>
  );
}
