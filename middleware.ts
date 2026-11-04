import { NextRequest, NextResponse } from 'next/server';
import { auth0, isAuth0Configured } from '@/lib/auth0';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // When Auth0 is not yet configured with real tenant credentials,
  // gracefully route to demo portal instead of crashing with HTTP 500
  if (!isAuth0Configured) {
    if (pathname.startsWith('/auth/login')) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      url.searchParams.set('demo', '1');
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/auth/logout')) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.delete('demo');
      const response = NextResponse.redirect(url);
      response.cookies.delete('bytefix_demo_session');
      return response;
    }

    if (pathname.startsWith('/dashboard')) {
      return NextResponse.next();
    }
  }

  // Live Auth0 Production Flow
  const authRes = await auth0.middleware(request);

  if (pathname.startsWith('/auth')) {
    return authRes;
  }

  // Protected customer portal routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/mis-turnos')) {
    const session = await auth0.getSession(request);

    if (!session) {
      const { origin } = new URL(request.url);
      const returnTo = encodeURIComponent(pathname);
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
