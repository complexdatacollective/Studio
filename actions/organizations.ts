"use server";

import { revalidateTag } from "next/cache";
import { db } from "~/drizzle/db";
import { organizations } from "~/drizzle/schema";

export async function createOrganization(formData: FormData) {
  const name = formData.get("orgName") as string;
  console.log(`Creating organization: ${name}`);

  if (!name) {
    throw new Error("Organization name is required");
  }

  await db.insert(organizations).values({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  });

  revalidateTag("getOrganizations");
}

export async function getOrganizations() {
  return await db.query.organizations.findMany();
}
