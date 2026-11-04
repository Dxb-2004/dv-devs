import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const isAuth0Configured = Boolean(
  process.env.AUTH0_DOMAIN &&
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_SECRET &&
  !process.env.AUTH0_DOMAIN.includes('dummy') &&
  !process.env.AUTH0_DOMAIN.includes('bytefix.us.auth0.com') &&
  !process.env.AUTH0_CLIENT_ID.includes('dummy')
);

// If real credentials are provided in env, use official Auth0Client
// Otherwise, use a safe client that won't fail discovery or crash with 500
export const auth0 = isAuth0Configured
  ? new Auth0Client({
      domain: process.env.AUTH0_DOMAIN!,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      secret: process.env.AUTH0_SECRET!,
      appBaseUrl: process.env.APP_BASE_URL || 'https://bytefixarg.vercel.app',
    })
  : ({
      middleware: async () => null,
      getSession: async () => null,
      getAccessToken: async () => ({ token: null }),
    } as unknown as Auth0Client);
