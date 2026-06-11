import Navbar from "@/components/Navbar";
import PostCard, { Post } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";
import FollowCourseButton from "@/components/FollowCourseButton";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("course_id", id)
    .order("created_at", { ascending: false });

  if (!course) {
    return (
      <main
        className="min-h-screen"
        style={{ background: "var(--fairway-950)", color: "var(--sand)" }}
      >
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="card p-8 text-center">Course not found.</div>
        </div>
      </main>
    );
  }

  const postList = ((posts ?? []) as Post[]).map((post) => ({
    ...post,
    courses: { id: course.id, name: course.name },
  }));

  return (
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background:
            "radial-gradient(circle at top, rgba(34,197,94,0.12), transparent 58%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div
            className="h-36 rounded-lg border sm:h-44"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.22), rgba(245,240,232,0.05))",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          />

          <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-lg border text-3xl font-bold shadow-xl"
                style={{
                  background: "var(--fairway-900)",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "var(--sand)",
                }}
              >
                {initials(course.name)}
              </div>

              <div className="pb-1">
                <p
                  className="mb-1 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--turf)" }}
                >
                  Golf course
                </p>

                <h1
                  className="font-display text-4xl font-bold sm:text-5xl"
                  style={{ color: "var(--sand)" }}
                >
                  {course.name}
                </h1>

                <p className="mt-2" style={{ color: "var(--body-text)" }}>
                  {course.city}, {course.state}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <FollowCourseButton courseId={course.id} />

              {course.website && (
                <a
                  href={course.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2
                className="font-display text-3xl font-bold"
                style={{ color: "var(--sand)" }}
              >
                Latest Updates
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Posts from {course.name}.
              </p>
            </div>

            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {postList.length} update{postList.length === 1 ? "" : "s"}
            </span>
          </div>

          {postList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {postList.map((post, i) => (
                <PostCard key={post.id} post={post} animDelay={i} />
              ))}
            </div>
          ) : (
            <div
              className="card p-10 text-center"
              style={{ color: "var(--muted)" }}
            >
              <p
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--sand)" }}
              >
                No updates yet
              </p>
              <p className="mt-2 text-sm">
                Follow this course to catch future tee times, events, and course
                announcements.
              </p>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--sand)" }}
            >
              About
            </h2>

            <p className="mt-3 text-sm leading-6" style={{ color: "var(--body-text)" }}>
              Follow {course.name} for local golf updates, tee time alerts,
              events, tournaments, promotions, and course conditions.
            </p>
          </div>

          <div className="card p-5">
            <h2
              className="font-display text-2xl font-semibold"
              style={{ color: "var(--sand)" }}
            >
              Course Info
            </h2>

            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt style={{ color: "var(--muted)" }}>Location</dt>
                <dd className="mt-1 font-medium" style={{ color: "var(--body-text)" }}>
                  {course.city}, {course.state}
                </dd>
              </div>

              {course.phone && (
                <div>
                  <dt style={{ color: "var(--muted)" }}>Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${course.phone}`}
                      className="font-medium"
                      style={{ color: "var(--body-text)" }}
                    >
                      {course.phone}
                    </a>
                  </dd>
                </div>
              )}

              {course.website && (
                <div>
                  <dt style={{ color: "var(--muted)" }}>Website</dt>
                  <dd className="mt-1">
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                      style={{ color: "var(--turf)" }}
                    >
                      Open website
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}
