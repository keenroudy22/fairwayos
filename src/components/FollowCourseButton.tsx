"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface FollowCourseButtonProps {
  courseId: string;
}

export default function FollowCourseButton({
  courseId,
}: FollowCourseButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [available, setAvailable] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFollowState() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      setLoggedIn(!!session);

      if (!session) {
        setIsFollowing(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("course_follows")
        .select("id")
        .eq("course_id", courseId)
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        const isMissingRelation =
          error.code === "42P01" ||
          error.message.toLowerCase().includes("relation") ||
          error.message.toLowerCase().includes("does not exist");

        if (isMissingRelation) {
          setAvailable(false);
        }

        setIsFollowing(false);
        setLoading(false);
        return;
      }

      setIsFollowing(!!data);
      setLoading(false);
    }

    void loadFollowState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setLoggedIn(!!session);
      void loadFollowState();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [courseId]);

  async function toggleFollow() {
    if (!available) {
      alert("Following will work after the course_follows table is added in Supabase.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/signin";
      return;
    }

    setSubmitting(true);

    if (isFollowing) {
      const { error } = await supabase
        .from("course_follows")
        .delete()
        .eq("course_id", courseId)
        .eq("user_id", session.user.id);

      setSubmitting(false);

      if (error) {
        alert(error.message);
        return;
      }

      setIsFollowing(false);
      window.dispatchEvent(
        new CustomEvent("course-follow-changed", {
          detail: { courseId, isFollowing: false },
        })
      );
      return;
    }

    const { error } = await supabase.from("course_follows").insert({
      course_id: courseId,
      user_id: session.user.id,
    });

    setSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    setIsFollowing(true);
    window.dispatchEvent(
      new CustomEvent("course-follow-changed", {
        detail: { courseId, isFollowing: true },
      })
    );
  }

  if (loading) {
    return (
      <button type="button" className="btn-outline" disabled>
        Loading...
      </button>
    );
  }

  if (!loggedIn) {
    return (
      <button type="button" className="btn-primary" onClick={toggleFollow}>
        Sign In to Follow
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFollow}
      disabled={submitting}
      className={isFollowing ? "btn-outline" : "btn-primary"}
    >
      {submitting ? "Saving..." : isFollowing ? "Following" : "Follow Course"}
    </button>
  );
}
