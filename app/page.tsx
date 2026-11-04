import { Suspense } from "react";
import { EventGridSkeleton } from "@/components/events/EventSkeletons";
import { About } from "@/components/home/About";
import { Banner } from "@/components/home/Banner";
import { Features } from "@/components/home/Features";
import { Promise as OurPromise } from "@/components/home/Promise";
import { RecentEvents } from "@/components/home/RecentEvents";
import { StatsBand } from "@/components/home/StatsBand";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Banner />
      <About />
      <Features />
      <OurPromise />
      <section aria-label="Pashe in numbers" className="stats-band">
        <Suspense fallback={<div className="stats-placeholder" />}>
          <StatsBand />
        </Suspense>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            accent="Soon"
            lead="The next six events on the calendar."
            plain="Happening"
          />
          <Suspense fallback={<EventGridSkeleton />}>
            <RecentEvents />
          </Suspense>
        </div>
      </section>
    </>
  );
}
