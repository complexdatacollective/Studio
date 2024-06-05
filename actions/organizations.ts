"use server";

import { eq } from "drizzle-orm";
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

export async function getOrgBySlug(slug: string) {
  return await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  });
}

export async function getOrganizations() {
  return await db.query.organizations.findMany();
}
