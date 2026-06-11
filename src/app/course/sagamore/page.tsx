import StaticCourseProfile from "@/components/StaticCourseProfile";

export default function SagamorePage() {
  return (
    <StaticCourseProfile
      id="sagamore"
      name="Sagamore Golf Club"
      city="Noblesville"
      state="Indiana"
      posts={[
        {
          type: "Tee Time Alert",
          title: "8 Tee Times Available Tomorrow",
          description:
            "Openings from 9:00am to 11:30am are available due to cancellations.",
          buttonText: "Book Now",
        },
        {
          type: "Event",
          title: "Member Guest Registration Open",
          description:
            "Registration closes June 15. Teams can register through the pro shop.",
          buttonText: "Learn More",
        },
        {
          type: "Course Update",
          title: "Cart Path Only This Morning",
          description:
            "Due to overnight rain, carts will remain on paths until further notice.",
        },
      ]}
    />
  );
}
