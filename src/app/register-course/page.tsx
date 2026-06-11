"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function RegisterCoursePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitCourse() {
    setLoading(true);

    const { error } = await supabase.from("courses").insert({
      name,
      city,
      state,
      website,
      phone,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Course Submitted!");
    setName("");
    setCity("");
    setState("");
    setWebsite("");
    setPhone("");
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section className="app-shell-narrow page-section">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="page-kicker">Grow the network</p>
            <h1
              className="mt-3 font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Register Your Golf Course
            </h1>

            <p className="mt-3 max-w-xl" style={{ color: "var(--body-text)" }}>
              Join FairwayOS and start reaching golfers with updates, events,
              promotions, tee times, and course announcements.
            </p>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  Golf Course Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Sagamore Golf Club"
                  className="form-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Noblesville"
                  className="form-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  State
                </label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  placeholder="Indiana"
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  Website
                </label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  placeholder="https://"
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="(317) 555-5555"
                  className="form-input"
                />
              </div>
            </div>

            <button
              onClick={submitCourse}
              disabled={loading}
              className="btn-primary mt-6 w-full"
            >
              {loading ? "Submitting..." : "Submit Course"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
