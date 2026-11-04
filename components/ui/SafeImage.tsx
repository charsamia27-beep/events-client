"use client";

import { useEffect, useState } from "react";
import { LuImageOff } from "react-icons/lu";

/**
 * People paste any URL as an event thumbnail, so next/image's host list can't apply.
 * If a link is broken, a quiet panel keeps the card the same size.
 */
export function SafeImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div aria-label={alt} className={`image-fallback ${className ?? ""}`} role="img">
        <LuImageOff aria-hidden="true" size={28} />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} src={src} />;
}
