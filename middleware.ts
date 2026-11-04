import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  // Allow auth routes to be handled by Auth0 SDK (/auth/login, /auth/logout, /auth/callback)
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authRes;
  }

  // Protected customer portal routes
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/mis-turnos')
  ) {
    const session = await auth0.getSession(request);

    if (!session) {
      const { origin } = new URL(request.url);
      const returnTo = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(`${origin}/auth/login?returnTo=${returnTo}`);
    }
  }

  return authRes;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
