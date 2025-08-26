export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Measure Distance/Area</h2>
        <p className="muted">Sketch lines and polygons to measure distances and areas. (Demo)</p>
        <div className="card" style={{ marginTop: 12 }}>
          <div className="chart"/>
        </div>
      </div>
    </div>
  );
}