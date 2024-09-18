import { type NextRequest } from 'next/server';
import devProtocol from '~/lib/db/sample-data/dev-protocol';

export async function GET(
  request: NextRequest,
  { params }: { params: { interviewId: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale');

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const protocol = devProtocol;

    console.log('examining protocol for messages...', protocol, locale);

    return Response.json({
      messages: protocol.localisedStrings[locale],
    });
  } catch (error) {
    return Response.error();
  }
}
