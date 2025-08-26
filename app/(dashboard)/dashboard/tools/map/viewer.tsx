"use client";
import L from 'leaflet';
import { useEffect, useRef } from 'react';

export default function Viewer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { center: [23.4733, 77.947998], zoom: 6 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    async function addLayer(name: string, color: string) {
      try {
        const res = await fetch(`/api/gis/${name}`);
        const geo = await res.json();
        const layer = L.geoJSON(geo, {
          style: { color, weight: 1 },
          pointToLayer: (_feature, latlng) => L.circleMarker(latlng, { radius: 3, color })
        });
        layer.addTo(map);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed loading layer', name, e);
      }
    }

    addLayer('administrative', '#60a5fa');
    addLayer('natural', '#34d399');
    addLayer('water', '#0ea5e9');
    addLayer('highway', '#f59e0b');

    return () => { map.remove(); };
  }, []);

  return <div style={{ height: 520, width: '100%', borderRadius: 10, overflow: 'hidden' }} ref={ref}/>;
}