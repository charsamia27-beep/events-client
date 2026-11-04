import Link from "next/link";
import type { ReactNode } from "react";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatEventDate } from "@/lib/format";
import type { EventItem } from "@/lib/types";

export function EventCard({ event, actions }: { event: EventItem; actions?: ReactNode }) {
  return (
    <article className="event-card">
      <div className="event-media">
        <SafeImage alt={event.title} className="event-image" src={event.thumbnail} />
        <span className="event-type">{event.eventType}</span>
      </div>
      <div className="event-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-meta">
          <LuMapPin aria-hidden="true" /> {event.location}
        </p>
        <p className="event-meta">
          <LuCalendarDays aria-hidden="true" /> {formatEventDate(event.eventDate)}
        </p>
        <div className="event-actions">
          {actions ?? (
            <Link className="btn btn-primary btn-small" href={`/events/${event._id}`}>
              View Event
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
