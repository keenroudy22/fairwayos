import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Post } from "@/components/PostCard";
import Link from "next/link";
import FeedExperience from "@/components/FeedExperience";

export const revalidate = 30;

export default async function FeedPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, courses(id, name, city, state)")
    .order("created_at", { ascending: false });

  const postList = (posts ?? []) as Post[];

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
                  Live course network
                </p>

                <h1
                  className="font-display text-4xl font-bold sm:text-5xl"
                  style={{ color: "var(--sand)" }}
                >
                  Course Feed
                </h1>

                <p
                  className="mt-3 max-w-2xl text-lg"
                  style={{ color: "var(--body-text)" }}
                >
                  Live updates, events, promotions, tournaments, and tee time
                  alerts from golf courses across FairwayOS.
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
                {postList.length} post{postList.length === 1 ? "" : "s"} in the
                feed
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="app-shell page-section !py-10">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section>
            <FeedExperience posts={postList} errorMessage={error?.message} />
          </section>

          <aside className="space-y-4">
            <div className="card p-5">
              <h2
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--sand)" }}
              >
                What you will find
              </h2>

              <p className="mt-3 text-sm leading-6" style={{ color: "var(--body-text)" }}>
                Follow the feed for last-minute tee times, course conditions,
                event registration, member updates, and promotional offers.
              </p>
            </div>

            <div className="card p-5">
              <h2
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--sand)" }}
              >
                Course actions
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <Link href="/courses" className="btn-outline text-sm">
                  Browse Courses
                </Link>

                <Link href="/register-course" className="btn-primary text-sm">
                  Register a Course
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
