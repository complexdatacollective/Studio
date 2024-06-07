import { revalidateTag, unstable_cache } from 'next/cache';

const cacheTags = [
  'getProjects',
  'getOrganizations',
  'getOrgBySlug',
  'getProjectBySlug',
] as const;
type StaticTag = (typeof cacheTags)[number];
type DynamicTag = `${StaticTag}-${string}`;

type CacheTag = StaticTag | DynamicTag;

export function safeRevalidateTag(tag: CacheTag) {
  revalidateTag(tag);
}

type UnstableCacheParams = Parameters<typeof unstable_cache>;

export function safeUnstableCache<T>(
  fetchData: UnstableCacheParams[0],
  keyParts: CacheTag[],
  options?: UnstableCacheParams[2],
): () => Promise<T> {
  return unstable_cache(fetchData, keyParts, options);
}
