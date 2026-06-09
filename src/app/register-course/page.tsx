export default function RegisterCoursePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-3">
          Register Your Golf Course
        </h1>

        <p className="text-green-300 mb-8">
          Join FairwayOS and start reaching golfers with updates, events,
          promotions, tee times, and course announcements.
        </p>

        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-green-200">
                Golf Course Name
              </label>

              <input
                type="text"
                placeholder="Sagamore Golf Club"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                City
              </label>

              <input
                type="text"
                placeholder="Noblesville"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                State
              </label>

              <input
                type="text"
                placeholder="Indiana"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Website
              </label>

              <input
                type="text"
                placeholder="https://"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="(317) 555-5555"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Contact Name
              </label>

              <input
                type="text"
                placeholder="John Smith"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-200">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@sagamoregolf.com"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold transition">
              Submit Course
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}