import Link from "next/link";
import type { ReactNode } from "react";
import { LuBookOpen, LuDroplet, LuGift, LuSoup, LuSprout, LuTrash2 } from "react-icons/lu";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CAUSES: { type: string; tone: string; icon: ReactNode }[] = [
  { type: "Cleanup", tone: "cause-river", icon: <LuTrash2 /> },
  { type: "Plantation", tone: "cause-green", icon: <LuSprout /> },
  { type: "Donation", tone: "cause-orange", icon: <LuGift /> },
  { type: "Blood Drive", tone: "cause-red", icon: <LuDroplet /> },
  { type: "Food Relief", tone: "cause-gold", icon: <LuSoup /> },
  { type: "Education", tone: "cause-violet", icon: <LuBookOpen /> },
];

export function Causes() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          accent="Your Cause"
          lead="Pick a type to see every upcoming event in it."
          plain="Choose"
        />
        <div className="cause-grid">
          {CAUSES.map((cause) => (
            <Link
              className={`cause-tile ${cause.tone}`}
              href={`/events?type=${encodeURIComponent(cause.type)}`}
              key={cause.type}
            >
              <span aria-hidden="true" className="cause-icon">
                {cause.icon}
              </span>
              <span className="cause-name">{cause.type}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
