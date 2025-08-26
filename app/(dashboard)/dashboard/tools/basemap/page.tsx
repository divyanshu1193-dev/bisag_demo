export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Basemap Switcher</h2>
        <p className="muted">Switch between satellite, terrain, and street basemaps. (Demo)</p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <div className="card"><strong>Satellite</strong><div className="chart"/></div>
          <div className="card"><strong>Terrain</strong><div className="chart"/></div>
          <div className="card"><strong>Street</strong><div className="chart"/></div>
        </div>
      </div>
    </div>
  );
}