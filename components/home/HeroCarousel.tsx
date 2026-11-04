"use client";

import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { SafeImage } from "@/components/ui/SafeImage";

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const go = (step: number) => setActive((current) => (current + step + slides.length) % slides.length);

  return (
    <section
      aria-label="Photos of community service"
      className="carousel"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <figure aria-hidden={index !== active} className="carousel-slide" data-active={index === active} key={slide.src}>
          <SafeImage alt={slide.alt} className="carousel-image" src={slide.src} />
          <figcaption className="carousel-caption">{slide.caption}</figcaption>
        </figure>
      ))}
      <button aria-label="Previous photo" className="carousel-arrow carousel-prev" onClick={() => go(-1)} type="button">
        <LuChevronLeft size={22} />
      </button>
      <button aria-label="Next photo" className="carousel-arrow carousel-next" onClick={() => go(1)} type="button">
        <LuChevronRight size={22} />
      </button>
      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <button
            aria-current={index === active}
            aria-label={`Show photo ${index + 1} of ${slides.length}`}
            className="carousel-dot"
            key={slide.src}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
