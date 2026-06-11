"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard, { Post } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";

type FeedTab = "all" | "following" | "nearby";

interface FeedExperienceProps {
  posts: Post[];
  errorMessage?: string;
}

interface NearbyLocation {
  city: string | null;
  state: string | null;
  label: string;
}

const LOCATION_STORAGE_KEY = "fairwayos-nearby-location";

function normalizeLocationValue(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

async function reverseLookupLocation(lat: number, lon: number) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not resolve your location.");
  }

  const data = await response.json();
  const address = data.address ?? {};
  const city =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    null;
  const state = address.state ?? null;

  return {
    city,
    state,
    label: [city, state].filter(Boolean).join(", "),
  } as NearbyLocation;
}

function getMissingFollowsTable(errorMessage: string) {
  const lower = errorMessage.toLowerCase();
  return lower.includes("relation") || lower.includes("does not exist");
}

export default function FeedExperience({
  posts,
  errorMessage,
}: FeedExperienceProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>("all");
  const [loggedIn, setLoggedIn] = useState(false);
  const [followedCourseIds, setFollowedCourseIds] = useState<string[]>([]);
  const [followLoading, setFollowLoading] = useState(true);
  const [followsAvailable, setFollowsAvailable] = useState(true);
  const [nearbyLocation, setNearbyLocation] = useState<NearbyLocation | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.localStorage.getItem(LOCATION_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as NearbyLocation;
    } catch {
      window.localStorage.removeItem(LOCATION_STORAGE_KEY);
      return null;
    }
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFollows() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(!!session);

      if (!session) {
        setFollowedCourseIds([]);
        setFollowLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("course_follows")
        .select("course_id")
        .eq("user_id", session.user.id);

      if (error) {
        if (getMissingFollowsTable(error.message)) {
          setFollowsAvailable(false);
        }

        setFollowedCourseIds([]);
        setFollowLoading(false);
        return;
      }

      setFollowsAvailable(true);
      setFollowedCourseIds((data ?? []).map((row) => row.course_id));
      setFollowLoading(false);
    }

    void loadFollows();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
      void loadFollows();
    });

    function handleFollowChange(event: Event) {
      const detail = (event as CustomEvent<{ courseId: string; isFollowing: boolean }>).detail;

      if (!detail) {
        return;
      }

      setFollowedCourseIds((current) => {
        if (detail.isFollowing) {
          if (current.includes(detail.courseId)) {
            return current;
          }

          return [...current, detail.courseId];
        }

        return current.filter((courseId) => courseId !== detail.courseId);
      });
    }

    window.addEventListener("course-follow-changed", handleFollowChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("course-follow-changed", handleFollowChange);
    };
  }, []);

  async function detectNearbyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not available in this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = await reverseLookupLocation(
            position.coords.latitude,
            position.coords.longitude
          );

          setNearbyLocation(location);
          window.localStorage.setItem(
            LOCATION_STORAGE_KEY,
            JSON.stringify(location)
          );
        } catch (error) {
          setLocationError(
            error instanceof Error
              ? error.message
              : "Could not determine your nearby feed."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setLocationError("Allow location access to see nearby courses.");
        setLocationLoading(false);
      }
    );
  }

  function matchesNearby(post: Post) {
    if (!nearbyLocation || !post.courses) {
      return false;
    }

    const postCity = normalizeLocationValue(post.courses.city);
    const postState = normalizeLocationValue(post.courses.state);
    const nearbyCity = normalizeLocationValue(nearbyLocation.city);
    const nearbyState = normalizeLocationValue(nearbyLocation.state);

    if (nearbyCity && postCity === nearbyCity && nearbyState && postState === nearbyState) {
      return true;
    }

    if (nearbyState && postState === nearbyState) {
      return true;
    }

    return false;
  }

  let visiblePosts = posts;

  if (activeTab === "following") {
    visiblePosts = posts.filter((post) => followedCourseIds.includes(post.course_id));
  }

  if (activeTab === "nearby") {
    visiblePosts = posts.filter(matchesNearby);
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={activeTab === "all" ? "btn-primary text-sm" : "btn-outline text-sm"}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          type="button"
          className={
            activeTab === "following" ? "btn-primary text-sm" : "btn-outline text-sm"
          }
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
        <button
          type="button"
          className={activeTab === "nearby" ? "btn-primary text-sm" : "btn-outline text-sm"}
          onClick={() => setActiveTab("nearby")}
        >
          Nearby
        </button>
      </div>

      <div className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
        {activeTab === "all" && (
          <p>Everything happening across the FairwayOS network.</p>
        )}

        {activeTab === "following" && !loggedIn && (
          <p>Sign in and follow courses to build your personal feed.</p>
        )}

        {activeTab === "following" && loggedIn && followsAvailable && !followLoading && (
          <p>
            {followedCourseIds.length} followed course
            {followedCourseIds.length === 1 ? "" : "s"} shaping this feed.
          </p>
        )}

        {activeTab === "following" && loggedIn && !followsAvailable && (
          <p>Add the `course_follows` table in Supabase to enable following.</p>
        )}

        {activeTab === "nearby" && (
          <div className="flex flex-wrap items-center gap-3">
            <p>
              {nearbyLocation
                ? `Showing courses near ${nearbyLocation.label}.`
                : "Use your location to build a nearby feed."}
            </p>
            <button
              type="button"
              onClick={detectNearbyLocation}
              className="btn-outline text-sm"
              disabled={locationLoading}
            >
              {locationLoading
                ? "Locating..."
                : nearbyLocation
                  ? "Refresh Nearby"
                  : "Use My Location"}
            </button>
          </div>
        )}

        {activeTab === "nearby" && locationError && (
          <p className="mt-2" style={{ color: "#fb7185" }}>
            {locationError}
          </p>
        )}
      </div>

      <div className="mt-8">
        {errorMessage && (
          <div className="card p-6 text-center" style={{ color: "#fb7185" }}>
            <p className="mb-1 font-semibold">Could not load feed</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {errorMessage}
            </p>
          </div>
        )}

        {!errorMessage && activeTab === "following" && loggedIn && followLoading && (
          <div className="card p-6 text-center" style={{ color: "var(--muted)" }}>
            Loading your followed courses...
          </div>
        )}

        {!errorMessage && !followLoading && visiblePosts.length === 0 && (
          <div className="card px-6 py-16 text-center" style={{ color: "var(--muted)" }}>
            <p
              className="font-display text-xl font-semibold"
              style={{ color: "var(--white)" }}
            >
              {activeTab === "following"
                ? "No posts from followed courses yet"
                : activeTab === "nearby"
                  ? "No nearby course updates right now"
                  : "The feed is empty"}
            </p>

            <p className="mb-6 mt-2 text-sm">
              {activeTab === "following"
                ? "Follow a few courses to personalize this feed."
                : activeTab === "nearby"
                  ? "Try refreshing your location or browse the full network."
                  : "No courses have posted yet."}
            </p>

            <Link href="/courses" className="btn-outline text-sm">
              Browse Courses
            </Link>
          </div>
        )}

        {!errorMessage && visiblePosts.length > 0 && (
          <div className="flex flex-col gap-4">
            {visiblePosts.map((post, i) => (
              <PostCard key={post.id} post={post} animDelay={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
