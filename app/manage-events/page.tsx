import type { Metadata } from "next";
import { ManageList } from "@/components/events/ManageList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { requireSession } from "@/lib/require-session";

export const metadata: Metadata = { title: "Manage Events" };

export default async function ManageEventsPage() {
  await requireSession("/manage-events");

  return (
    <div className="container page">
      <SectionHeading accent="Events" as="h1" lead="Update or delete the events you created." plain="Manage" />
      <ManageList />
    </div>
  );
}
