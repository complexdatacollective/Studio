import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '../../../../../components/interview/ui/InterviewShell';
import { redirect } from '~/lib/localisation/navigation';
import { headers } from 'next/headers';
import InterviewLocaleProvider from '~/lib/localisation/interview/Provider';
import type { Locale } from '~/lib/localisation/interview/Provider';

export default async function Page({
  params: { interviewId },
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const userLanguageHeader = headers().get('accept-language');
  const protocolLanguages: Locale[] = [
    ['en', 'English'],
    ['fr', 'French'],
  ];

  let stage;
  if (!searchParams.stage) {
    stage = 0;
    redirect(`/interview/${interviewId}?stage=0`);
  } else {
    stage = parseInt(searchParams.stage as string);
  }

  const interviewData = await getInterviewById({ interviewId });
  if (!interviewData) {
    return <div>Interview not found</div>;
  }
  return (
    <InterviewLocaleProvider
      userLanguageHeader={userLanguageHeader}
      protocolLanguages={protocolLanguages}
    >
      <InterviewShell interview={interviewData} currentStage={stage} />
    </InterviewLocaleProvider>
  );
}
