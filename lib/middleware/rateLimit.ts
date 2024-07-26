import { type NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

const handler = async (request: NextRequest) => {
  // You could alternatively limit based on user ID or similar
  const ip = request.ip ?? '127.0.0.1';
  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  // eslint-disable-next-line no-console
  console.log({
    success,
    pending,
    limit,
    reset,
    remaining,
  });
  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/blocked', request.url));
};

export default {
  handler,
  matcher: '/api/*',
};
