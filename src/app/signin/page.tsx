"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signed In!");
    window.location.href = "/course-admin";
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section className="app-shell-narrow page-section">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <p className="page-kicker">Course access</p>
            <h1
              className="mt-3 font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Sign In
            </h1>
            <p className="mt-3" style={{ color: "var(--body-text)" }}>
              Access your course admin tools and publish updates to the feed.
            </p>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@course.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>

              <button onClick={signIn} className="btn-primary w-full">
                Sign In
              </button>
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              Need an account?{" "}
              <Link href="/signup" style={{ color: "var(--turf)" }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
