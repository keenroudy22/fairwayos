import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <section className="px-5 py-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Fairway Called. You're Missing Out.
        </h1>

        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-10">
          Tee times, events, promotions, tournaments, and course updates all in
          one place.
        </p>

        {/* Feed Preview */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Live Feed Preview
          </h2>

          <div className="flex justify-center gap-3 mb-6">
            <button className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
              Near Me
            </button>

            <button className="border border-green-300 px-4 py-2 rounded-lg">
              Following
            </button>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
              <div className="text-green-300 text-sm mb-1">
                Sagamore Golf Club
              </div>

              <h3 className="font-semibold text-lg">
                8 Tee Times Available Tomorrow
              </h3>

              <p className="text-green-100 mb-3">
                Openings from 9:00am - 11:30am due to cancellations.
              </p>

              <button className="text-green-300 font-semibold">
                Book Now →
              </button>
            </div>

            <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
              <div className="text-green-300 text-sm mb-1">
                Bear Slide Golf Club
              </div>

              <h3 className="font-semibold text-lg">
                Member Guest Registration Open
              </h3>

              <p className="text-green-100 mb-3">
                Registration closes June 15.
              </p>

              <button className="text-green-300 font-semibold">
                Learn More →
              </button>
            </div>

            <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
              <div className="text-green-300 text-sm mb-1">
                Purgatory Golf Club
              </div>

              <h3 className="font-semibold text-lg">
                Aerification Scheduled Next Week
              </h3>

              <p className="text-green-100">
                Greens will be aerified Monday and Tuesday.
              </p>
            </div>
          </div>
        </div>

        {/* Course CTA */}
        <div className="bg-green-950/30 border border-green-800 rounded-2xl p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-3">
            Own or Manage a Golf Course?
          </h2>

          <p className="text-green-100 mb-6">
            Reach golfers, promote events, fill tee times, and grow your
            following with FairwayOS.
          </p>

          <Link
            href="/register-course"
            className="inline-block bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-semibold transition"
          >
            Register Your Course
          </Link>
        </div>

        <div className="mt-10 text-green-300 text-sm">
          FairwayOS • The Operating System for Golf Courses
        </div>
      </section>
    </main>
  );
}