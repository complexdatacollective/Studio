import { NextResponse } from 'next/server';
import { rateLimit } from '~/lib/rateLimit';

export async function GET(request: Request) {
  const rateLimitResponse = await rateLimit(request);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return NextResponse.json({ data: 'Success' });
}
