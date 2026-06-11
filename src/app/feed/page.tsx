import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import PostCard, { Post } from "@/components/PostCard";
import Link from "next/link";

export const revalidate = 30;

export default async function FeedPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, courses(id, name)")
    .order("created_at", { ascending: false });

  const postList = (posts ?? []) as Post[];

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--fairway-950)" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background:
            "radial-gradient(circle at top, rgba(34,197,94,0.10), transparent 60%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1
            className="font-display text-5xl font-bold mb-3"
            style={{ color: "var(--sand)" }}
          >
            Course Feed
          </h1>

          <p
            className="text-lg max-w-2xl"
            style={{ color: "var(--body-text)" }}
          >
            Live updates, events, tournaments, promotions, and tee time alerts
            from golf courses across FairwayOS.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Main Feed */}
          <div>
            {error && (
              <div
                className="card p-6 text-center"
                style={{ color: "#fb7185" }}
              >
                <p className="font-semibold mb-1">
                  Could not load feed
                </p>

                <p
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {error.message}
                </p>
              </div>
            )}

            {!error && postList.length === 0 && (
              <div
                className="card text-center py-16 px-6"
                style={{ color: "var(--muted)" }}
              >
                <p className="text-4xl mb-4">⛳</p>

                <p
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: "var(--white)" }}
                >
                  The feed is empty
                </p>

                <p className="text-sm mb-6">
                  No courses have posted yet.
                </p>

                <Link
                  href="/register-course"
                  className="btn-primary text-sm px-6 py-3"
                >
                  Register Your Course
                </Link>
              </div>
            )}

            {!error && postList.length > 0 && (
              <div className="flex flex-col gap-4">
                {postList.map((post, i) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    animDelay={i}
                  />
                ))}
              </div>
            )}
          </div>
      </div>
    </main>
  );
}