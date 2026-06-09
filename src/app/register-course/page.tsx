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
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-3">
          Register Your Golf Course
        </h1>

        <p className="text-green-300 mb-8">
          Join FairwayOS and start reaching golfers with updates, events,
          promotions, tee times, and course announcements.
        </p>

        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-green-200">
                Golf Course Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Sagamore Golf Club"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                City
              </label>

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Noblesville"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                State
              </label>

              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="Indiana"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Website
              </label>

              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                type="text"
                placeholder="https://"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Phone Number
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="(317) 555-5555"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <button
              onClick={submitCourse}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Submitting..." : "Submit Course"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}