import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CourseDirectoryPage() {
  const courses = [
    {
      name: "Sagamore Golf Club",
      city: "Noblesville, IN",
      slug: "sagamore",
      followers: "1,247",
    },
    {
      name: "Pebble Brook Golf Club",
      city: "Noblesville, IN",
      slug: "pebblebrook",
      followers: "842",
    },
    {
      name: "Purgatory Golf Club",
      city: "Noblesville, IN",
      slug: "purgatory",
      followers: "1,986",
    },
    {
      name: "Bear Slide Golf Club",
      city: "Cicero, IN",
      slug: "bearslide",
      followers: "731",
    },
  ];

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
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/course/${course.slug}`}
              className="block bg-green-950/40 border border-green-800 rounded-xl p-5 hover:border-green-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {course.name}
              </h2>

              <p className="text-green-300 mb-2">
                📍 {course.city}
              </p>

              <p className="text-green-200">
                👥 {course.followers} Followers
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}