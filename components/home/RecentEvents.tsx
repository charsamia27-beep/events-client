import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { StatePanel } from "@/components/ui/StatePanel";
import { getRecentEvents } from "@/lib/api";

export async function RecentEvents() {
  const events = await getRecentEvents();

  if (events === null) {
    return (
      <StatePanel
        action={<Link className="btn btn-primary" href="/events">Open Upcoming Events</Link>}
        text="The events server did not respond. It may be waking up, which can take up to a minute."
        title="Events could not load"
      />
    );
  }

  if (events.length === 0) {
    return (
      <StatePanel
        action={<Link className="btn btn-primary" href="/events/create">Create an event</Link>}
        text="Be the first to post one for your neighbourhood."
        title="No upcoming events yet"
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
