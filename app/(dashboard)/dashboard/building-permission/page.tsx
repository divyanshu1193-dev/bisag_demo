import { PieChart, BarChart } from '../charts/Charts';
export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>Building Permission Dashboard</h2>
        <p className="muted">Applications by stage, GIS Zoning checks, SLA compliance and approvals.</p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <div className="card"><strong>Applications by Stage</strong>
            <BarChart values={[30, 45, 22, 15]} labels={["Submitted","Scrutiny","Approved","Rejected"]} color="#60a5fa"/>
          </div>
          <div className="card"><strong>Zoning Compliance</strong>
            <PieChart values={[68, 32]} labels={["Compliant","Non-Compliant"]} colors={["#34d399","#fca5a5"]}/>
          </div>
          <div className="card"><strong>SLA Compliance</strong>
            <BarChart values={[85, 78, 92]} labels={["Planning","Fire","Env"]} color="#a78bfa"/>
          </div>
        </div>
      </div>
    </div>
  );
}