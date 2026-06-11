import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PostCard, { Post } from "@/components/PostCard";

export default async function Home() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*, courses(id, name)")
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("name")
    .limit(3);

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section
        className="relative overflow-hidden border-b hero-noise"
        style={{
          background:
            "radial-gradient(circle at top, rgba(34,197,94,0.14), transparent 60%)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="app-shell page-section relative z-10">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="page-kicker">Local golf, live</p>

              <h1
                className="mt-5 max-w-4xl font-display font-bold leading-tight"
                style={{
                  fontSize: "clamp(3.1rem, 5vw, 5.25rem)",
                  color: "var(--sand)",
                }}
              >
                Twitter for golf courses.
              </h1>

              <p
                className="mt-6 max-w-2xl text-lg"
                style={{ color: "var(--body-text)", lineHeight: 1.75 }}
              >
                Discover tee time alerts, events, tournaments, course
                conditions, and local updates from the courses around you.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/feed" className="btn-primary">
                  Explore Feed
                </Link>

                <Link href="/register-course" className="btn-outline">
                  Register Your Course
                </Link>
              </div>
            </div>

            <div className="panel p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    Live feed preview
                  </p>

                  <h2
                    className="mt-2 font-display text-2xl font-bold"
                    style={{ color: "var(--sand)" }}
                  >
                    Happening now
                  </h2>
                </div>

                <Link
                  href="/feed"
                  className="shrink-0 text-sm font-semibold"
                  style={{ color: "var(--turf)" }}
                >
                  View all
                </Link>
              </div>

              {posts && posts.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {(posts as Post[]).slice(0, 2).map((post, i) => (
                    <PostCard key={post.id} post={post} animDelay={i} />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-lg border p-6 text-center text-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    color: "var(--muted)",
                  }}
                >
                  No course updates yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="app-shell page-section">
        <div className="page-header mx-auto max-w-5xl">
          <div>
            <p className="page-kicker">The feed is the product</p>
            <h2
              className="mt-3 font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Recent Activity
            </h2>
            <p className="mt-2" style={{ color: "var(--muted)" }}>
              See what local courses are posting right now.
            </p>
          </div>

          <Link
            href="/feed"
            className="text-sm font-semibold"
            style={{ color: "var(--turf)" }}
          >
            View Full Feed -&gt;
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          {posts && posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {(posts as Post[]).map((post, i) => (
                <PostCard key={post.id} post={post} animDelay={i} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">No course updates yet.</div>
          )}
        </div>
      </section>

      <section className="app-shell page-section pt-0">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2
              className="font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Featured Courses
            </h2>

            <p className="mt-2" style={{ color: "var(--muted)" }}>
              Courses already building their audience on FairwayOS.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses?.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="card group flex min-h-[210px] flex-col justify-between p-6"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <div
                    className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: "rgba(34,197,94,0.10)",
                      color: "var(--turf)",
                    }}
                  >
                    Course profile
                  </div>

                  <h3
                    className="font-display text-2xl font-semibold"
                    style={{ color: "var(--sand)" }}
                  >
                    {course.name}
                  </h3>

                  <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                    {course.city}, {course.state}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center justify-between border-t pt-4 text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span style={{ color: "var(--body-text)" }}>Latest updates</span>
                  <span className="font-semibold" style={{ color: "var(--turf)" }}>
                    View -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="app-shell page-section pt-0">
        <div className="app-shell-narrow">
          <div className="card p-10 text-center">
            <h2
              className="font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Own or Manage a Golf Course?
            </h2>

            <p
              className="mb-8 mt-4 text-lg"
              style={{ color: "var(--body-text)" }}
            >
              Reach golfers, promote events, announce specials, and grow your
              following with FairwayOS.
            </p>

            <Link href="/register-course" className="btn-primary">
              Register Your Course
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="border-t py-10 text-center text-sm"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          color: "var(--muted)",
        }}
      >
        FairwayOS - The easiest way to discover what&apos;s happening at local
        golf courses.
      </footer>
    </main>
  );
}
