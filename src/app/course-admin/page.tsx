"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function CourseAdminPage() {
  const [type, setType] = useState("Tee Time Alert");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setPosts(data);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

async function publishPost() {
  setLoading(true);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    alert("You must be signed in.");
    setLoading(false);
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from("course_admins")
    .select("course_id")
    .eq("user_id", session.user.id)
    .single();

  if (adminError || !admin) {
    alert("No course assigned to this account.");
    setLoading(false);
    return;
  }

  const { error } = await supabase.from("posts").insert({
    course_id: admin.course_id,
    type,
    title,
    description,
    button_text: buttonText,
    button_link: buttonLink,
  });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  await loadPosts();

  alert("Post Published!");

  setTitle("");
  setDescription("");
  setButtonText("");
  setButtonLink("");
}

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">
          Course Admin
        </h1>

        <p className="text-green-300 mb-8">
          Manage updates, events, promotions, and course communications.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Followers
            </div>

            <div className="text-3xl font-bold">
              1,247
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Posts This Month
            </div>

            <div className="text-3xl font-bold">
              {posts.length}
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Profile Views
            </div>

            <div className="text-3xl font-bold">
              3,912
            </div>
          </div>
        </div>

        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Create Course Update
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2">
                Post Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              >
                <option>Tee Time Alert</option>
                <option>Event</option>
                <option>Tournament</option>
                <option>Promotion</option>
                <option>Course Update</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="8 Tee Times Available Tomorrow"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Openings from 9:00 AM - 11:30 AM due to cancellations."
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Button Text
              </label>

              <input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                type="text"
                placeholder="Book Now"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Button Link
              </label>

              <input
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                type="text"
                placeholder="https://..."
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <button
              onClick={publishPost}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Publishing..." : "Publish Update"}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Recent Posts
          </h2>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-green-800 rounded-xl p-4"
              >
                <div className="text-green-300 text-sm">
                  {post.type}
                </div>

                <div className="font-semibold mt-1">
                  {post.title}
                </div>

                <div className="text-green-200 text-sm mt-2">
                  {post.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}