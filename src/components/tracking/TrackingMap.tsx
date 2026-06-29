"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon, DivIcon } from "leaflet";
import type { FakeOrder } from "~/store/orderStore";
import {
  EVENT_LOCATIONS,
  WAREHOUSE_ORIGIN,
  lerp,
  progressFromTime,
} from "~/lib/tracking";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

export function TrackingMap({ order }: { order: FakeOrder }) {
  const [tick, setTick] = useState(0);
  type LIcon = Icon | DivIcon;
  const [icons, setIcons] = useState<{
    origin: LIcon;
    dest: LIcon;
    package: LIcon;
  } | null>(null);

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    void import("leaflet").then((L) => {
      const icon = (emoji: string, color: string) =>
        L.divIcon({
          className: "dopa-marker",
          html: `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${color};box-shadow:0 0 18px ${color};font-size:18px;border:2px solid white">${emoji}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
      setIcons({
        origin: icon("📦", "#7c3aed"),
        dest: icon("🏠", "#f59e0b"),
        package: icon("🚚", "#ef4444"),
      });
    });
  }, []);

  const path = useMemo(() => {
    const event = EVENT_LOCATIONS[order.eventKey];
    return [
      WAREHOUSE_ORIGIN,
      event.coords,
      [order.destination.lat, order.destination.lng] as [number, number],
    ];
  }, [order]);

  const current = useMemo<[number, number]>(() => {
    void tick;
    const t = progressFromTime(order.createdAt, 180);
    const segCount = path.length - 1;
    const segPos = t * segCount;
    const segIdx = Math.min(Math.floor(segPos), segCount - 1);
    const local = segPos - segIdx;
    return lerp(path[segIdx]!, path[segIdx + 1]!, local);
  }, [order, path, tick]);

  if (!icons) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-border-subtle bg-bg-card/40">
        <span className="font-mono text-sm text-text-muted">a localizar pacote...</span>
      </div>
    );
  }

  const center: [number, number] = [
    (WAREHOUSE_ORIGIN[0] + order.destination.lat) / 2,
    (WAREHOUSE_ORIGIN[1] + order.destination.lng) / 2,
  ];

  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border-subtle">
      <MapContainer
        center={center}
        zoom={3}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: "#0d0d0d" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Polyline
          positions={path}
          pathOptions={{ color: "#7c3aed", weight: 3, dashArray: "8 6", opacity: 0.7 }}
        />
        <Marker position={WAREHOUSE_ORIGIN} icon={icons.origin}>
          <Popup>📦 Armazém</Popup>
        </Marker>
        <Marker position={current} icon={icons.package}>
          <Popup>🚚 O teu pacote</Popup>
        </Marker>
        <Marker
          position={[order.destination.lat, order.destination.lng]}
          icon={icons.dest}
        >
          <Popup>🏠 Tua casa</Popup>
        </Marker>
      </MapContainer>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-primary/20" />
    </div>
  );
}
