import StaticCourseProfile from "@/components/StaticCourseProfile";

export default function PebblebrookPage() {
  return (
    <StaticCourseProfile
      id="pebblebrook"
      name="Pebble Brook Golf Club"
      city="Noblesville"
      state="Indiana"
      posts={[
        {
          type: "Tee Time Alert",
          title: "Morning Times Added for Friday",
          description:
            "Several foursomes opened between 8:20am and 10:10am on the north course.",
          buttonText: "Book Now",
        },
        {
          type: "Event",
          title: "Junior Clinic Signups Are Live",
          description:
            "A new clinic block starts next week for beginner and intermediate juniors.",
          buttonText: "Learn More",
        },
        {
          type: "Promotion",
          title: "Replay Rate Available Today",
          description:
            "Golfers with a morning round can add an afternoon replay while space remains.",
        },
      ]}
    />
  );
}
