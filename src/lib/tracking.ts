import { hashCode } from "./utils";

export const TRACKING_EVENTS = [
  "whale",
  "ufo",
  "pirates",
  "bermuda",
  "volcano",
  "turtle",
] as const;

export type TrackingEvent = (typeof TRACKING_EVENTS)[number];

export const EVENT_LOCATIONS: Record<
  TrackingEvent,
  { coords: [number, number]; locationKey: string }
> = {
  whale: { coords: [35.5, -40.2], locationKey: "atlantic" },
  ufo: { coords: [55.0, 10.0], locationKey: "space" },
  pirates: { coords: [30.0, 32.5], locationKey: "suez" },
  bermuda: { coords: [25.0, -71.0], locationKey: "bermuda" },
  volcano: { coords: [64.9, -19.0], locationKey: "iceland" },
  turtle: { coords: [38.7, -9.1], locationKey: "neighborhood" },
};

export const WAREHOUSE_ORIGIN: [number, number] = [50.1, 8.7];

export function pickEvent(trackingId: string): TrackingEvent {
  const idx = hashCode(trackingId) % TRACKING_EVENTS.length;
  return TRACKING_EVENTS[idx]!;
}

export function destinationFromAddress(zip: string): [number, number] {
  const hash = hashCode(zip || "1000-000");
  const lat = 36 + (hash % 800) / 100;
  const lng = -9 + ((hash >> 8) % 400) / 100;
  return [Number(lat.toFixed(4)), Number(lng.toFixed(4))];
}

export type TimelineStage = {
  key: "received" | "paid" | "preparing" | "shipped" | "transit" | "delivered";
  minutesAgo: number;
  done: boolean;
  active?: boolean;
};

export function buildTimeline(createdAt: number): TimelineStage[] {
  const elapsedMin = Math.floor((Date.now() - createdAt) / 60000);
  return [
    { key: "received", minutesAgo: Math.max(elapsedMin, 1), done: true },
    { key: "paid", minutesAgo: Math.max(elapsedMin - 1, 0), done: true },
    { key: "preparing", minutesAgo: Math.max(elapsedMin - 2, 0), done: true },
    { key: "shipped", minutesAgo: Math.max(elapsedMin - 3, 0), done: true },
    {
      key: "transit",
      minutesAgo: 0,
      done: false,
      active: true,
    },
    { key: "delivered", minutesAgo: 0, done: false },
  ];
}

export function lerp(
  a: [number, number],
  b: [number, number],
  t: number,
): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export function progressFromTime(createdAt: number, totalMinutes = 120): number {
  const elapsedMin = (Date.now() - createdAt) / 60000;
  return Math.min(Math.max(elapsedMin / totalMinutes, 0.05), 0.85);
}
