import type { EventItem, Stats } from "./types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

async function getJson<T>(path: string): Promise<T | null> {
  try {
    // no-store keeps past events off the page without a rebuild.
    const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

export const getRecentEvents = () => getJson<EventItem[]>("/events/recent");
export const getStats = () => getJson<Stats>("/stats");
export const getEvent = (id: string) => getJson<EventItem>(`/events/${encodeURIComponent(id)}`);

export function getEvents(filters: { type?: string; search?: string } = {}) {
  const query = new URLSearchParams();
  if (filters.type) query.set("type", filters.type);
  if (filters.search) query.set("search", filters.search);
  const suffix = query.size ? `?${query}` : "";
  return getJson<EventItem[]>(`/events${suffix}`);
}
