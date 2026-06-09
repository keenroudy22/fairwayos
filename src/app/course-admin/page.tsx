import Navbar from "@/components/Navbar";

export default function CourseAdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-3">
          Create Course Update
        </h1>

        <p className="text-green-300 mb-8">
          Publish updates that golfers will see in their feed.
        </p>

        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6 space-y-5">

          <div>
            <label className="block mb-2">Post Type</label>
            <select className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3">
              <option>Tee Time Alert</option>
              <option>Event</option>
              <option>Tournament</option>
              <option>Promotion</option>
              <option>Course Update</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              placeholder="8 Tee Times Available Tomorrow"
              className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              rows={5}
              placeholder="Openings from 9:00 AM - 11:30 AM due to cancellations."
              className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Button Text</label>
            <input
              type="text"
              placeholder="Book Now"
              className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Button Link</label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full rounded-xl bg-black/20 border border-green-800 px-4 py-3"
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold">
            Publish Update
          </button>
        </div>
      </div>
    </main>
  );
}