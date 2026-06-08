export default function Home() {
  return (
    <main className="min-h-screen bg-green-950 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <p className="text-green-300 font-semibold mb-4 text-lg">
          FairwayOS
        </p>

        <h1 className="text-6xl font-bold mb-6">
          Follow Your Favorite Golf Courses
        </h1>

        <p className="text-xl text-green-100 mb-10">
          Get notified instantly about open tee times, outings, closures,
          specials, tournaments, and course updates.
        </p>

        <div className="grid gap-3 text-left max-w-md mx-auto mb-10">
          <div>⛳ Open Tee Times</div>
          <div>🏆 Events & Outings</div>
          <div>🚫 Course Closures</div>
          <div>💰 Specials & Promotions</div>
          <div>📢 Tournament Alerts</div>
        </div>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-green-950 px-6 py-3 rounded-xl font-semibold">
            I'm a Golfer
          </button>

          <button className="border border-green-300 px-6 py-3 rounded-xl font-semibold">
            I'm a Golf Course
          </button>
        </div>
      </div>
    </main>
  );
}