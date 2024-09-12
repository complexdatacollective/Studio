import { NextResponse } from 'next/server';
import { getInterviewById } from '~/server/queries/interviews';

export async function GET(req: Request) {
  try {
    // TODO: replace this with actual protocol query
    // this is here for now to demonstrate a db query
    const interview = await getInterviewById({ interviewId: 'interview123' });
    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 },
      );
    }

    const placeholderMessages = {
      en: {
        Protocol: {
          Prompt1: 'This is a prompt',
          Prompt2: 'This is another prompt',
        },
      },
      fr: {
        Protocol: {
          Prompt1: 'Ceci est un prompt',
          Prompt2: 'Ceci est un autre prompt',
        },
      },
      es: {
        Protocol: {
          Prompt1: 'Este es un indicio',
          Prompt2: 'Este es otro indicio',
        },
      },
    };

    // for now, we'll just return a placeholder list of locales and messages
    return NextResponse.json({
      locales: ['en', 'es', 'fr'],
      messages: placeholderMessages,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
