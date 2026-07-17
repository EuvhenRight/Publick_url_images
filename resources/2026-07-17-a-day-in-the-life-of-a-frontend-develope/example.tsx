/**
 * example.tsx
 *
 * A teaching artifact for "A Day in the Life: Then vs. Now".
 *
 * This file shows a plausible-looking AI-generated component that would pass
 * a quick glance at 10am but needs rework by 4pm. The bugs below are the kind
 * of thing you learn to REJECT rather than TYPE.
 *
 * Read the BUGGY version first, spot the issues, then compare to FIXED.
 */

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface UserBadgeProps {
  userId: string;
}

/* ------------------------------------------------------------------ *
 * BUGGY: looks finished, isn't. Four review-checklist failures below. *
 * ------------------------------------------------------------------ */
export function UserBadgeBuggy({ userId }: UserBadgeProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // BUG 1: no loading state — renders nothing then flickers.
    // BUG 2: no error handling — a failed fetch silently shows blank.
    // BUG 3: no cleanup — if userId changes fast, a stale response can win.
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  // BUG 4: accessibility — decorative-looking div carries meaning but no role/label.
  return <div className="badge">{user?.name}</div>;
}

/* ------------------------------------------------------------------ *
 * FIXED: what you keep after judging the output.                     *
 * ------------------------------------------------------------------ */
export function UserBadge({ userId }: UserBadgeProps) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<User>;
      })
      .then((data) => {
        setUser(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // ignore stale/cancelled
        setStatus("error");
      });

    // Cleanup prevents stale-response races when userId changes.
    return () => controller.abort();
  }, [userId]);

  if (status === "loading") {
    return <span aria-busy="true">Loading user…</span>;
  }

  if (status === "error" || !user) {
    return <span role="alert">Could not load user.</span>;
  }

  return (
    <span className="badge" aria-label={`User: ${user.name}`}>
      {user.name}
    </span>
  );
}

/*
 * REVIEW TAKEAWAYS
 * - The buggy version is exactly what fast generation produces: the happy path.
 * - Every fix corresponds to a checklist gate (loading/error/empty, async
 *   cleanup, accessibility) from guide.md.
 * - The skill isn't typing the fixed version from scratch — it's spotting the
 *   four gaps fast enough to reject the buggy one.
 */
