import devProtocol from '~/lib/db/sample-data/dev-protocol';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET() {
  try {
    const protocol = devProtocol;

    return Response.json({
      locales: protocol.languages,
    });
  } catch (error) {
    return Response.error();
  }
}
