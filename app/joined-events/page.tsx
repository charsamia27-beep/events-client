import type { Metadata } from "next";
import { JoinedList } from "@/components/events/JoinedList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = { title: "Joined Events" };

export default async function JoinedEventsPage() {
  await requireSession("/joined-events");

  return (
    <div className="container page">
      <SectionHeading accent="Events" as="h1" lead="Sorted by event date, with the earliest first." plain="Joined" />
      <JoinedList />
    </div>
  );
}
