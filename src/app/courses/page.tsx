export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Golf Courses
        </h1>

        <div className="space-y-4">

          <div className="bg-green-950/50 border border-green-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold">
              Purgatory Golf Club
            </h2>
            <p className="text-green-300">
              Noblesville, Indiana
            </p>
            <button className="mt-4 bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
              Follow
            </button>
          </div>

          <div className="bg-green-950/50 border border-green-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold">
              Sagamore Club
            </h2>
            <p className="text-green-300">
              Noblesville, Indiana
            </p>
            <button className="mt-4 bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
              Follow
            </button>
          </div>

          <div className="bg-green-950/50 border border-green-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold">
              Bear Slide Golf Club
            </h2>
            <p className="text-green-300">
              Cicero, Indiana
            </p>
            <button className="mt-4 bg-white text-green-950 px-4 py-2 rounded-lg font-semibold">
              Follow
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}