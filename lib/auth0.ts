import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN || 'bytefix.us.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'dummy_client_id',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'dummy_client_secret',
  secret: process.env.AUTH0_SECRET || 'd3f4u1t_s3cr3t_m1n1mum_32_ch4r4ct3rs_b1t3f1x',
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
});
