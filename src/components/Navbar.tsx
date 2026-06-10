"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

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
    <nav className="border-b border-green-900 bg-green-950/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          FairwayOS
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/feed">
            Feed
          </Link>

          <Link href="/courses">
            Courses
          </Link>

          <Link href="/register-course">
            Register Course
          </Link>

          {loggedIn && (
            <Link href="/course-admin">
              Course Admin
            </Link>
          )}

          {!loggedIn && (
            <>
              <Link href="/signin">
                Sign In
              </Link>

              <Link href="/signup">
                Sign Up
              </Link>
            </>
          )}

          {loggedIn && (
            <button
              onClick={logout}
              className="border border-red-500 text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/20"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}