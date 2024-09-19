import { type NextRequest } from 'next/server';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { type Locale } from '~/lib/localisation/config';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') as Locale;

  try {
    const protocol = devProtocol;

    return Response.json({
      messages: protocol.localisedStrings[locale],
    });
  } catch (error) {
    return Response.error();
  }
}
