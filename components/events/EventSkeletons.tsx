"use client";

import { Skeleton } from "@heroui/react";

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-label="Loading events" className="event-grid" role="status">
      {Array.from({ length: count }, (_, index) => (
        <div className="event-card" key={index}>
          <Skeleton className="skeleton skeleton-media" />
          <div className="event-body">
            <Skeleton className="skeleton skeleton-line skeleton-line-wide" />
            <Skeleton className="skeleton skeleton-line" />
            <Skeleton className="skeleton skeleton-line" />
            <Skeleton className="skeleton skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventDetailSkeleton() {
  return (
    <div aria-label="Loading event" className="container detail-page" role="status">
      <div className="detail-grid">
        <div>
          <Skeleton className="skeleton skeleton-detail-media" />
          <Skeleton className="skeleton skeleton-line skeleton-line-wide" />
          <Skeleton className="skeleton skeleton-line" />
          <Skeleton className="skeleton skeleton-line" />
        </div>
        <Skeleton className="skeleton skeleton-panel" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div aria-label="Loading" className="container page" role="status">
      <Skeleton className="skeleton skeleton-line skeleton-line-wide" />
      <EventGridSkeleton count={3} />
    </div>
  );
}
