import StaticCourseProfile from "@/components/StaticCourseProfile";

export default function BearSlidePage() {
  return (
    <StaticCourseProfile
      id="bearslide"
      name="Bear Slide Golf Club"
      city="Cicero"
      state="Indiana"
      posts={[
        {
          type: "Course Update",
          title: "Greens Rolling Fast This Week",
          description:
            "The maintenance team completed topdressing and rolling ahead of league play.",
        },
        {
          type: "Tee Time Alert",
          title: "Late Afternoon Openings Today",
          description:
            "A few tee times are available after 3:30pm for golfers looking to get out.",
          buttonText: "Book Now",
        },
        {
          type: "Event",
          title: "Couples Night Returns Thursday",
          description:
            "Nine-hole couples night includes golf, dinner, and prizes after the round.",
          buttonText: "Learn More",
        },
      ]}
    />
  );
}
