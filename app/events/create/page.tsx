import type { Metadata } from "next";
import { EventForm } from "@/components/forms/EventForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = { title: "Create Event" };

export default async function CreateEventPage() {
  await requireSession("/events/create");

  return (
    <div className="container page form-page">
      <SectionHeading accent="an Event" as="h1" lead="Your email is saved with the event, so only you can change it." plain="Create" />
      <EventForm />
    </div>
  );
}
