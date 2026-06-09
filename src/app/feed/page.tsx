import Link from "next/link";

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Golf Feed</h1>
            <p className="text-green-300 mt-1">
              Updates from courses you follow and courses near you.
            </p>
          </div>

          <Link
            href="/"
            className="border border-green-300 px-4 py-2 rounded-lg hover:bg-green-900 transition"
          >
            Home
          </Link>
        </div>

        {/* Feed Tabs */}
        <div className="flex gap-3 mb-8">
          <button className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
            Near Me
          </button>

          <button className="border border-green-300 px-4 py-2 rounded-lg">
            Following
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-5">
          {/* Sagamore */}
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/sagamore"
              className="text-green-300 text-sm hover:text-white transition"
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
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold transition">
                Book Now
              </button>

              <button className="border border-green-300 px-4 py-2 rounded-lg">
                View Course
              </button>
            </div>
          </div>

          {/* Bear Slide */}
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/pebblebrook"
              className="text-green-300 text-sm hover:text-white transition"
            >
              Bear Slide Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              Member Guest Registration Open
            </h2>

            <p className="text-green-100 mb-4">
              Registration closes June 15. Contact the pro shop for details.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold transition">
                Learn More
              </button>

              <button className="border border-green-300 px-4 py-2 rounded-lg">
                View Course
              </button>
            </div>
          </div>

          {/* Purgatory */}
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="#"
              className="text-green-300 text-sm hover:text-white transition"
            >
              Purgatory Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              Aerification Scheduled Next Week
            </h2>

            <p className="text-green-100 mb-4">
              Greens will be aerified Monday and Tuesday. Expect temporary
              course condition impacts.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold transition">
                View Update
              </button>

              <button className="border border-green-300 px-4 py-2 rounded-lg">
                View Course
              </button>
            </div>
          </div>

          {/* Pebble Brook */}
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <Link
              href="/course/pebblebrook"
              className="text-green-300 text-sm hover:text-white transition"
            >
              Pebble Brook Golf Club →
            </Link>

            <h2 className="text-2xl font-semibold mt-2 mb-3">
              Friday Night Scramble Announced
            </h2>

            <p className="text-green-100 mb-4">
              Teams of 4. Shotgun start at 6 PM. Registration now open.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold transition">
                Register
              </button>

              <button className="border border-green-300 px-4 py-2 rounded-lg">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}