import type { ReactNode } from "react";
import { LuCalendarCheck, LuCalendarPlus, LuListChecks, LuMoonStar, LuSearch, LuUsers } from "react-icons/lu";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES: { title: string; text: string; icon: ReactNode }[] = [
  { title: "Post an event", text: "Add the date, place and what is needed. It goes live as soon as you save it.", icon: <LuCalendarPlus /> },
  { title: "Find your cause", text: "Search by place or filter by type, from cleanups to blood drives.", icon: <LuSearch /> },
  { title: "Join in one click", text: "Read the details without an account, then log in when you are ready to join.", icon: <LuUsers /> },
  { title: "Track your dates", text: "Every event you joined stays in one list, sorted by date.", icon: <LuCalendarCheck /> },
  { title: "Manage your events", text: "Update or delete what you created. Nobody else can change your events.", icon: <LuListChecks /> },
  { title: "Use it your way", text: "Works on phone, tablet and desktop, in a light or dark theme.", icon: <LuMoonStar /> },
];

export function Features() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading accent="Do Here" plain="What You Can" />
        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span aria-hidden="true" className="feature-icon">
                {feature.icon}
              </span>
              <h3 className="feature-title">{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
