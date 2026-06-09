import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default async function FeedPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      courses (
        name
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Feed</h1>

          <p className="text-green-300 mt-2">
            Updates from courses you follow and courses near you.
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <button className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
            Near Me
          </button>

          <button className="border border-green-300 px-4 py-2 rounded-lg">
            Following
          </button>
        </div>

        <div className="space-y-5">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="bg-green-950/40 border border-green-800 rounded-xl p-5"
            >
              <div className="text-green-300 text-sm">
                {post.courses?.name ?? "Unknown Course"}
              </div>

              <h2 className="text-2xl font-semibold mt-2 mb-3">
                {post.title}
              </h2>

              <p className="text-green-100 mb-4">
                {post.description}
              </p>

              <div className="flex gap-3">
                <a
                  href={post.button_link}
                  target="_blank"
                  className="bg-green-600 px-4 py-2 rounded-lg font-semibold"
                >
                  {post.button_text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}