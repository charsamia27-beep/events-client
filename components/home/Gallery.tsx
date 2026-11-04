import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { GALLERY } from "@/lib/images";

export function Gallery() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          accent="in Pictures"
          lead="What community service looks like when people turn up."
          plain="Service"
        />
        <div className="gallery-grid">
          {GALLERY.map((photo) => (
            <figure className="gallery-item" key={photo.src}>
              <SafeImage alt={photo.alt} className="gallery-image" src={photo.src} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
