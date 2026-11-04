import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LuCalendarDays, LuMapPin, LuUserRound } from "react-icons/lu";
import { JoinPanel } from "@/components/events/JoinPanel";
import { SafeImage } from "@/components/ui/SafeImage";
import { getEvent } from "@/lib/api";
import { formatEventDate } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).id);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const isPast = new Date(event.eventDate).getTime() <= Date.now();

  return (
    <div className="container detail-page">
      <div className="detail-grid">
        <article>
          <div className="detail-media">
            <SafeImage alt={event.title} className="event-image" src={event.thumbnail} />
            <span className="event-type">{event.eventType}</span>
          </div>
          <h1 className="detail-title">{event.title}</h1>
          <p className="detail-description">{event.description}</p>
        </article>
        <aside className="detail-side">
          <h2 className="detail-side-title">Event details</h2>
          <p className="event-meta">
            <LuCalendarDays aria-hidden="true" /> {formatEventDate(event.eventDate)}
          </p>
          <p className="event-meta">
            <LuMapPin aria-hidden="true" /> {event.location}
          </p>
          <p className="event-meta">
            <LuUserRound aria-hidden="true" /> Posted by {event.creatorName}
          </p>
          <JoinPanel
            creatorEmail={event.creatorEmail}
            eventId={event._id}
            initialCount={event.joinedCount ?? 0}
            isPast={isPast}
          />
        </aside>
      </div>
    </div>
  );
}
