import { NextResponse } from 'next/server';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import type { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url);

  const interviewId = url.searchParams.get('interviewId');
  const locale = url.searchParams.get('locale');

  console.log('interviewId:', interviewId, 'locale in request:', locale);

  if (!interviewId || !locale) {
    return NextResponse.json(
      { error: 'Missing required query parameters' },
      { status: 400 },
    );
  }

  try {
    // TODO: replace this with actual protocol query, using the interviewId
    await new Promise((resolve) => setTimeout(resolve, 100));
    const protocol = devProtocol;

    // for now, we'll just return a the devProtocol languages and localisedStrings
    return NextResponse.json({
      locales: protocol.languages,
      messages: protocol.localisedStrings[locale],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
