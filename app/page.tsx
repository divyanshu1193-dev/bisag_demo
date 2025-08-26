"use client";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleLogin = async (role: 'admin'|'officer'|'viewer') => {
    const creds = {
      admin: { email: 'admin@gov.local', password: 'admin123' },
      officer: { email: 'officer@gov.local', password: 'officer123' },
      viewer: { email: 'viewer@gov.local', password: 'viewer123' },
    }[role];
    await signIn('credentials', { ...creds, callbackUrl: '/dashboard' });
  };

  return (
    <div className="auth-wrapper">
      <div className="hero" aria-hidden />
      <div className="auth-panel">
        <div className="auth-box">
          <h1 style={{ marginBottom: '0.25rem', whiteSpace: 'normal' }}>GIS Projects Portal</h1>
          <p className="muted" style={{ marginTop: 0 }}>Urban Development and Housing Department</p>

          <div className="card" style={{ marginTop: '1rem' }}>
            <label>Email</label>
            <input className="search" placeholder="Use quick role buttons below" disabled />
            <label style={{ marginTop: '0.5rem' }}>Password</label>
            <input className="search" placeholder="Auto-filled by role" disabled />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn" onClick={() => handleLogin('admin')}>Login as Admin</button>
              <button className="btn" onClick={() => handleLogin('officer')}>Dept Officer</button>
              <button className="btn" onClick={() => handleLogin('viewer')}>Viewer</button>
            </div>
            <p className="muted" style={{ fontSize: 12, marginTop: 10 }}>
              This mimics SSO. Replace with real SAML/OIDC later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}