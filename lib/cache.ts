import { revalidateTag, unstable_cache } from 'next/cache';

const CACHE_TAGS = ['studies:get', 'studies:getByUser'] as const;

type StaticTag = (typeof CACHE_TAGS)[number];
type DynamicTag = `${StaticTag}-${string}`;

export type CacheTag = StaticTag | DynamicTag;

export function safeRevalidateTag(tag: CacheTag) {
  revalidateTag(tag);
}

type UnstableCacheParams = Parameters<typeof unstable_cache>;

export function createCachedFunction<T extends UnstableCacheParams[0]>(
  func: T,
  tags: CacheTag[],
  options?: {
    keyParts?: string[];
    revalidate?: number | false;
  },
): T {
  return unstable_cache(func, options?.keyParts, {
    tags,
    revalidate: options?.revalidate,
  });
}
