import { NextResponse } from 'next/server';
import { getInterviewById } from '~/server/queries/interviews';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const interview = await getInterviewById({ interviewId: id });
    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 },
      );
    }

    // for now, we'll just return a list of locales
    if (!interview.locales) {
      return NextResponse.json({ locales: ['en', 'fr'] });
    }

    return NextResponse.json(interview.locales);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
