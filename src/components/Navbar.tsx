import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b border-green-900 bg-green-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/feed"
            className="text-sm text-green-100"
          >
            Feed
          </Link>

          <Link
            href="/courses"
            className="text-sm text-green-100"
          >
            Courses
          </Link>

          <Link
            href="/signin"
            className="border border-green-300 px-3 py-1 rounded-lg text-sm"
          >
            Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}