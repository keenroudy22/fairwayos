import Link from "next/link";

export default function SagamorePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/feed" className="text-green-300 text-sm">
          ← Back to Feed
        </Link>

        <div className="mt-6 mb-8">
          <p className="text-green-300 text-sm mb-2">Golf Course</p>

          <h1 className="text-4xl font-bold mb-3">
            Sagamore Golf Club
          </h1>

          <p className="text-green-100 mb-4">
            📍 Noblesville, Indiana
          </p>

          <div className="flex gap-3 text-sm text-green-200 mb-6">
            <span>⭐ 4.7 Rating</span>
            <span>👥 1,247 Followers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="bg-white text-green-950 px-5 py-3 rounded-lg font-semibold">
              Follow Course
            </button>

            <a
              href="#"
              className="border border-green-300 px-5 py-3 rounded-lg text-center font-semibold"
            >
              Book Tee Time
            </a>

            <a
              href="#"
              className="border border-green-300 px-5 py-3 rounded-lg text-center font-semibold"
            >
              Call Course
            </a>
          </div>
        </div>

        <div className="bg-green-950/30 border border-green-800 rounded-2xl p-5 mb-8">
          <h2 className="text-xl font-bold mb-3">
            About Sagamore
          </h2>

          <p className="text-green-100">
            Follow Sagamore Golf Club to receive updates about open tee times,
            events, tournaments, course conditions, and member announcements.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Recent Updates
        </h2>

        <div className="space-y-4">
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Tee Time Alert
            </div>

            <h3 className="font-semibold text-lg">
              8 Tee Times Available Tomorrow
            </h3>

            <p className="text-green-100 mt-2 mb-4">
              Openings from 9:00am - 11:30am due to cancellations.
            </p>

            <a href="#" className="text-green-300 font-semibold">
              Book Now →
            </a>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Event
            </div>

            <h3 className="font-semibold text-lg">
              Member Guest Registration Open
            </h3>

            <p className="text-green-100 mt-2 mb-4">
              Registration closes June 15. Teams can register through the pro
              shop.
            </p>

            <a href="#" className="text-green-300 font-semibold">
              Learn More →
            </a>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Course Update
            </div>

            <h3 className="font-semibold text-lg">
              Cart Path Only This Morning
            </h3>

            <p className="text-green-100 mt-2">
              Due to overnight rain, carts will remain on paths until further
              notice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}