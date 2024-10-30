/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Lucia } from 'lucia';
import { db } from '~/lib/db';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { env } from '~/env';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import 'server-only';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'studio-session',
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  hashedPassword: string;
}

export const getServerSession = cache(async () => {
  const c = await cookies();
  const sessionId = c.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId)
    return {
      session: null,
      user: null,
    };
  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      c.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      c.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return result;
});

export async function requirePageAuth() {
  const { session } = await getServerSession();

  if (!session) {
    redirect('/signin');
  }
}

export async function requireServerSession() {
  const session = await getServerSession();

  if (!session?.user || !session?.session) {
    throw new Error('Unauthorized');
  }

  return session;
}
