import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '';

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
        'retry-After': retryAfter.toString(),
      },
    });
  }

  return NextResponse.json({ data: 'Success' });
}
