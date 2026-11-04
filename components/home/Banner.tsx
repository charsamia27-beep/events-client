import { HERO_SLIDES } from "@/lib/images";
import { Swoosh } from "@/components/ui/Swoosh";
import { HeroCarousel } from "./HeroCarousel";

export function Banner() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">
          From one neighbour to the next:
          <br />
          real help, close to home
        </h1>
        <Swoosh className="hero-swoosh" />
        <div className="hero-stage">
          <HeroCarousel slides={HERO_SLIDES} />
        </div>
      </div>
    </section>
  );
}
