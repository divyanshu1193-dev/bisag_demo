"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Leaflet CSS only when component is rendered on client
const Map = dynamic(() => import('./viewer'), { ssr: false });

export default function MapPage() {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => setCanRender(true), []);
  return (
    <div className="container">
      <div className="card">
        <h2>Interactive Map (Madhya Pradesh)</h2>
        <p className="muted">Loads shapefiles for administrative boundaries, natural features, water, and highways.</p>
        {canRender ? <Map/> : <div className="muted">Loading map…</div>}
      </div>
    </div>
  );
}