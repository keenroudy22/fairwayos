import Link from "next/link";

export type PostType =
  | "tee-time"
  | "event"
  | "promotion"
  | "tournament"
  | "general"
  | "Tee Time Alert"
  | "Event"
  | "Promotion"
  | "Tournament"
  | "Course Update";

export interface Post {
  id: string;
  course_id: string;
  type: PostType;
  title: string;
  description: string;
  button_text: string | null;
  button_link: string | null;
  created_at: string;
  courses?: { id: string; name: string } | null;
}

const TYPE_CONFIG: Record<
  string,
  { label: string; cardClass: string; badgeClass: string }
> = {
  "tee-time": {
    label: "TEE TIME",
    cardClass: "type-tee-time",
    badgeClass: "badge-tee-time",
  },
  "Tee Time Alert": {
    label: "TEE TIME",
    cardClass: "type-tee-time",
    badgeClass: "badge-tee-time",
  },
  event: {
    label: "EVENT",
    cardClass: "type-event",
    badgeClass: "badge-event",
  },
  Event: {
    label: "EVENT",
    cardClass: "type-event",
    badgeClass: "badge-event",
  },
  promotion: {
    label: "PROMOTION",
    cardClass: "type-promotion",
    badgeClass: "badge-promotion",
  },
  Promotion: {
    label: "PROMOTION",
    cardClass: "type-promotion",
    badgeClass: "badge-promotion",
  },
  tournament: {
    label: "TOURNAMENT",
    cardClass: "type-tournament",
    badgeClass: "badge-tournament",
  },
  Tournament: {
    label: "TOURNAMENT",
    cardClass: "type-tournament",
    badgeClass: "badge-tournament",
  },
  general: {
    label: "UPDATE",
    cardClass: "type-general",
    badgeClass: "badge-general",
  },
  "Course Update": {
    label: "UPDATE",
    cardClass: "type-general",
    badgeClass: "badge-general",
  },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);

  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;

  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;

  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function PostCard({
  post,
  animDelay = 0,
}: {
  post: Post;
  animDelay?: number;
}) {
  const config = TYPE_CONFIG[post.type] ?? TYPE_CONFIG.general;

  return (
    <div
      className={`card post-card ${config.cardClass} fade-up p-5 sm:p-6`}
      style={{
        animationDelay: `${animDelay * 0.05}s`,
      }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`type-badge ${config.badgeClass}`}>
            {config.label}
          </span>

          {post.courses?.name && (
            <Link
              href={`/course/${post.course_id}`}
              className="font-semibold hover:underline"
              style={{ color: "var(--sand)" }}
            >
              {post.courses.name}
            </Link>
          )}
        </div>

        <span
          className="shrink-0 text-xs"
          style={{ color: "var(--muted)" }}
        >
          {timeAgo(post.created_at)}
        </span>
      </div>

      <h2
        className="text-xl font-semibold mb-3"
        style={{ color: "var(--white)" }}
      >
        {post.title}
      </h2>

      <p
        className="leading-relaxed mb-5"
        style={{ color: "var(--body-text)" }}
      >
        {post.description}
      </p>

      {post.button_link && (
        <a
          href={post.button_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
        >
          {post.button_text || "Learn More"}
        </a>
      )}
    </div>
  );
}
