"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import AuthGuard from '@/components/AuthGuard';

const modules = [
  { href: '/dashboard', label: 'I. UADD', roles: ['admin','officer','viewer'] },
  { href: '/dashboard/ai-dpr', label: 'II. AI DPR Generation', roles: ['admin','officer'] },
  { href: '/dashboard/simhasth', label: 'III. Simhasth (Ujjain Kumbh)', roles: ['admin','officer'] },
  { href: '/dashboard/tax', label: 'IV. Tax', roles: ['admin','officer'] },
  { href: '/dashboard/building-permission', label: 'V. Building Permission', roles: ['admin','officer'] },
  { href: '/dashboard/nocs', label: 'VI. NOC’s', roles: ['admin','officer'] },
];

const tools = [
  { href: '/dashboard/tools/map', label: 'Interactive Map (MP)', roles: ['admin','officer'] },
  { href: '/dashboard/tools/basemap', label: 'Basemap Switcher', roles: ['admin','officer','viewer'] },
  { href: '/dashboard/tools/layers', label: 'Layer Control', roles: ['admin','officer'] },
  { href: '/dashboard/tools/measure', label: 'Measure Distance/Area', roles: ['admin','officer'] },
  { href: '/dashboard/tools/draw', label: 'Draw/Annotate', roles: ['admin'] },
  { href: '/dashboard/tools/buffer', label: 'Buffer Analysis', roles: ['admin'] },
  { href: '/dashboard/tools/search', label: 'Address Search', roles: ['admin','officer','viewer'] },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data } = useSession();
  const role = (data as any)?.role || 'viewer';

  const title = useMemo(() => {
    const m = [...modules, ...tools].find(m => m.href === pathname);
    return m?.label?.replace(/^I+\.\s*/, '') || 'UADD';
  }, [pathname]);

  const visibleModules = modules.filter(m => m.roles.includes(role));
  const visibleTools = tools.filter(t => t.roles.includes(role));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      {/* Official header */}
      <div className="official-header">
        <div className="header-left">
          <button aria-label="Toggle sidebar" className="btn secondary" onClick={() => setSidebarOpen(s => !s)} style={{ padding: '0.4rem 0.6rem' }}>≡</button>
          <div className="gov-branding">
            <div className="national-emblem" aria-hidden="true">
              {/* Inline university-style icon (no external lib required) */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#000080" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 9-4.5V17h1v2H2v-2h1V8.5L12 13l5-2.5V9L12 12 4.5 8.25 12 4l7.5 3.75.5-.25L12 2z"/>
              </svg>
            </div>
            <div className="gov-text">
              <h2>Urban Development and Housing Department / नगरीय विकास एवं आवास विभाग</h2>
              <h3>GIS and Project Management Portal</h3>
              <p></p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="badge" style={{ background: 'var(--panel-2)', color: 'var(--text)' }}>Role: {role}</span>
          <button className="btn" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </div>
        {/* Keep page title accessible for screen readers */}
        <span className="sr-only">{title}</span>
      </div>

      <div className="main" style={{ gridTemplateColumns: sidebarOpen ? '260px 1fr' : '0 1fr', transition: 'grid-template-columns 200ms ease' }}>
        <aside className="sidebar" style={{ width: sidebarOpen ? 260 : 0, overflow: 'hidden', transition: 'width 200ms ease' }}>
          <h3>Dashboards</h3>
          <ul>
            {visibleModules.map(m => (
              <li key={m.href}>
                <Link className={pathname === m.href ? 'active' : ''} href={m.href}>{m.label}</Link>
              </li>
            ))}
          </ul>
          <h3 style={{ borderTop: '1px solid var(--border)' }}>GIS Tools</h3>
          <ul>
            {visibleTools.map(t => (
              <li key={t.href}>
                <Link className={pathname === t.href ? 'active' : ''} href={t.href}>{t.label}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <section>
          {children}
        </section>
      </div>
    </AuthGuard>
  );
}