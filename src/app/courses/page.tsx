"use client";

import { useEffect, useState } from "react";
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

function courseInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const filtered = courses.filter((course) => {
    const q = search.toLowerCase();
    return (
      course.name.toLowerCase().includes(q) ||
      course.city.toLowerCase().includes(q) ||
      course.state.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background:
            "radial-gradient(circle at top, rgba(34,197,94,0.10), transparent 60%)",
        }}
      >
        <div className="app-shell page-section !py-10">
          <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p
                className="mb-2 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--turf)" }}
              >
                Public course directory
              </p>

              <h1
                className="font-display text-4xl font-bold sm:text-5xl"
                style={{ color: "var(--sand)" }}
              >
                Golf Courses
              </h1>

              <p className="mt-3 text-lg" style={{ color: "var(--body-text)" }}>
                Browse courses, open their profiles, and discover who is active
                on FairwayOS.
              </p>
            </div>

            <div
              className="rounded-lg border px-4 py-3 text-sm"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
                color: "var(--body-text)",
              }}
            >
              {filtered.length} course{filtered.length === 1 ? "" : "s"}
              {search ? ` matching "${search}"` : ""}
            </div>
          </div>
          </div>
        </div>
      </section>

      <div className="app-shell page-section !py-10">
        <div className="mx-auto max-w-5xl">
        <div className="relative mb-8 fade-up fade-up-delay-1">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
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
            placeholder="Search by course, city, or state"
            className="form-input"
            style={{ paddingLeft: "42px" }}
          />
        </div>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card p-5 animate-pulse"
                style={{ minHeight: "184px", opacity: 0.5 }}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="card p-6 text-center" style={{ color: "#fb7185" }}>
            <p className="mb-1 font-semibold">Could not load courses</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {error}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="card px-6 py-16 text-center" style={{ color: "var(--muted)" }}>
            <p
              className="font-display text-xl font-semibold"
              style={{ color: "var(--white)" }}
            >
              {search ? "No courses match your search" : "No courses yet"}
            </p>

            <p className="mb-6 mt-2 text-sm">
              {search
                ? "Try a different course name or city."
                : "Be the first to register your course."}
            </p>

            {!search && (
              <Link href="/register-course" className="btn-primary text-sm px-6 py-3">
                Register a Course
              </Link>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((course, i) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="card group flex min-h-[210px] flex-col justify-between p-5 fade-up"
                style={{
                  animationDelay: `${i * 0.04}s`,
                  textDecoration: "none",
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border text-sm font-bold"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "var(--sand)",
                      }}
                    >
                      {courseInitials(course.name)}
                    </div>

                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        background: "rgba(34,197,94,0.10)",
                        color: "var(--turf)",
                      }}
                    >
                      Course profile
                    </span>
                  </div>

                  <h2
                    className="mt-5 font-display text-2xl font-semibold transition-colors group-hover:text-green-400"
                    style={{ color: "var(--white)" }}
                  >
                    {course.name}
                  </h2>

                  <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                    {course.city}, {course.state}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center justify-between border-t pt-4 text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span style={{ color: "var(--body-text)" }}>Open profile</span>
                  <span className="font-semibold" style={{ color: "var(--turf)" }}>
                    View -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
