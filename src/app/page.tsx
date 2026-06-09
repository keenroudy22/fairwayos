import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/">
          <Image
            src="/FairwayOS-logo.png"
            alt="FairwayOS"
            width={220}
            height={50}
            className="h-auto w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex gap-8 text-green-100">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/register-course" className="hover:text-white transition">For Golf Courses</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        </div>

        <div className="flex gap-3">
          <Link href="/signin" className="px-4 py-2 rounded-lg border border-green-300 hover:bg-green-900 transition">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg bg-white text-green-950 font-semibold hover:bg-green-100 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Never Miss an Open Tee Time Again.
        </h1>

        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-12">
          Follow your favorite golf courses and get alerts for tee times,
          outings, closures, specials, tournaments, and course updates.
        </p>

        <div className="border border-green-800 rounded-2xl p-8 max-w-2xl mx-auto bg-green-950/30">
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

        <div className="grid gap-3 text-left max-w-md mx-auto mt-12 text-base md:text-lg">
          <div>⛳ Open Tee Time Alerts</div>
          <div>🏆 Events & Outings</div>
          <div>🚫 Course Closures</div>
          <div>💰 Specials & Promotions</div>
          <div>📢 Tournament Updates</div>
        </div>

        <div className="mt-10 text-green-300 text-sm">
          FairwayOS • The Operating System for Golf Courses
        </div>
      </section>
    </main>
  );
}