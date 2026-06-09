import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

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
      <main className="min-h-screen bg-black text-white p-10">
        Course not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">
          {course.name}
        </h1>

        <p className="text-green-300 mt-2">
          {course.city}, {course.state}
        </p>

        <div className="flex gap-3 mt-6">
          {course.website && (
            <a
              href={course.website}
              target="_blank"
              className="bg-green-600 px-4 py-2 rounded-lg font-semibold"
            >
              Visit Website
            </a>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">
            Latest Updates
          </h2>

          <div className="space-y-4">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="bg-green-950/40 border border-green-800 rounded-xl p-5"
              >
                <div className="text-green-300 text-sm">
                  {post.type}
                </div>

                <h3 className="text-xl font-semibold mt-2">
                  {post.title}
                </h3>

                <p className="text-green-100 mt-3">
                  {post.description}
                </p>

                {post.button_link && (
                  <a
                    href={post.button_link}
                    target="_blank"
                    className="inline-block mt-4 bg-green-600 px-4 py-2 rounded-lg font-semibold"
                  >
                    {post.button_text || "Learn More"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}