import Link from "next/link";
import { StatePanel } from "@/components/ui/StatePanel";

export default function NotFound() {
  return (
    <div className="container page">
      <StatePanel
        action={<Link className="btn btn-primary" href="/events">See upcoming events</Link>}
        text="The link may be wrong, or this event may have been deleted."
        title="This page doesn't exist"
      />
    </div>
  );
}
