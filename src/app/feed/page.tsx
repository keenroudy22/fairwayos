export default function FeedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Course Feed
        </h1>

        <div className="space-y-6">

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-2">
              Sagamore Golf Club
            </div>

            <h2 className="text-xl font-semibold mb-2">
              8 Tee Times Available Tomorrow
            </h2>

            <p className="text-green-100">
              We have openings from 9:00am - Noon. Book online or call the pro shop.
            </p>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-2">
              Bear Slide Golf Club
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Member Guest Registration Open
            </h2>

            <p className="text-green-100">
              Registration is now open for our annual Member Guest tournament.
            </p>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-2">
              Purgatory Golf Club
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Aerification Scheduled
            </h2>

            <p className="text-green-100">
              Greens will be aerified next Monday and Tuesday.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}