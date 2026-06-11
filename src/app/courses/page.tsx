"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Course {
  id: string;
  name: string;
  city: string;
  state: string;
  website: string | null;
  phone: string | null;
}

export default function CoursesPage() {
  const [courses, setCourses]   = useState<Course[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("name");

      if (error) setError(error.message);
      else setCourses(data ?? []);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    );
  });

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--fairway-950)" }}
    >
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 fade-up">
          <h1
            className="font-display text-4xl font-bold mb-2"
            style={{ color: "var(--white)" }}
          >
            Golf Courses
          </h1>
          <p style={{ color: "var(--muted)" }}>
            Browse and follow courses on FairwayOS.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 fade-up fade-up-delay-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M15 15l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, or state..."
            className="form-input"
            style={{ paddingLeft: "42px" }}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="card p-5 animate-pulse"
                style={{ height: "88px", opacity: 0.5 }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="card p-6 text-center"
            style={{ color: "#fb7185" }}
          >
            <p className="font-semibold mb-1">Could not load courses</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div
            className="card text-center py-16 px-6"
            style={{ color: "var(--muted)" }}
          >
            <p className="text-4xl mb-4">🔍</p>
            <p
              className="font-display text-xl font-semibold mb-2"
              style={{ color: "var(--white)" }}
            >
              {search ? "No courses match your search" : "No courses yet"}
            </p>
            <p className="text-sm mb-6">
              {search
                ? "Try a different city or course name."
                : "Be the first to register your course."}
            </p>
            {!search && (
              <Link
                href="/register-course"
                className="btn-primary text-sm px-6 py-3"
              >
                Register a Course
              </Link>
            )}
          </div>
        )}

        {/* Course list */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <p
              className="text-sm mb-4 fade-up fade-up-delay-1"
              style={{ color: "var(--muted)" }}
            >
              {filtered.length} course{filtered.length !== 1 ? "s" : ""}
              {search && ` matching "${search}"`}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((course, i) => (
                <Link
  key={course.id}
  href={`/course/${course.id}`}
  className="card p-5 group fade-up"
  style={{
    animationDelay: `${i * 0.04}s`,
    textDecoration: "none",
  }}
>
  <div
    className="h-28 rounded-xl mb-4 flex items-center justify-center"
    style={{
      background:
        "linear-gradient(135deg, rgba(34,197,94,.16), rgba(245,240,232,.04))",
      border: "1px solid rgba(255,255,255,.07)",
    }}
  >
    <span className="text-4xl">⛳</span>
  </div>

  <h2
    className="font-display text-xl font-semibold mb-1 group-hover:text-green-400 transition-colors"
    style={{ color: "var(--white)" }}
  >
    {course.name}
  </h2>

  <p
    className="text-sm mb-4"
    style={{ color: "var(--muted)" }}
  >
    {course.city}, {course.state}
  </p>

  <span
    className="text-sm font-semibold"
    style={{ color: "var(--turf)" }}
  >
    View Course →
  </span>
</Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}