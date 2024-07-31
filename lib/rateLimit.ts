// lib/apiHelpers.ts
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

export const rateLimit = async (headers: Headers) => {
  // on Vercel, can do request.ip. But for self-hosting use x-forwarded-for.
  // https://nextjs.org/docs/app/api-reference/functions/next-request#ip
  // Implementing as x-forwarded-for for flexibility.
  const ip = headers.get('x-forwarded-for') ?? '';

  const ratelimit = new Ratelimit({
    redis: kv,
    // rate limit to 5 requests per 10 seconds
    limiter: Ratelimit.slidingWindow(5, '10s'),
  });

  const { success, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit_${ip}`,
  );

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);

    return new Response('Too many requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': retryAfter.toString(),
      },
    });
  }

  // Continue, rate limit not exceeded
  return null;
};
