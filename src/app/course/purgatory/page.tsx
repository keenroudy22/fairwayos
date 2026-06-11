import StaticCourseProfile from "@/components/StaticCourseProfile";

export default function PurgatoryPage() {
  return (
    <StaticCourseProfile
      id="purgatory"
      name="Purgatory Golf Club"
      city="Noblesville"
      state="Indiana"
      posts={[
        {
          type: "Tournament",
          title: "Weekend Scramble Field Is Open",
          description:
            "Two-person teams can reserve a spot for this weekend's morning flight.",
          buttonText: "Register",
        },
        {
          type: "Promotion",
          title: "Twilight Rate Starts at 4:00pm",
          description:
            "Book a late-day round and get range balls included with your tee time.",
          buttonText: "View Tee Times",
        },
        {
          type: "Course Update",
          title: "Practice Facility Opens at Noon",
          description:
            "The range will open after scheduled maintenance wraps up today.",
        },
      ]}
    />
  );
}
