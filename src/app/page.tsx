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
    <main
      className="min-h-screen"
      style={{ background: "var(--fairway-950)" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden hero-noise"
        style={{
          background:
            "radial-gradient(circle at top, rgba(34,197,94,0.14), transparent 60%)",
          paddingTop: "90px",
          paddingBottom: "90px",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 5.8rem)",
              color: "var(--sand)",
              letterSpacing: "-0.04em",
            }}
          >
            Golf Courses Finally Have
            <br />
            <span style={{ color: "var(--turf)" }}>
              A Social Feed.
            </span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto mb-10"
            style={{
              color: "var(--body-text)",
              lineHeight: 1.8,
            }}
          >
            The easiest way to discover what's happening at local golf courses.
            Follow your favorite courses, discover events, find tee time
            specials, and stay connected to your golf community.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/feed"
              className="btn-primary"
            >
              Explore Feed
            </Link>

            <Link
              href="/register-course"
              className="btn-outline"
            >
              Register Your Course
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-10">
          <h2
            className="font-display text-4xl font-bold mb-2"
            style={{ color: "var(--sand)" }}
          >
            Recent Activity
          </h2>

          <p style={{ color: "var(--muted)" }}>
            See what's happening at golf courses right now.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {(posts as Post[]).map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                animDelay={i}
              />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center">
            No course updates yet.
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/feed"
            className="text-sm font-semibold"
            style={{ color: "var(--turf)" }}
          >
            View Full Feed →
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2
            className="font-display text-4xl font-bold mb-2"
            style={{ color: "var(--sand)" }}
          >
            Featured Courses
          </h2>

          <p style={{ color: "var(--muted)" }}>
            Courses already building their audience on FairwayOS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="card p-6 group"
              style={{
                textDecoration: "none",
              }}
            >
              <h3
                className="font-display text-2xl mb-2"
                style={{ color: "var(--sand)" }}
              >
                {course.name}
              </h3>

              <p
                className="mb-6"
                style={{ color: "var(--muted)" }}
              >
                {course.city}, {course.state}
              </p>

              <span
                className="font-semibold"
                style={{ color: "var(--turf)" }}
              >
                View Course →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="card p-10">
          <h2
            className="font-display text-4xl font-bold mb-4"
            style={{ color: "var(--sand)" }}
          >
            Own or Manage a Golf Course?
          </h2>

          <p
            className="text-lg mb-8"
            style={{ color: "var(--body-text)" }}
          >
            Reach golfers, promote events, announce specials,
            and grow your following with FairwayOS.
          </p>

          <Link
            href="/register-course"
            className="btn-primary"
          >
            Register Your Course
          </Link>
        </div>
      </section>

      <footer
        className="border-t py-10 text-center text-sm"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          color: "var(--muted)",
        }}
      >
        FairwayOS — The easiest way to discover what's happening at local golf courses.
      </footer>
    </main>
  );
}