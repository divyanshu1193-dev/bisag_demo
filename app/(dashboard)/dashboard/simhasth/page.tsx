export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Simhasth (Ujjain Kumbh)</h2>
        <p className="muted">Event planning, mobility corridors, sanitation zones, healthcare camps, emergency response mapping.</p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <div className="card"><strong>Corridors</strong><div className="chart"/></div>
          <div className="card"><strong>Facilities</strong><div className="chart"/></div>
          <div className="card"><strong>Incidents</strong><div className="chart"/></div>
        </div>
      </div>
    </div>
  );
}