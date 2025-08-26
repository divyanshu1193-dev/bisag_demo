# Gov Projects GIS Demo (Vercel-ready)

A minimal Next.js 14 app with:
- **SSO-style login** (demo credentials) using NextAuth Credentials provider
- **Role-based access** persisted in JWT session
- **Dashboard** with analytics cards and filters
- **GIS sidebar** showcasing modules and common tools inspired by MP GeoPortal
- **AI chatbot (stub)** via `/api/chat`

## Quick start

1. Install deps:
```bash
npm install
```
2. Run locally:
```bash
npm run dev
```
3. Deploy to Vercel:
- Push this repo to GitHub/GitLab/Bitbucket
- Import in Vercel and deploy (no extra config required)

## Demo Login
- Admin: `admin@gov.local` / `admin123`
- Dept Officer: `officer@gov.local` / `officer123`
- Viewer: `viewer@gov.local` / `viewer123`

After login you will be redirected to `/dashboard`.

## Notes
- Replace demo auth with real SSO (SAML/OIDC) later.
- Extend sidebar with more GIS modules from your list.# bisag_demo
