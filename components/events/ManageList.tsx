"use client";

import { AlertDialog, Button } from "@heroui/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { StatePanel } from "@/components/ui/StatePanel";
import { errorMessage, privateFetch } from "@/lib/private-fetch";
import type { EventItem } from "@/lib/types";
import { EventCard } from "./EventCard";
import { EventGridSkeleton } from "./EventSkeletons";

export function ManageList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [target, setTarget] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    setEvents(null);
    try {
      const response = await privateFetch("/events/mine");
      if (!response.ok) throw new Error();
      setEvents(await response.json());
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmDelete() {
    if (!target) return;
    setDeleting(true);
    try {
      const response = await privateFetch(`/events/${target._id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error(await errorMessage(response, "The event could not be deleted. Try again"));
        return;
      }
      setEvents((current) => current?.filter((event) => event._id !== target._id) ?? null);
      toast.success("Event deleted");
      setTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The event could not be deleted. Try again");
    } finally {
      setDeleting(false);
    }
  }

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
        action={<Link className="btn btn-primary" href="/events/create">Create an event</Link>}
        text="Events you create will appear here, ready to update or delete."
        title="You haven't created any events yet"
      />
    );
  }

  return (
    <>
      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            actions={
              <>
                <Link className="btn btn-primary btn-small" href={`/events/${event._id}/edit`}>
                  Update
                </Link>
                <Button className="btn btn-danger btn-small" onPress={() => setTarget(event)}>
                  Delete
                </Button>
              </>
            }
            event={event}
            key={event._id}
          />
        ))}
      </div>

      <AlertDialog>
        <AlertDialog.Backdrop isOpen={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="confirm-dialog">
              <AlertDialog.Header>
                <AlertDialog.Heading>Delete this event?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  &ldquo;{target?.title}&rdquo; and everyone&rsquo;s sign-ups for it will be removed. This can&rsquo;t be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button className="btn btn-outline btn-small" onPress={() => setTarget(null)}>
                  Keep event
                </Button>
                <Button className="btn btn-danger-solid btn-small" isPending={deleting} onPress={confirmDelete}>
                  Delete event
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
