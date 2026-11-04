import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/forms/EventForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatePanel } from "@/components/ui/StatePanel";
import { getEvent } from "@/lib/api";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = { title: "Update Event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireSession(`/events/${id}/edit`);
  const event = await getEvent(id);
  if (!event) notFound();

  if (event.creatorEmail !== session.user.email) {
    return (
      <div className="container page">
        <StatePanel
          action={<Link className="btn btn-primary" href="/manage-events">Go to Manage Events</Link>}
          text="Only the person who created an event can update it."
          title="This isn't your event"
        />
      </div>
    );
  }

  return (
    <div className="container page form-page">
      <SectionHeading accent="Event" as="h1" lead="Change any detail. The event date must still be in the future." plain="Update" />
      <EventForm event={event} />
    </div>
  );
}
