"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCircleCheck, LuUsers } from "react-icons/lu";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { errorMessage, privateFetch } from "@/lib/private-fetch";
import type { EventItem } from "@/lib/types";

interface JoinPanelProps {
  eventId: string;
  isPast: boolean;
  initialCount: number;
  creatorEmail: string;
}

export function JoinPanel({ eventId, isPast, initialCount, creatorEmail }: JoinPanelProps) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(false);
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(initialCount);

  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) {
      setJoined(false);
      return;
    }
    let active = true;
    setChecking(true);
    privateFetch("/joined")
      .then((response) => (response.ok ? response.json() : []))
      .then((list: EventItem[]) => {
        if (active) setJoined(list.some((event) => event._id === eventId));
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [userId, eventId]);

  async function handleJoin() {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }
    setPending(true);
    try {
      const response = await privateFetch(`/events/${eventId}/join`, { method: "POST" });
      if (response.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event");
      } else if (!response.ok) {
        toast.error(await errorMessage(response, "You could not join this event. Try again"));
      } else {
        setJoined(true);
        setCount((current) => current + 1);
        toast.success("You joined this event");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "You could not join this event. Try again");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="join-panel">
      <p className="join-count">
        <LuUsers aria-hidden="true" /> {count} {count === 1 ? "person has" : "people have"} joined
      </p>
      {isPast ? (
        <p className="join-note">This event has already taken place, so it can no longer be joined.</p>
      ) : joined ? (
        <>
          <p className="join-done">
            <LuCircleCheck aria-hidden="true" /> You have joined this event
          </p>
          <Link className="btn btn-outline btn-block" href="/joined-events">
            See my joined events
          </Link>
        </>
      ) : (
        <Button
          className="btn btn-primary btn-block"
          isDisabled={sessionPending || checking}
          isPending={pending}
          onPress={handleJoin}
        >
          Join Event
        </Button>
      )}
      {!sessionPending && !session && !isPast && <p className="join-note">You will be asked to log in first.</p>}
      {session?.user.email === creatorEmail && (
        <Link className="btn btn-outline btn-block" href={`/events/${eventId}/edit`}>
          Update this event
        </Link>
      )}
    </div>
  );
}
