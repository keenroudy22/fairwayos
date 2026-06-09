import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-8">
        <Link href="/">
          <Image
            src="/FairwayOS-logo.png"
            alt="FairwayOS"
            width={180}
            height={40}
            className="h-auto w-auto"
            priority
          />
        </Link>

        <div className="flex gap-2">
          <Link
            href="/signin"
            className="px-3 py-2 text-sm rounded-lg border border-green-300 hover:bg-green-900 transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-3 py-2 text-sm rounded-lg bg-white text-green-950 font-semibold hover:bg-green-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-5 py-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Stay Connected to Your Favorite Golf Courses.
        </h1>

        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
          Get notified about tee times, events, course closures,
          promotions, and tournament updates.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10">
          <Link
            href="/signup"
            className="bg-white text-green-950 py-4 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <Link
            href="/register-course"
            className="border border-green-300 py-4 rounded-xl font-semibold"
          >
            Register Your Course
          </Link>
        </div>

        {/* Features */}
        <div className="grid gap-3 max-w-md mx-auto mb-10">
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
            ⛳ Tee Time Alerts
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
            🏆 Events & Outings
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
            🚫 Course Closures
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
            💰 Specials & Promotions
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-4">
            📢 Tournament Updates
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