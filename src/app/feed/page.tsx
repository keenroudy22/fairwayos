export default function FeedPage() {
  import Link from "next/link";
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Golf Feed
        </h1>

        <div className="flex gap-3 mb-8">
          <button className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
            Near Me
          </button>

          <button className="border border-green-300 px-4 py-2 rounded-lg">
            Following
          </button>
        </div>

          <Link
          href="/course/sagamore"
            className="text-green-300 text-sm mb-1 block hover:text-white"
            >
              Sagamore Golf Club →
          </Link>

            <h2 className="text-xl font-semibold mb-2">
              8 Tee Times Available Tomorrow
            </h2>

            <p className="text-green-100 mb-4">
              Openings from 9:00am - 11:30am due to cancellations.
            </p>

            <button className="text-green-300 font-semibold">
              Book Now →
            </button>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Bear Slide Golf Club
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Member Guest Registration Open
            </h2>

            <p className="text-green-100 mb-4">
              Registration closes June 15.
            </p>

            <button className="text-green-300 font-semibold">
              Learn More →
            </button>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Purgatory Golf Club
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Aerification Scheduled Next Week
            </h2>

            <p className="text-green-100 mb-4">
              Greens will be aerified Monday and Tuesday.
            </p>

            <button className="text-green-300 font-semibold">
              View Update →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}