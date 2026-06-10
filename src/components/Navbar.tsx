"use client";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(!!session);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="border-b border-green-900 bg-green-950/60 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/FairwayOS-logo.png"
            alt="FairwayOS"
            width={180}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="hover:text-green-300 transition">
            Feed
          </Link>

          <Link href="/courses" className="hover:text-green-300 transition">
            Courses
          </Link>

          <Link
            href="/register-course"
            className="hover:text-green-300 transition"
          >
            Register Course
          </Link>

          {loggedIn && (
            <Link
              href="/course-admin"
              className="hover:text-green-300 transition"
            >
              Course Admin
            </Link>
          )}

          {!loggedIn && (
            <>
              <Link
                href="/signin"
                className="hover:text-green-300 transition"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}

          {loggedIn && (
            <button
              onClick={logout}
              className="border border-red-500 text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden border border-green-500 px-3 py-2 rounded-lg"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-green-900 bg-green-950 px-4 py-4">
          <div className="flex flex-col gap-4">
            <Link href="/feed" onClick={() => setMenuOpen(false)}>
              Feed
            </Link>

            <Link href="/courses" onClick={() => setMenuOpen(false)}>
              Courses
            </Link>

            <Link
              href="/register-course"
              onClick={() => setMenuOpen(false)}
            >
              Register Course
            </Link>

            {loggedIn && (
              <Link
                href="/course-admin"
                onClick={() => setMenuOpen(false)}
              >
                Course Admin
              </Link>
            )}

            {!loggedIn && (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}

            {loggedIn && (
              <button
                onClick={logout}
                className="text-left text-red-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}