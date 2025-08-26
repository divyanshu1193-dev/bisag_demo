export { default } from 'next-auth/middleware';

// Protect dashboard and future modules. Public: '/', '/api/auth/*'
export const config = {
  matcher: ['/dashboard/:path*'],
};