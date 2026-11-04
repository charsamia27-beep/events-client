import { getStats } from "@/lib/api";

export async function StatsBand() {
  const stats = await getStats();
  const items = [
    { value: stats?.upcomingEvents, label: "upcoming events" },
    { value: stats?.totalEvents, label: "events posted" },
    { value: stats?.totalJoins, label: "volunteer sign-ups" },
    { value: stats?.locations, label: "places reached" },
  ];

  return (
    <dl className="container stats-row">
      {items.map((item) => (
        <div className="stat" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value ?? "–"}</dd>
        </div>
      ))}
    </dl>
  );
}
