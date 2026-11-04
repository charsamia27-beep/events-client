import type { Metadata } from "next";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { EventCard } from "@/components/events/EventCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatePanel } from "@/components/ui/StatePanel";
import { getEvents } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/validators";

export const metadata: Metadata = { title: "Upcoming Events" };

type Search = { type?: string | string[]; search?: string | string[] };

const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function EventsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const type = first(params.type);
  const search = first(params.search).trim();
  const events = await getEvents({ type, search });

  const linkFor = (nextType: string) => {
    const query = new URLSearchParams();
    if (nextType) query.set("type", nextType);
    if (search) query.set("search", search);
    return query.size ? `/events?${query}` : "/events";
  };

  return (
    <div className="container page">
      <SectionHeading
        accent="Events"
        as="h1"
        lead="Past events leave this list on their own. Open any event to read the details and join."
        plain="Upcoming"
      />

      <form action="/events" className="filter-bar" role="search">
        {type && <input name="type" type="hidden" value={type} />}
        <label className="filter-search">
          <LuSearch aria-hidden="true" />
          <span className="visually-hidden">Search by title or location</span>
          <input defaultValue={search} name="search" placeholder="Search by title or location" type="search" />
        </label>
        <button className="btn btn-primary btn-small" type="submit">
          Search
        </button>
      </form>

      <nav aria-label="Filter by event type" className="type-filters">
        <Link aria-current={!type ? "true" : undefined} className="type-filter" href={linkFor("")}>
          All
        </Link>
        {EVENT_TYPES.map((name) => (
          <Link aria-current={type === name ? "true" : undefined} className="type-filter" href={linkFor(name)} key={name}>
            {name}
          </Link>
        ))}
      </nav>

      {events === null ? (
        <StatePanel
          action={<Link className="btn btn-primary" href="/events">Try again</Link>}
          text="The events server did not respond. It may be waking up, which can take up to a minute."
          title="Events could not load"
        />
      ) : events.length === 0 ? (
        <StatePanel
          action={<Link className="btn btn-primary" href="/events/create">Create an event</Link>}
          text={type || search ? "Try another search or type, or post the event you were looking for." : "Be the first to post one for your neighbourhood."}
          title="No upcoming events found"
        />
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      )}
    </div>
  );
}
