import type { ReactNode } from "react";

/** One look for empty lists, failed requests and blocked pages. */
export function StatePanel({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="state-panel">
      <h2 className="state-title">{title}</h2>
      <p className="state-text">{text}</p>
      {action}
    </div>
  );
}
