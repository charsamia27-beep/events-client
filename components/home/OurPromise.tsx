import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { PROMISE_IMAGE } from "@/lib/images";

export function OurPromise() {
  return (
    <section className="section">
      <div className="container split split-reverse">
        <div>
          <SectionHeading accent="Our" accentFirst align="start" plain="Promise" />
          <p className="body-text">
            Pashe is free to use. Every event shows who posted it, past events leave the list on their own,
            and only the person who created an event can change it.
          </p>
          <Link className="btn btn-primary" href="/events/create">
            Create an event
          </Link>
        </div>
        <SafeImage alt={PROMISE_IMAGE.alt} className="split-image" src={PROMISE_IMAGE.src} />
      </div>
    </section>
  );
}
