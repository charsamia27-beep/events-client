"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { privateFetch } from "@/lib/private-fetch";
import type { EventItem } from "@/lib/types";
import { StatePanel } from "@/components/ui/StatePanel";
import { EventCard } from "./EventCard";
import { EventGridSkeleton } from "./EventSkeletons";

export function JoinedList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    setEvents(null);
    try {
      const response = await privateFetch("/joined");
      if (!response.ok) throw new Error();
      setEvents(await response.json());
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (failed) {
    return (
      <StatePanel
        action={<button className="btn btn-primary" onClick={load} type="button">Try again</button>}
        text="The events server did not respond. It may be waking up, which can take up to a minute."
        title="Your events could not load"
      />
    );
  }
  if (!events) return <EventGridSkeleton count={3} />;
  if (events.length === 0) {
    return (
      <StatePanel
        action={<Link className="btn btn-primary" href="/events">See upcoming events</Link>}
        text="Open an upcoming event and press Join Event. It will appear here."
        title="You haven't joined any events yet"
      />
    );
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </div>
  );
}
