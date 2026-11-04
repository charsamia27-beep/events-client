"use client";

import { StatePanel } from "@/components/ui/StatePanel";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page">
      <StatePanel
        action={<button className="btn btn-primary" onClick={reset} type="button">Try again</button>}
        text="Something stopped this page from loading. Try again, or go back to the home page."
        title="This page could not load"
      />
    </div>
  );
}
