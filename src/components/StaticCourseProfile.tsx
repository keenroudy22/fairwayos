import Link from "next/link";
import Navbar from "@/components/Navbar";
import PostCard, { Post, PostType } from "@/components/PostCard";

interface StaticCoursePost {
  type: PostType;
  title: string;
  description: string;
  buttonText?: string;
}

interface StaticCourseProfileProps {
  id: string;
  name: string;
  city: string;
  state: string;
  posts: StaticCoursePost[];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const DEMO_POST_DATES = [
  "2026-06-11T14:00:00.000Z",
  "2026-06-11T12:00:00.000Z",
  "2026-06-11T10:00:00.000Z",
];

export default function StaticCourseProfile({
  id,
  name,
  city,
  state,
  posts,
}: StaticCourseProfileProps) {
  const postList: Post[] = posts.map((post, index) => ({
    id: `${id}-${index}`,
    course_id: id,
    type: post.type,
    title: post.title,
    description: post.description,
    button_text: post.buttonText ?? null,
    button_link: "#",
    created_at: DEMO_POST_DATES[index] ?? DEMO_POST_DATES[0],
    courses: { id, name },
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
          <Link
            href="/feed"
            className="mb-5 inline-flex text-sm font-semibold"
            style={{ color: "var(--turf)" }}
          >
            &lt;- Back to Feed
          </Link>

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
                {initials(name)}
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
                  {name}
                </h1>

                <p className="mt-2" style={{ color: "var(--body-text)" }}>
                  {city}, {state}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Follow Course
              </button>

              <Link href="/feed" className="btn-outline">
                View Feed
              </Link>
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
                Posts from {name}.
              </p>
            </div>

            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {postList.length} updates
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {postList.map((post, index) => (
              <PostCard key={post.id} post={post} animDelay={index} />
            ))}
          </div>
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
              Follow {name} for tee time alerts, events, tournaments,
              promotions, and course conditions from {city}.
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
                  {city}, {state}
                </dd>
              </div>

              <div>
                <dt style={{ color: "var(--muted)" }}>Profile</dt>
                <dd className="mt-1 font-medium" style={{ color: "var(--body-text)" }}>
                  Public course feed
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}
