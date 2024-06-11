import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import type { Session, User } from 'lucia';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { db } from '~/lib/db';
import {
  session as sessionTable,
  user as userTable,
  type UserType,
} from '~/lib/db/schema';
import { env } from '~/env';
import { routes } from '../routes';
import { redirect } from '~/lib/localisation/navigation';
import { RedirectType } from 'next/navigation';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
});

// IMPORTANT!
declare module 'lucia' {
  // Todo: figure out how to fix linting here
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserType;
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return result;
  },
);

export async function requirePageAuth() {
  const { session, user } = await validateRequest();

  if (!session || !user) {
    redirect(routes.signIn(), RedirectType.replace);
  }

  return { session, user };
}
