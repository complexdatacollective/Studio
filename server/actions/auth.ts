'use server';

import { db } from '~/lib/db';
import { cookies } from 'next/headers';
import { hash, verify } from '@node-rs/argon2';
import { getServerSession, lucia } from '~/lib/auth';
import { redirect } from '~/lib/localisation/navigation';
import { generateIdFromEntropySize } from 'lucia';
import { revalidatePath } from 'next/cache';
import { zfd } from 'zod-form-data';

export async function signup(_: unknown, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const hashedPassword = await hash(password);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  try {
    await db.user.create({
      data: {
        id: userId,
        username,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return;
  } catch (error) {
    // db error, email taken, etc
    return {
      error: 'Username already taken',
    };
  }
}

export async function login(formData: FormData) {
  const schema = zfd.formData({
    username: zfd.text(),
    password: zfd.text(),
  });

  const { username, password } = schema.parse(formData);

  const existingUser = await db.user.findFirst({
    where: {
      username: username.toLowerCase(),
    },
  });

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: 'Incorrect username or password',
    };
  }

  const validPassword = await verify(existingUser.hashedPassword, password);
  if (!validPassword) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect('/dashboard');
}

export async function logout() {
  const { session } = await getServerSession();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath('/');
}
