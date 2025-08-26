export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Draw / Annotate</h2>
        <p className="muted">Add points, lines, polygons and notes to the map. (Demo)</p>
        <div className="card" style={{ marginTop: 12 }}>
          <div className="chart"/>
        </div>
      </div>
    </div>
  );
}