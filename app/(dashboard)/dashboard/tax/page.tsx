import { PieChart, BarChart } from '../charts/Charts';
export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Municipal Tax Dashboard</h2>
        <p className="muted">Property tax overlays with ward-level revenue and defaulter analysis.</p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <div className="card"><strong>Collections (YTD)</strong>
            <BarChart values={[120, 140, 90, 160]} labels={["Q1","Q2","Q3","Q4"]} color="#60a5fa"/>
          </div>
          <div className="card"><strong>Defaulters (Count)</strong>
            <BarChart values={[220,180,200,150]} labels={["Ward 1","Ward 2","Ward 3","Ward 4"]} color="#fca5a5"/>
          </div>
          <div className="card"><strong>Recovery Rate</strong>
            <PieChart values={[65, 35]} labels={["Recovered","Pending"]} colors={["#34d399","#fbbf24"]}/>
          </div>
        </div>
      </div>
    </div>
  );
}