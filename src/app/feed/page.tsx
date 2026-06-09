import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FeedPage() {
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
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/sagamore"
              className="text-green-300 text-sm hover:text-white"
            >
              Sagamore Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              8 Tee Times Available Tomorrow
            </h2>

            <p className="text-green-100 mb-4">
              Openings from 9:00 AM - 11:30 AM due to cancellations.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 px-4 py-2 rounded-lg font-semibold">
                Book Now
              </button>

              <Link
                href="/course/sagamore"
                className="border border-green-300 px-4 py-2 rounded-lg"
              >
                View Course
              </Link>
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/bearslide"
              className="text-green-300 text-sm hover:text-white"
            >
              Bear Slide Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              Member Guest Registration Open
            </h2>

            <p className="text-green-100 mb-4">
              Registration closes June 15.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 px-4 py-2 rounded-lg font-semibold">
                Learn More
              </button>

              <Link
                href="/course/bearslide"
                className="border border-green-300 px-4 py-2 rounded-lg"
              >
                View Course
              </Link>
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/purgatory"
              className="text-green-300 text-sm hover:text-white"
            >
              Purgatory Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              Aerification Scheduled Next Week
            </h2>

            <p className="text-green-100 mb-4">
              Greens will be aerified Monday and Tuesday.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 px-4 py-2 rounded-lg font-semibold">
                View Update
              </button>

              <Link
                href="/course/purgatory"
                className="border border-green-300 px-4 py-2 rounded-lg"
              >
                View Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}