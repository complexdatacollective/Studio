import devProtocol from '~/lib/db/sample-data/dev-protocol';

export async function GET(
  request: Request,
  { params }: { params: { interviewId: string } },
) {
  try {
    // simulate protocol query
    await new Promise((resolve) => setTimeout(resolve, 100));
    const protocol = devProtocol;

    return Response.json({
      locales: protocol.languages,
    });
  } catch (error) {
    return Response.error();
  }
}
