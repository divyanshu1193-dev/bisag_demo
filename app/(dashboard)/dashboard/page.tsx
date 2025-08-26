"use client";
import { useMemo, useState } from 'react';
import { PieChart, BarChart } from './charts/Charts';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
const MiniMap = dynamic(() => import('./MiniMap'), { ssr: false });

// Sample data reused to drive charts and lists
const sectors = [
  { id: 'roads', name: 'Roads & Highways', dept: 'PWD', progress: 72, budget: 1520 },
  { id: 'water', name: 'Water Supply', dept: 'PHED', progress: 55, budget: 980 },
  { id: 'health', name: 'Health & Hospitals', dept: 'Health', progress: 38, budget: 1320 },
  { id: 'edu', name: 'Education Infra', dept: 'Education', progress: 64, budget: 860 },
  { id: 'smartcity', name: 'Smart City', dept: 'Urban Dev', progress: 81, budget: 2040 },
];

export default function DashboardPage() {
  const { data } = useSession();
  const role = (data as any)?.role || 'viewer';

  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return sectors.filter(s =>
      (deptFilter === 'all' || s.dept === deptFilter) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) || s.dept.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, deptFilter]);

  const sectorLabels = sectors.map(s => s.name.split(' ')[0]);
  const sectorCounts = [124, 86, 42, 65, 37];
  const budgets = sectors.map(s => s.budget);

  // Derive status distribution from progress to approximate screenshot look
  const status = useMemo(() => {
    const completed = sectors.filter(s => s.progress >= 80).length;
    const onTrack = sectors.filter(s => s.progress >= 50 && s.progress < 80).length;
    const atRisk = sectors.filter(s => s.progress < 50).length;
    return { completed, onTrack, atRisk };
  }, []);

  return (
    <div className="container">
      {/* Top filters/search */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="flex items-center justify-between">
          <input className="search" placeholder="Search projects, departments…" value={query} onChange={e => setQuery(e.target.value)} />
          <select className="search" style={{ maxWidth: 240, marginLeft: 8 }} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="all">All Departments</option>
            {[...new Set(sectors.map(s => s.dept))].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-3">
        <div className="card kpi-card">
          <div className="kpi">1,247</div>
          <div className="muted">Active Projects</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi">₹8,720 Cr</div>
          <div className="muted">Total Allocated Budget</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi">68%</div>
          <div className="muted">Avg. Progress</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Projects by Sector</h3>
          <PieChart values={sectorCounts} labels={sectorLabels} colors={["#60a5fa","#34d399","#f472b6","#fbbf24","#a78bfa"]} />
        </div>
        <div className="card">
          <h3>Budget by Sector (₹ Cr)</h3>
          <BarChart values={budgets} labels={sectorLabels} color="#93c5fd" />
        </div>
      </div>

      {/* Status and list row */}
      <div className="grid grid-2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Status Distribution</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '0.75rem', marginTop: 8 }}>
            <div className="pill success">Completed: {status.completed}</div>
            <div className="pill warn">On Track: {status.onTrack}</div>
            <div className="pill danger">At Risk: {status.atRisk}</div>
          </div>
          <div style={{ marginTop: 12 }}>
            {sectors.map(s => (
              <div key={s.id} style={{ margin: '8px 0' }}>
                <div className="flex items-center justify-between">
                  <span className="muted" style={{ fontSize: 12 }}>{s.name}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{s.progress}%</span>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 8 }}>
                  <div style={{ width: `${s.progress}%`, height: '100%', background: s.progress >= 80 ? '#16a34a' : s.progress >= 50 ? '#0ea5e9' : '#ef4444', borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <h3>Department Performance</h3>
            <span className="badge">Monthly</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '0.5rem' }}>
            {sectors.map(s => (
              <div key={s.id} className="card" style={{ padding: '0.75rem' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <strong>{s.dept}</strong>
                    <div className="muted" style={{ fontSize: 12 }}>{s.name}</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--panel-2)', color: 'var(--text)' }}>₹{s.budget} Cr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map/Snapshot row (approximate) */}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <h3>Map Snapshot</h3>
          <a className="btn secondary" href="/dashboard/tools/map">Open Interactive Map</a>
        </div>
        <MiniMap />
      </div>
    </div>
  );
}