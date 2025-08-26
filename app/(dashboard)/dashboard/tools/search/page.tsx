export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Address Search</h2>
        <p className="muted">Search for places and zoom to location. (Demo)</p>
        <div className="card" style={{ marginTop: 12 }}>
          <div className="chart"/>
        </div>
      </div>
    </div>
  );
}