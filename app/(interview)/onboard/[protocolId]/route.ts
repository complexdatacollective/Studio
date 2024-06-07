import { NextResponse, type NextRequest } from 'next/server';

const handler = (
  req: NextRequest,
  { params }: { params: { protocolId: string } },
) => {
  const { protocolId } = params;

  return NextResponse.json({ protocolId });
};

export { handler as GET, handler as POST };
