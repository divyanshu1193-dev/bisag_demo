"use client";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function MiniMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = L.map(ref.current, {
      center: [23.4733, 77.947998],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    (async () => {
      try {
        const res = await fetch("/api/gis/administrative");
        const geo = await res.json();
        const layer = L.geoJSON(geo, { style: { color: "#0ea5e9", weight: 1 } }).addTo(map);
        try {
          const b = layer.getBounds();
          if (b.isValid()) map.fitBounds(b, { padding: [10, 10] });
        } catch {}
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load administrative layer for MiniMap", e);
      }
    })();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: 260, width: "100%", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}
    />
  );
}