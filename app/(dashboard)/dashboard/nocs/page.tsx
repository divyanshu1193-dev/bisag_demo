import { PieChart, BarChart } from '../charts/Charts';
export default function Page() {
  return (
    <div className="container">
      <div className="card">
        <h2>NOC Dashboard</h2>
        <p className="muted">Department-wise NOC requests, approvals, and average turnaround time.</p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <div className="card"><strong>Pending</strong>
            <BarChart values={[40,32,18]} labels={["PWD","PHED","UDHD"]} color="#60a5fa"/>
          </div>
          <div className="card"><strong>Approved</strong>
            <BarChart values={[120,90,60]} labels={["PWD","PHED","UDHD"]} color="#34d399"/>
          </div>
          <div className="card"><strong>Avg TAT</strong>
            <PieChart values={[35,45,20]} labels={["<7d","7-14d",">14d"]} colors={["#a7f3d0","#fde68a","#fca5a5"]}/>
          </div>
        </div>
      </div>
    </div>
  );
}