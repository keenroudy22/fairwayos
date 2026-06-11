"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created! Check your email.");
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section className="app-shell-narrow page-section">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <p className="page-kicker">Join FairwayOS</p>
            <h1
              className="mt-3 font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Create Account
            </h1>
            <p className="mt-3" style={{ color: "var(--body-text)" }}>
              Start building your course presence and posting to the feed.
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
                  placeholder="Create a password"
                  className="form-input"
                />
              </div>

              <button onClick={signUp} className="btn-primary w-full">
                Create Account
              </button>
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              Already have access?{" "}
              <Link href="/signin" style={{ color: "var(--turf)" }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
