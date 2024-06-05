"use server";

import { revalidateTag } from "next/cache";
import { db } from "~/drizzle/db";
import { projects } from "~/drizzle/schema";
import { getOrgBySlug } from "./organizations";
import { eq } from "drizzle-orm";

export async function createProject(formData: FormData) {
  const name = formData.get("projectName") as string;
  const orgSlug = formData.get("orgSlug") as string;
  console.log(`Creating project: ${name}`);

  if (!name) {
    throw new Error("Project name is required");
  }

  if (!orgSlug) {
    throw new Error("Organization slug is required");
  }

  const organization = await getOrgBySlug(orgSlug);
  if (!organization || !organization.id) {
    throw new Error("Organization not found");
  }

  await db.insert(projects).values({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    organizationId: organization.id,
  });

  revalidateTag("getProjects");
}

export async function getProjects(orgSlug: string) {
  const organization = await getOrgBySlug(orgSlug);
  if (!organization || !organization.id) {
    throw new Error("Organization not found");
  }

  return await db.query.projects.findMany({
    where: eq(projects.organizationId, organization.id),
  });
}
