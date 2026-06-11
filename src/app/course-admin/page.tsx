"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface PostRow {
  id: string;
  type: string;
  title: string;
  description: string;
}

export default function CourseAdminPage() {
  const [type, setType] = useState("Tee Time Alert");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostRow[]>([]);

  useEffect(() => {
    void loadPosts();
  }, []);

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("id, type, title, description")
      .order("created_at", { ascending: false });

    if (data) {
      setPosts(data);
    }
  }

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
    <main className="min-h-screen" style={{ background: "var(--fairway-950)" }}>
      <Navbar />

      <section className="app-shell page-section">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="page-kicker">Course tools</p>
            <h1
              className="mt-3 font-display text-4xl font-bold"
              style={{ color: "var(--sand)" }}
            >
              Course Admin
            </h1>
            <p className="mt-3" style={{ color: "var(--body-text)" }}>
              Manage updates, events, promotions, and course communications.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="card p-5">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Followers
              </div>
              <div className="mt-2 text-3xl font-bold" style={{ color: "var(--sand)" }}>
                1,247
              </div>
            </div>

            <div className="card p-5">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Posts This Month
              </div>
              <div className="mt-2 text-3xl font-bold" style={{ color: "var(--sand)" }}>
                {posts.length}
              </div>
            </div>

            <div className="card p-5">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Profile Views
              </div>
              <div className="mt-2 text-3xl font-bold" style={{ color: "var(--sand)" }}>
                3,912
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="card p-6 sm:p-8">
              <h2
                className="font-display text-2xl font-bold"
                style={{ color: "var(--sand)" }}
              >
                Create Course Update
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                    Post Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-input"
                  >
                    <option>Tee Time Alert</option>
                    <option>Event</option>
                    <option>Tournament</option>
                    <option>Promotion</option>
                    <option>Course Update</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="8 Tee Times Available Tomorrow"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Openings from 9:00 AM - 11:30 AM due to cancellations."
                    className="form-input resize-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                      Button Text
                    </label>
                    <input
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      type="text"
                      placeholder="Book Now"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium" style={{ color: "var(--sand)" }}>
                      Button Link
                    </label>
                    <input
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                      type="text"
                      placeholder="https://..."
                      className="form-input"
                    />
                  </div>
                </div>

                <button onClick={publishPost} disabled={loading} className="btn-primary w-full">
                  {loading ? "Publishing..." : "Publish Update"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-5">
                <h2
                  className="font-display text-2xl font-semibold"
                  style={{ color: "var(--sand)" }}
                >
                  Posting Tips
                </h2>
                <p className="mt-3 text-sm leading-6" style={{ color: "var(--body-text)" }}>
                  Keep updates short, specific, and timely. The strongest posts
                  usually announce openings, events, and changes golfers can act
                  on right away.
                </p>
              </div>

              <div className="card p-5">
                <h2
                  className="font-display text-2xl font-semibold"
                  style={{ color: "var(--sand)" }}
                >
                  Recent Posts
                </h2>

                <div className="mt-4 space-y-3">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-lg border p-4"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--turf)" }}>
                        {post.type}
                      </div>
                      <div className="mt-2 font-semibold" style={{ color: "var(--sand)" }}>
                        {post.title}
                      </div>
                      <div className="mt-2 text-sm" style={{ color: "var(--body-text)" }}>
                        {post.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
