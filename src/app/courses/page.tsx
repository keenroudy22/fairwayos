import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CourseDirectoryPage() {
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Golf Courses
          </h1>

          <p className="text-green-300">
            Browse and follow your favorite golf courses.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          className="w-full bg-green-950/40 border border-green-800 rounded-xl px-4 py-3 mb-8 text-white"
        />

        <div className="space-y-4">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="block bg-green-950/40 border border-green-800 rounded-xl p-5 hover:border-green-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {course.name}
              </h2>

              <p className="text-green-300 mb-2">
                📍 {course.city}, {course.state}
              </p>

              <p className="text-green-200">
                🌐 {course.website || "No website listed"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}