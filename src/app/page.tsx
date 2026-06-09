import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/FairwayOS-logo.png"
            alt="FairwayOS Logo"
            width={440}
            height={120}
            className="max-w-full h-auto"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Never miss an open tee time again.
        </h1>

        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
          Follow your favorite golf courses and get alerts for tee times,
          outings, closures, specials, tournaments, and course updates.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="bg-white text-green-950 px-8 py-4 rounded-xl font-semibold hover:bg-green-100 transition">
            Sign Up
          </button>

          <button className="border border-green-300 px-8 py-4 rounded-xl font-semibold hover:bg-green-900 transition">
            Add My Golf Course
          </button>
        </div>

        <div className="grid gap-3 text-left max-w-md mx-auto text-base md:text-lg text-green-50">
          <div>⛳ Open Tee Time Alerts</div>
          <div>🏆 Events & Outings</div>
          <div>🚫 Course Closures</div>
          <div>💰 Specials & Promotions</div>
          <div>📢 Tournament Updates</div>
        </div>

        <div className="mt-10 text-green-300 text-sm">
          FairwayOS • The Operating System for Golf Courses
        </div>
      </div>
    </main>
  );
}