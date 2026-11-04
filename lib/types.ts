export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName: string;
  joinedCount?: number;
}

export interface Stats {
  upcomingEvents: number;
  totalEvents: number;
  totalJoins: number;
  locations: number;
}
