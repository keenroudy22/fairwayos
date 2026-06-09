import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-green-900 bg-green-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/FairwayOS-logo.png"
            alt="FairwayOS"
            width={220}
            height={50}
            className="h-auto w-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/feed"
            className="text-green-100 hover:text-white transition"
          >
            Feed
          </Link>

          <Link
            href="/courses"
            className="text-green-100 hover:text-white transition"
          >
            Courses
          </Link>

          <Link
            href="/register-course"
            className="text-green-100 hover:text-white transition"
          >
            Register Course
          </Link>

          <Link
            href="/signin"
            className="border border-green-300 px-4 py-2 rounded-lg hover:bg-green-900 transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="bg-white text-green-950 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}