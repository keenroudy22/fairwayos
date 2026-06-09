import Navbar from "@/components/Navbar";

export default function CourseAdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">
          Course Admin
        </h1>

        <p className="text-green-300 mb-8">
          Manage updates, events, promotions, and course communications.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Followers
            </div>

            <div className="text-3xl font-bold">
              1,247
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Posts This Month
            </div>

            <div className="text-3xl font-bold">
              18
            </div>
          </div>

          <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
            <div className="text-green-300 text-sm mb-1">
              Profile Views
            </div>

            <div className="text-3xl font-bold">
              3,912
            </div>
          </div>
        </div>

        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Create Course Update
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2">
                Post Type
              </label>

              <select className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3">
                <option>Tee Time Alert</option>
                <option>Event</option>
                <option>Tournament</option>
                <option>Promotion</option>
                <option>Course Update</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Title
              </label>

              <input
                type="text"
                placeholder="8 Tee Times Available Tomorrow"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Openings from 9:00 AM - 11:30 AM due to cancellations."
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Button Text
              </label>

              <input
                type="text"
                placeholder="Book Now"
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Button Link
              </label>

              <input
                type="text"
                placeholder="https://..."
                className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
              />
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold transition">
              Publish Update
            </button>
          </div>
        </div>

        <div className="mt-8 bg-green-950/40 border border-green-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Recent Posts
          </h2>

          <div className="space-y-4">
            <div className="border border-green-800 rounded-xl p-4">
              <div className="text-green-300 text-sm">
                Tee Time Alert
              </div>

              <div className="font-semibold mt-1">
                8 Tee Times Available Tomorrow
              </div>
            </div>

            <div className="border border-green-800 rounded-xl p-4">
              <div className="text-green-300 text-sm">
                Event
              </div>

              <div className="font-semibold mt-1">
                Member Guest Registration Open
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}