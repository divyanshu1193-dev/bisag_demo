import './globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Gov GIS Project Dashboard',
  description: 'Demo with SSO login, role-based access, GIS tools, analytics, and AI chatbot',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}