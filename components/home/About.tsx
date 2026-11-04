import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { ABOUT_IMAGE } from "@/lib/images";

export function About() {
  return (
    <section className="section section-after-hero">
      <div className="container split">
        <SafeImage alt={ABOUT_IMAGE.alt} className="split-image" src={ABOUT_IMAGE.src} />
        <div>
          <SectionHeading align="start" accent="next door" plain="Help starts" />
          <p className="body-text">
            Pashe means &ldquo;beside you&rdquo; in Bangla. It gives neighbours one simple place to organise
            local service work, from a blanket drive in the cold months to a Saturday reading circle.
          </p>
          <ul className="check-list">
            <li>See what is happening near you this month</li>
            <li>Sign up in one click and keep your dates in one list</li>
            <li>Start your own event when you spot a need</li>
          </ul>
          <Link className="btn btn-primary" href="/events">
            See upcoming events
          </Link>
        </div>
      </div>
    </section>
  );
}
