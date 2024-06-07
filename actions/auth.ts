"use server";

import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { db } from "~/drizzle/db";
import { user } from "~/drizzle/schema";
import { lucia, validateRequest } from "~/utils/auth";
import {
  createUserFormDataSchema,
  getUserFormDataSchema,
} from "~/utils/authSchema";

export async function signup(
  currentState: {
    success: boolean;
    error: null | string;
  },
  formData: FormData
) {
  const parsedFormData = createUserFormDataSchema.safeParse(formData);

  if (!parsedFormData.success) {
    return {
      success: false,
      error: parsedFormData.error.message,
    };
  }

  try {
    const { username, password } = parsedFormData.data;

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    // check if username is taken
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);

    if (existingUser) throw new Error("Username already taken!");

    // create user
    await db.insert(user).values({
      id: userId,
      username,
      passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { error: null, success: true };
  } catch (error) {
    return {
      success: false,
      error: "Username already taken!",
    };
  }
}

export async function signin(
  currentState: {
    success: boolean;
    error: null | string;
  },
  formData: FormData
) {
  const parsedFormData = getUserFormDataSchema.safeParse(formData);

  if (!parsedFormData.success) {
    return {
      success: false,
      error: parsedFormData.error.message,
    };
  }

  try {
    const { username, password } = parsedFormData.data;

    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);

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
      console.log("invalid username");
      return {
        success: false,
        error: "Incorrect username or password!",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        success: false,
        error: "Incorrect username or password!",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error while signing in", error);
    return {
      success: false,
      error: "Something went wrong! Please try again.",
    };
  }
}

export async function signout() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath("/");
  return {
    success: true,
    error: null,
  };
}
