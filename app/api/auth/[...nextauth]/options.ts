import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const users = [
  { id: '1', name: 'Admin User', email: 'admin@gov.local', role: 'admin', password: 'admin123' },
  { id: '2', name: 'Dept Officer', email: 'officer@gov.local', role: 'officer', password: 'officer123' },
  { id: '3', name: 'Viewer', email: 'viewer@gov.local', role: 'viewer', password: 'viewer123' },
];

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Gov SSO (Demo)',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || 'viewer';
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role || 'viewer';
      return session;
    },
  },
  pages: { signIn: '/' },
};