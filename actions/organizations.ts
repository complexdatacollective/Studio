"use server";

import { db } from "~/drizzle/db";
import { organizations } from "~/drizzle/schema";

export async function createOrganization(formData: FormData) {
  const name = formData.get("orgName") as string;
  console.log(`Creating organization: ${name}`);

  if (!name) {
    throw new Error("Organization name is required");
  }

  // insert organization into database using drizzle
  await db.insert(organizations).values({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  });
}
