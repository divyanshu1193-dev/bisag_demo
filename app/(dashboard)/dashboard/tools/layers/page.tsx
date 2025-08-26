export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Layer Control</h2>
        <p className="muted">Toggle administrative boundaries, roads, water bodies, and project layers. (Demo)</p>
        <div className="grid grid-2" style={{ marginTop: 12 }}>
          <div className="card"><strong>Administrative</strong><div className="chart"/></div>
          <div className="card"><strong>Project Layers</strong><div className="chart"/></div>
        </div>
      </div>
    </div>
  );
}